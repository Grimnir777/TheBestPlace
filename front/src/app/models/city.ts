export class City {
  _id: string;
  dep:string;
  slug:string;
  nom_simple:string;
  nom_reel:string;
  code_postal: string;
  code_commune:string;
  longitude_deg:number;
  latitude_deg:number;

  constructor(city?: any) {
    if (city) {
      this._id = city._id;
      this.slug = city.slug;
      this.nom_simple = city.nom_simple;
      this.nom_reel = city.nom_reel;
      this.code_postal = city.code_postal;
      this.code_commune = city.code_commune;
      this.longitude_deg = city.longitude_deg;
      this.latitude_deg = city.latitude_deg;
    }
  }
}
