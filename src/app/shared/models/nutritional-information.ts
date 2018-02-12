export class NutritionalInformation {
    name?: string;
    perServe?: string;

    constructor(
      name?: string,
      perServe?: string
    ){
      this.name = name || null;
      this.perServe = perServe || null;
    }
}
export default [ NutritionalInformation ]