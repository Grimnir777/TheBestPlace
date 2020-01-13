import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityDataService } from '../services/city-data.service';
import { City } from '../models/city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  public city: City;

  constructor(private citiesDS: CityDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.citiesDS.getTownInfos(params.get('id')).subscribe( city => {
        this.city = new City(city);
      });
    });
  }

}

