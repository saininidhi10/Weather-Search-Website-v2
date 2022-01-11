import { Component, OnInit } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { RouterOutlet, Router } from '@angular/router';
import { LocationService } from './location.service';
import { TomorrowApiService } from './tomorrow-api.service';
import { VariableSharingService } from './variable-sharing.service';
import { slider } from './router-animation';

export class FormDetails {
  public Street: string = '';
  public City: string = '';
  public State: string = 'CA';
  public LatLong: string = '';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slider]
})
export class AppComponent implements OnInit {
  title = 'weather-angular-app';
  model = new FormDetails();
  variableSharingService:any
  streetFocus = true;
  cityFocus = true;
  disableFields = false;
  autocompleteValues: string[] = [];
  termsList: string[][] = [];
  appCompRouter:any;
  ipCity:string = "";
  ipState:string = "";

  constructor(private locationAPI: LocationService, private tomorrowAPI: TomorrowApiService, 
    private variableSharing: VariableSharingService, private router: Router) {
    this.locationAPI = locationAPI;
    this.tomorrowAPI = tomorrowAPI;
    this.variableSharingService = variableSharing;
    this.appCompRouter = router;
  }
  ngOnInit(): void {
    this.appCompRouter.navigate(['/dailyResults']);
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

  makeRoute(outlet:RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  weatherSearch() {
    let address = this.model.Street.replace(" ","+") + "+" + this.model.City.replace(" ","+") + "+" + this.model.State.replace(" ","+")
    // console.log(this.model.LatLong);
    this.tomorrowAPI.currDailySearch(address,this.model.LatLong).subscribe((data:any)=>{
      // console.log(data);
      if(Object.keys(data).length === 0){
        this.variableSharingService.weatherCurrentData = {};
        this.variableSharingService.weatherDailyData = [];
        this.variableSharingService.weatherHourlyData = [];
        this.variableSharingService.locInfo = {};
        this.variableSharingService.weatherchartFormed = false;
        this.variableSharingService.tempMinMaxFormed = false;
        this.variableSharingService.noData = true;
        this.variableSharingService.displayError = false;
        this.variableSharingService.displayProgressBar = false;
        this.variableSharingService.selectResult = true;
      }
      else{

        if(this.ipCity === '' && this.ipState === ''){
          this.variableSharingService.locInfo.city = this.model.City;
          this.variableSharingService.locInfo.state = this.variableSharingService.state_fullforms[this.model.State];
        }
        else{
          this.variableSharingService.locInfo.city = this.ipCity;
          this.variableSharingService.locInfo.state = this.ipState;
        }

        let idx = this.getTomorrowIdx(data)
        // console.log(idx)
        data.hours.splice(0,idx);
        this.variableSharingService.weatherCurrentData = data.curr;
        this.variableSharingService.weatherDailyData = data.days;
        this.variableSharingService.weatherHourlyData = data.hours;
        this.variableSharingService.locInfo.latlon = data.latlon;
        // console.log(this.variableSharingService.locInfo);
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
  
  submitForm() {
    this.variableSharingService.displayProgressBar = true;
    this.variableSharingService.weatherDailyData = [];
    this.variableSharingService.selectResult = true;
    this.variableSharingService.locInfo = {};
    this.weatherSearch();
    this.appCompRouter.navigate(['/dailyResults']);
  }

  resetLocals(){
    this.streetFocus = true;
    this.cityFocus = true;
    this.disableFields = false;
    this.autocompleteValues = [];
    this.termsList = [];
    this.appCompRouter;
    this.ipCity = "";
    this.ipState = "";
    this.model.State = 'CA';
    this.model.City = '';
    this.model.Street = '';
    this.model.LatLong = '';
  }

  clearAll(){
    this.resetLocals()
    this.variableSharingService.reset()
    this.appCompRouter.navigate(['/dailyResults']);
  }

  isEmptyStreet() {
    if(this.model.Street) {
      if(this.model.Street.trim()) {
        this.streetFocus = true;
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return true;
    } 
  }

  isEmptyCity() {
    if(this.model.City) {
      if(this.model.City.trim()) {
        this.cityFocus = true;
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return true;
    } 
  }

  autocompleteCityField() {
    if(this.model.City.trim() !== '') {
      this.locationAPI.autocompleteCity(this.model.City.trim()).subscribe((data:any)=>{
        this.autocompleteValues = []
        this.termsList = data;
        for(let i=0; i<this.termsList.length; i++) {
          this.autocompleteValues.push(this.termsList[i][0] + ", " + this.termsList[i][1]);
        }
      },
      (err:any)=>{
        this.autocompleteValues = []
        this.termsList = []
      })
    }
    else{
      this.autocompleteValues = []
      this.termsList = []
    }
  }

  locationSwitch() {
    this.disableFields = !this.disableFields;
    if(this.disableFields) {
      this.locationAPI.ipLocationSearch().subscribe((data:any)=>{
        this.model.LatLong = data.loc;
        this.ipCity = data.city;
        this.ipState = data.region;
      })
    }
    else {
      this.model.LatLong = '';
      this.ipState = '';
      this.ipCity = '';
    }
  }

  onCitySelected(option:MatOption) {
      this.model.City = option.value.split(",")[0].trim();
      this.model.State = option.value.split(",")[1].trim();
  }


}