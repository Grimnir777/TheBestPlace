import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CityDataService } from '../services/city-data.service.js';
import { City } from '../models/city.js';
import { PageEvent, MatDialog } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Critere } from '../models/critere.js';
import { ExportDialogComponent } from '../export-dialog/export-dialog.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  constructor(
    private citiesDS: CityDataService,
    public dialog: MatDialog
  ) { }
  deps: Array<any> = [];
  criteres: Array<Critere> = [];
  cities: Array<City> = [];
  public paginatorDefaultOptions = [40,80,120];
  public nbTowns = 0;

  public form: FormGroup;

  public skip = 0;
  public limit = 40;

  pageEvent: PageEvent;

  ngOnInit() {
    this.cities = [];
    this.resetForm();
    this.citiesDS.getCriteres().subscribe( (criteres: Array<any>) => {

      criteres.forEach((critere : Critere) => {
        this.criteres.push(new Critere(critere))
        this.form.addControl(critere.name, new FormControl(0))
      });

      this.form.valueChanges.subscribe( (changes : SimpleChanges) => {
        this.getCities(changes)
      });
    });

    this.getCities({});
  }

  public getCities(filter: any){
    this.citiesDS.getCitiesWFilter(filter, this.skip, this.limit).subscribe((results)=> {
      this.cities = [];
      
      results['result'].forEach((city) => {
        let newCity = new City(city);
        newCity['cols']=1;
        newCity['rows']=2;
        this.cities.push(newCity);
      });
      this.nbTowns = results['count'];
    });
  }

  public resetForm(){
    this.form = new FormGroup({});
    this.skip = 0;
    this.limit=40;
  }

  public dataChanged(event) {
    this.cities = [];
    this.skip = event.pageIndex * event.pageSize;
    this.limit = event.pageSize;
    this.getCities(this.form.value);
  }

  public exportJson(): void {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '250px',
      data: {type: "json", filters: this.form.value}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

