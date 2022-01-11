import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TomorrowApiService {

constructor(private http: HttpClient) { }

currDailySearch(address:string,LatLong:string){
  let url = "/api/search?address="+address+"&latlong="+LatLong;
  return this.http.get(url);
}

}
