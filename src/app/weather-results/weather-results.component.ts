import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../favorites.service';
import { TomorrowApiService } from '../tomorrow-api.service';
import { VariableSharingService } from '../variable-sharing.service';


@Component({
  selector: 'app-weather-results',
  templateUrl: './weather-results.component.html',
  styleUrls: ['./weather-results.component.css']
})
export class WeatherResultsComponent implements OnInit {

  variableSharingService:any;
  appCompRouter:any;
  favService:any;
  // mycons = console;


  constructor(private tomorrowAPI: TomorrowApiService, private variableSharing: VariableSharingService, private router: Router, private favorites: FavoritesService) {
    this.tomorrowAPI = tomorrowAPI;
    this.variableSharingService = variableSharing;
    this.appCompRouter = router;
    this.favService = favorites;
   }

   getTomorrowIdx(data:any){
    let today = new Date();
    today.setHours(0,0,0,0);
    for (const [index,el] of data.hours.entries()){
      let newDate = new Date(el.startTime);
      newDate.setHours(0,0,0,0);
      if(+newDate !== +today){
        return index;
      }
    }
    return 0;
  }

  ngOnInit() {
  }

  fetchDateDetails(idx:any) {
    this.variableSharingService.weatherDateData = this.variableSharingService.weatherDailyData[idx];
    this.variableSharingService.weatherDateData.dow = formatDate(this.variableSharingService.weatherDateData.startTime,'EEEE, dd MMM YYYY','en-US');
    this.appCompRouter.navigate(['/dateResults']);
  }

  weatherSearch(latlon:any) {
    let address = '';
    this.tomorrowAPI.currDailySearch(address,latlon).subscribe((data:any)=>{
      // console.log(data);
      if(Object.keys(data).length === 0){
        this.variableSharingService.weatherCurrentData = {};
        this.variableSharingService.weatherDailyData = [];
        this.variableSharingService.weatherHourlyData = [];
        this.variableSharingService.locInfo = {};
        this.variableSharingService.weatherchartFormed = false;
        this.variableSharingService.tempMinMaxFormed = false;
        this.variableSharingService.noData = true;
        this.variableSharingService.displayProgressBar = false;
        this.variableSharingService.displayError = false;
        this.variableSharingService.selectResult = true;
      }
      else{
        let idx = this.getTomorrowIdx(data)
        data.hours.splice(0,idx);
        this.variableSharingService.weatherCurrentData = data.curr;
        this.variableSharingService.weatherDailyData = data.days;
        this.variableSharingService.weatherHourlyData = data.hours;
        this.variableSharingService.locInfo.latlon = data.latlon;
        this.variableSharingService.weatherchartFormed = false;
        this.variableSharingService.tempMinMaxFormed = false;
        this.variableSharingService.noData = false;
        this.variableSharingService.displayError = false;
        this.variableSharingService.displayProgressBar = false;
        this.variableSharingService.selectResult = true;
      }
    },
    (err:any)=> {
      this.variableSharingService.weatherCurrentData = {};
      this.variableSharingService.weatherDailyData = [];
      this.variableSharingService.weatherHourlyData = [];
      this.variableSharingService.locInfo = {};
      this.variableSharingService.noData = false;
      this.variableSharingService.weatherchartFormed = false;
      this.variableSharingService.tempMinMaxFormed = false;
      this.variableSharingService.displayError = true;
      this.variableSharingService.displayProgressBar = false;
      this.variableSharingService.selectResult = true;
    })
  }

  fetchDailyDetails(loc:any) {
    this.variableSharingService.displayProgressBar = true;
    this.variableSharingService.weatherDailyData = [];
    this.variableSharingService.selectResult = true;
    this.weatherSearch(loc.latlon);
    this.variableSharingService.locInfo = loc;
  }

  checkEmptyDateData(){
    return Object.keys(this.variableSharingService.weatherDateData).length===0;
    
  }

}
