export class Critere {
  name: string;
  val_max: number;
  constructor(critere: Critere) {
    if (critere) {
      this.name = critere.name;
      this.val_max = critere.val_max;
    }
  }
}
  