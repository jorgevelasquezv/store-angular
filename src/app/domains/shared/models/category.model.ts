export interface Category {
  id: number;
  name: Name;
  image: string;
  creationAt: Date;
  updatedAt: Date;
}

export enum Name {
  Clothes = 'Clothes',
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Miscellaneous = 'Miscellaneous',
  PruebaPresencial = 'Prueba Presencial',
  Shoes = 'Shoes',
}
