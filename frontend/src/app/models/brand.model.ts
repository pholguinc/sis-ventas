export class Brand {
  constructor(
    public id: string,
    public code: string,
    public name: string,
    public register:{
      createdAt: Date,
      updatedAt: Date
    }
  ) {}
}
