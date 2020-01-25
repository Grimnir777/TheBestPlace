import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as FileSaver from 'file-saver';
import  *  as  jsonSchema  from  '../assets/jsonSchema.json';
import { CityDataService } from '../services/city-data.service.js';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss']
})
export class ExportDialogComponent {

  constructor(
    private citiesDS: CityDataService,
    public dialogRef: MatDialogRef<ExportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  public finish(): void {
    this.dialogRef.close();
  }

  public exportData(): void {
    this.citiesDS.getCitiesWFilter(this.data.filters, 0, 1000000).subscribe((dbResult)=> {
      for (const key in dbResult['result']) {
        delete dbResult['result'][key]['_id'];
      }
      let blob = new Blob([JSON.stringify(dbResult['result'], null, 2)], {type: "text/json;charset=utf-8"});
      FileSaver.saveAs(blob, "citiesFiltered.json");
    });
    this.dialogRef.close();
  }

  public exportSchema(): void {
    var blob = new Blob([JSON.stringify(jsonSchema, null, 2)], {type: "text/json;charset=utf-8"});
    FileSaver.saveAs(blob, "jsonSchema.json");
    this.dialogRef.close();
  }

}
