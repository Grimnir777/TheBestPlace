import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public selected = 'None';
  tiles: Tile[] = [
    {text: 'Paris', cols: 1, rows: 2},
    {text: 'Bordeaux', cols: 1, rows: 2},
    {text: 'Marseille', cols: 1, rows: 2},
    {text: 'Nantes', cols: 1, rows: 2},
    {text: 'Caen', cols: 1, rows: 2},
    {text: 'Versailles', cols: 1, rows: 2},
    {text: 'Lyon', cols: 1, rows: 2},
    {text: 'Perpignan', cols: 1, rows: 2},
  ];
}

export interface Tile {
  cols: number;
  rows: number;
  text: string;
}
