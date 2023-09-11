export class Customer {

  constructor(
      public id: string,
      public name: string,
      public lastname_pater: string,
      public lastname_mater?: string,
      public numDoc?: string,
      public email?: boolean,
      public phone?: string,
      public address?: string,
  ) {}


}

