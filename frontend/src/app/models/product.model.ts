export class Product {

  constructor(
      public id: string,
      public name: string,
      public description: string,
      public price?: number,
      public stock?: number,
      public brandId?: string,
      public categoryId?: string,
      /*public providerId? : string*/
  ) {}


}

