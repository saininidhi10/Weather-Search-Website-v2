import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateDetailsComponent } from './date-details/date-details.component';
import { WeatherResultsComponent } from './weather-results/weather-results.component';

const routes: Routes = [
  {path: 'dailyResults', component: WeatherResultsComponent, data: {animation: 'isLeft'}},
  {path: 'dateResults', component: DateDetailsComponent, data: {animation: 'isRight'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
