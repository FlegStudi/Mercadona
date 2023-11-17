export class Product {
  productId!: number;
  label!: string;
  description!: string;
  price!: number;
  image!: string;
  category!: Category;
  promotion!: Promotion;
}

export class Category {
  categoryId!: number;
  label!: string;
}

export class Promotion {
  promotionId: number;
  start: Date;
  end: Date;
  discount: number;

  constructor(start: Date, end: Date, discount: number) {
    this.promotionId = 0;
    this.start = start;
    this.end = end;
    this.discount = discount;
  }
}
