import { Injectable } from '@angular/core';

declare const getWeatherChart:any;
declare const getTempMinMax:any;

@Injectable({
  providedIn: 'root'
})
export class VariableSharingService {

  state_fullforms:any = {"AL":"Alabama",
  "AK":"Alaska",
  "AZ":"Arizona",
  "AR":"Arkansas",
  "CA":"California",
  "CO":"Colorado",
  "CT":"Connecticut",
  "DE":"Delaware",
  "DC":"District Of Columbia",
  "FL":"Florida",
  "GA":"Georgia",
  "HI":"Hawaii",
  "ID":"Idaho",
  "IL":"Illinois",
  "IN":"Indiana",
  "IA":"Iowa",
  "KS":"Kansas",
  "KY":"Kentucky",
  "LA":"Louisiana",
  "ME":"Maine",
  "MD":"Maryland",
  "MA":"Massachusetts",
  "MI":"Michigan",
  "MN":"Minnesota",
  "MS":"Mississippi",
  "MO":"Missouri",
  "MT":"Montana",
  "NE":"Nebraska",
  "NV":"Nevada",
  "NH":"New Hampshire",
  "NJ":"New Jersey",
  "NM":"New Mexico",
  "NY":"New York",
  "NC":"North Carolina",
  "ND":"North Dakota",
  "OH":"Ohio",
  "OK":"Oklahoma",
  "OR":"Oregon",
  "PA":"Pennsylvania",
  "RI":"Rhode Island",
  "SC":"South Carolina",
  "SD":"South Dakota",
  "TN":"Tennessee",
  "TX":"Texas",
  "UT":"Utah",
  "VT":"Vermont",
  "VA":"Virginia",
  "WA":"Washington",
  "WV":"West Virginia",
  "WI":"Wisconsin",
  "WY":"Wyoming"}

  weather_code_dict:any = {4201 : { 'description': 'Heavy Rain', 'image': '../assets/Images/rain_heavy.svg'},
            4001:  { 'description': 'Rain', 'image': '../assets/Images/rain.svg' },
            4200:  { 'description': 'Light Rain', 'image': '../assets/Images/rain_light.svg' },
            6201:  { 'description': 'Heavy Freezing Rain', 'image': '../assets/Images/freezing_rain_heavy.svg' },
            6001:  { 'description': 'Freezing Rain', 'image': '../assets/Images/freezing_rain.svg' },
            6200:  { 'description': 'Light Freezing Rain', 'image': '../assets/Images/freezing_rain_light.svg' },
            6000:  { 'description': 'Freezing Drizzle', 'image': '../assets/Images/freezing_drizzle.svg' },
            4000:  { 'description': 'Drizzle', 'image': '../assets/Images/drizzle.svg' },
            7101:  { 'description': 'Heavy Ice Pellets', 'image': '../assets/Images/ice_pellets_heavy.svg' },
            7000:  { 'description': 'Ice Pellets', 'image': '../assets/Images/ice_pellets.svg' },
            7102:  { 'description': 'Light Ice Pellets', 'image': '../assets/Images/ice_pellets_light.svg' },
            5101:  { 'description': 'Heavy Snow', 'image': '../assets/Images/snow_heavy.svg' },
            5000:  { 'description': 'Snow', 'image': '../assets/Images/snow.svg' },
            5100:  { 'description': 'Light Snow', 'image': '../assets/Images/snow_light.svg' },
            5001:  { 'description': 'Flurries', 'image': '../assets/Images/flurries.svg' },
            8000:  { 'description': 'Thunderstorm', 'image': '../assets/Images/thunderstorm.svg' },
            2100:  { 'description': 'Light Fog', 'image': '../assets/Images/fog_light.svg' },
            2000:  { 'description': 'Fog', 'image': '../assets/Images/fog.svg' },
            1001:  { 'description': 'Cloudy', 'image': '../assets/Images/cloudy.svg' },
            1102:  { 'description': 'Mostly Cloudy', 'image': '../assets/Images/mostly_cloudy.svg' },
            1101:  { 'description': 'Partly Cloudy', 'image': '../assets/Images/partly_cloudy_day.svg' },
            1100:  { 'description': 'Mostly Clear', 'image': '../assets/Images/mostly_clear_day.svg' },
            1000:  { 'description': 'Clear', 'image': '../assets/Images/clear_day.svg' },
            3000:  { 'description': 'Light Wind', 'image': '../assets/Images/light_wind.jpg' },
            3001:  { 'description': 'Wind', 'image': '../assets/Images/wind.png' },
            3002:  { 'description': 'Strong Wind', 'image': '../assets/Images/strong-wind.png' }
        }
  
  weatherCurrentData = {};
  weatherDailyData = [];
  weatherHourlyData = [];
  weatherDateData = {};
  locInfo = {};
  noData = false;
  displayError = false;
  selectResult = true;
  weatherchartFormed = false;
  tempMinMaxFormed = false;
  displayProgressBar = false;


  getWeatherStatus(code:any){
    if(code in this.weather_code_dict){
      return this.weather_code_dict[code]
    }
    else{
      return { 'description': 'Not Found', 'image': '' }
    }
  }

  
  ngGetWeatherChart(json:any,div_id:any){
    if(!this.weatherchartFormed){
      getWeatherChart(json,div_id);
      this.weatherchartFormed = true;
    }
  }

  ngTempMinMax(data:any,div_id:any){
    if(!this.tempMinMaxFormed){
      getTempMinMax(data,div_id);
      this.tempMinMaxFormed = true;
    }
  }

  reset(){
    this.weatherCurrentData = {};
    this.weatherDailyData = [];
    this.weatherHourlyData = [];
    this.weatherDateData = {};
    this.locInfo = {};
    this.noData = false;
    this.displayError = false;
    this.selectResult = true;
    this.weatherchartFormed = false;
    this.tempMinMaxFormed = false;
    this.displayProgressBar = false;
  }

constructor() { }

}
