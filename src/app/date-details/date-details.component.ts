import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TomorrowApiService } from '../tomorrow-api.service';
import { VariableSharingService } from '../variable-sharing.service';

@Component({
  selector: 'app-date-details',
  templateUrl: './date-details.component.html',
  styleUrls: ['./date-details.component.css']
})
export class DateDetailsComponent implements OnInit {

  variableSharingService:any;
  appCompRouter:any;
  headings:any = {'Status':'weatherCode','Max Temperature':'temperatureMax', 'Min Temperature': 'temperatureMin', 'Apparent Temperature': 'temperatureApparent', 
  'Sun Rise Time': 'sunriseTime', 'Sun Set Time':'sunsetTime', 
  'Humidity':'humidity','Wind Speed':'windSpeed','Visibility':'visibility','Cloud Cover':'cloudCover'};
  heading_list:any = ['Status','Max Temperature','Min Temperature','Apparent Temperature',
  'Sun Rise Time','Sun Set Time','Humidity','Wind Speed','Visibility','Cloud Cover']

  constructor(private tomorrowAPI: TomorrowApiService, private variableSharing: VariableSharingService, private router: Router) {
    this.tomorrowAPI = tomorrowAPI;
    this.variableSharingService = variableSharing;
    this.appCompRouter = router;
   }

  ngOnInit() {
  }

}
