export class User {

  constructor(
      public id: string,
      public names: string,
      public lastname_pater: string,
      public lastname_mater: string,
      public numDoc: string,
      public email: boolean,
      public password: boolean,
      public phone?: string,
      public address?: string,
  ) {}


}

