import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
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
  MatCardModule, 
  MatDialogModule
} from '@angular/material';
import { CityComponent } from './city/city.component';
import { CitiesComponent } from './cities/cities.component';
import { ExportDialogComponent } from '../app/export-dialog/export-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    CitiesComponent,
    ExportDialogComponent
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
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ExportDialogComponent
  ]
})
export class AppModule { }
