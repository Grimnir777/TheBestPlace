export class City {
  _id: string;
  cp: string;
  fullName: string;

  constructor(city?: any) {
    if (city) {
      this._id = city._id;
      this.cp = city.cp;
      this.fullName = city.fullName;
    }
  }
}
