import { Component, OnInit } from '@angular/core';
import { CityDataService } from '../services/city-data.service.js';
import { City } from '../models/city.js';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  constructor(private citiesDS: CityDataService) { }

  cities: Array<City> = [];
  public paginatorDefaultSize = 40;
  public paginatorDefaultOptions = [40,80,120];

  pageEvent: PageEvent;

  ngOnInit() {
    this.cities = [];
    this.citiesDS.getCities(0,this.paginatorDefaultSize).subscribe((result:Array<any>)=>{
      result.forEach((city) => {
        let newCity = new City(city);
        newCity['cols']=1;
        newCity['rows']=2;
        this.cities.push(newCity);
      });
    })
  }

  public dataChanged(event) {
    this.cities = [];
    this.citiesDS.getCities(event.pageIndex * event.pageSize,event.pageSize).subscribe((result:Array<any>)=>{
      result.forEach((city) => {
        let newCity = new City(city);
        newCity['cols']=1;
        newCity['rows']=2;
        this.cities.push(newCity);
      });
    })
    
  }

}

