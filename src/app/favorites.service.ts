import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favArray:any = []
  favDataStorage = window.localStorage

constructor() { 
  if(this.favDataStorage.getItem("favArray")==null) {
    this.writeFavToStorage();
  }
  else {
    this.getFavArrayFromStorage();
  }
}

getFavArrayFromStorage() {
  var favs:any = this.favDataStorage.getItem("favArray")
  this.favArray = JSON.parse(favs)
}

writeFavToStorage() {
  this.favDataStorage.setItem("favArray",JSON.stringify(this.favArray))
}

insertFav(loc:any) {
  this.getFavArrayFromStorage()
  if(!this.isFavExists(loc)) {
    this.favArray.push(JSON.parse(JSON.stringify(loc)))
    this.writeFavToStorage()
  } 
}

deleteFav(loc:any) {
  this.getFavArrayFromStorage()
  if(this.isFavExists(loc)) {
    this.favArray.splice(this.getIdx(loc),1)
    this.writeFavToStorage()
  }
}

getIdx(loc:any) {
  for(let idx in this.favArray) {
    if(this.favArray[idx].city === loc.city && this.favArray[idx].state === loc.state) {
      return idx
    }
  }
  return -1
}

isFavExists(loc:any) {      
  // console.log(this.favArray)
  for(let element of this.favArray) {
    if(element.city === loc.city && element.state === loc.state) {
      // console.log('true')
      // console.log(loc)
      // console.log(element)
      return true;
    }
  }
  // console.log(loc)
  return false;
}

getFavArray() {
  return this.favArray;
}

}