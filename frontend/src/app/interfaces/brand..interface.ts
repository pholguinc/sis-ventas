export interface Brand {
  id: string;
  name: string;
  code: string;
  register: {
    createdAt: Date;
    updatedAt: Date;
  };
}
