import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CityDataService } from '../services/city-data.service.js';
import { City } from '../models/city.js';
import { PageEvent } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  constructor(private citiesDS: CityDataService) { }
  deps: Array<any> = [];
  cities: Array<City> = [];
  public paginatorDefaultOptions = [40,80,120];
  public nbTowns = 0;

  public form: FormGroup;

  public skip = 0;
  public limit = 40;

  pageEvent: PageEvent;

  ngOnInit() {
    this.citiesDS.getAllDeps().subscribe( (deps) => {
      this.deps = deps.map(function(e) { 
        e = e._id; 
        return e;
      });
    });
    this.citiesDS.getNbTowns().subscribe( result => {
      this.nbTowns = result['nbTowns'];
    });
    this.cities = [];
    this.citiesDS.getCities(this.skip,this.limit).subscribe((result:Array<any>)=>{
      result.forEach((city) => {
        let newCity = new City(city);
        newCity['cols']=1;
        newCity['rows']=2;
        this.cities.push(newCity);
      });
    });

    this.resetForm();

    this.form.valueChanges.subscribe( (changes : SimpleChanges) => {
      this.citiesDS.getCitiesWFilter(changes, this.skip, this.limit).subscribe((results)=> {
        this.cities = [];
        results['result'].forEach((city) => {
          let newCity = new City(city);
          newCity['cols']=1;
          newCity['rows']=2;
          this.cities.push(newCity);
        });
        this.nbTowns = results['count'];
      })
      
    })
  }

  public resetForm(){
    this.form = new FormGroup({
      dep : new FormControl()
    });
    this.skip = 0;
    this.limit=40;
  }

  public dataChanged(event) {
    this.cities = [];
    this.skip = event.pageIndex * event.pageSize;
    this.limit = event.pageSize;
    this.citiesDS.getCities(this.skip, this.limit).subscribe((result:Array<any>)=>{
      result.forEach((city) => {
        let newCity = new City(city);
        newCity['cols']=1;
        newCity['rows']=2;
        this.cities.push(newCity);
      });
    })
    
  }

}

