import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatListModule,
  MatCheckboxModule,
  MatSliderModule,
  MatButtonModule,
  MatCardModule } from '@angular/material';
import { CityComponent } from './city/city.component';
import { CitiesComponent } from './cities/cities.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    CitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatListModule,
    MatCheckboxModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
