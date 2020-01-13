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
  private _getNbTownsURL = environment.baseAPI + 'getNbTowns';
  private _getTownInfosURL = environment.baseAPI + 'getTownInfos';

  constructor(private http: HttpClient) { }

  public getCities(skip: number, limit: number) : Observable<Array<City>> {
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

  public getNbTowns() : Observable<any> {
    return new Observable((suscriber) => {
      this.http.get(this._getNbTownsURL).subscribe( result => {
        suscriber.next(result);
      },
        (err) => {
          console.log(err);
        });
    });
  }

  public getTownInfos(_id: string) : Observable<City> {
    const params = new HttpParams()
      .set('_id', _id.toString());

    return new Observable((suscriber) => {
      this.http.get(this._getTownInfosURL, {params}).subscribe( result => {
        suscriber.next(result as City);
      },
        (err) => {
          console.log(err);
        });
    });
  }
}
