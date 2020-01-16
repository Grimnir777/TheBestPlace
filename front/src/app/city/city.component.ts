import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityDataService } from '../services/city-data.service';
import { City } from '../models/city';
declare var H: any;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  public city: City;

  @ViewChild("map", { static: true }) public mapElement: ElementRef; 
  public lat: any = '22.5726';  
  public lng: any = '88.3639';  
  
  public width: any = '75%';  
  public height: any = '50%';  

  private platform: any;  
  private map: any;

  constructor(private citiesDS: CityDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.citiesDS.getTownInfos(params.get('id')).subscribe( city => {
        this.city = new City(city);
      });
    });
    this.platform = new H.service.Platform({
      'apikey': 'AkmhVYVVVL1j24ZFQidKVgoxS0vNpvgOaZERnTrfPGY'
    });
  }

  public ngAfterViewInit() {  
    
    setTimeout(() => {
      if(this.city.longitude_deg && this.city.latitude_deg) {
        let pixelRatio = window.devicePixelRatio || 1;  
        let defaultLayers = this.platform.createDefaultLayers({  
          tileSize: pixelRatio === 1 ? 256 : 512,  
          ppi: pixelRatio === 1 ? undefined : 320  
        });
  
        this.map = new H.Map(this.mapElement.nativeElement,  
          defaultLayers.vector.normal.map, {
            zoom: 10,
            center: { lng: this.city.longitude_deg, lat: this.city.latitude_deg }
          });  
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map)); 
        var ui = H.ui.UI.createDefault(this.map, defaultLayers, 'fr-FR');
  
        let marker = new H.map.Marker({ lng: this.city.longitude_deg, lat: this.city.latitude_deg });
        this.map.addObject(marker);
    
      } 
    },100)

  }

}