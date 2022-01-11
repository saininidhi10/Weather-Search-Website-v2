import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherResultsComponent } from './weather-results/weather-results.component';
import { DateDetailsComponent } from './date-details/date-details.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [		
    AppComponent,
      WeatherResultsComponent,
      DateDetailsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbiLq0UZ-44e33kuXy9k6qDRcaloIUDHU'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
