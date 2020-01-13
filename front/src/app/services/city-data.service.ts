import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityDataService {
  private _getTownsURL = environment.baseAPI + 'getTowns';

  constructor(private http: HttpClient) { }

  public getCities(skip: number, limit: number) {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    return new Observable((suscriber) => {
      this.http.get(this._getTownsURL, {params}).subscribe((citiesfromAPI: Array<any>) => {
        let cities = new Array<City>();
        for (let i = 0; i < citiesfromAPI.length; i++) {
          cities.push(new City(citiesfromAPI[i]));
        }
        suscriber.next(cities);
      },
        (err) => {
          console.log(err);
        });
    });
  }
}
