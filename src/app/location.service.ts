import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

constructor(private http: HttpClient) { }

ipLocationSearch() {
  let url = 'https://ipinfo.io/?token=b1ac7c2d0e80a3';
  return this.http.get(url);
}

autocompleteCity(city:string) {
  let url = "/api/autocomplete?city="+city.replace(' ','+');
  return this.http.get(url);
}

}
