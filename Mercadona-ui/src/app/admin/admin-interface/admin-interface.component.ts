import { ProductMapper } from './../../models/ProductMapper';
import { ProductsService } from './../../services/products.service';
import { Component } from '@angular/core';
import { Category, Product, Promotion } from 'src/app/models/Product';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent {
  constructor(private  _productsService : ProductsService ){

  }
  ngOnInit(){

    this._productsService.getProducts().subscribe(p=>{
      this.products = p;

    });

    this._productsService.getCategories().subscribe(cat=>{
      this.categories = cat;
    });

    this._productsService.getPromotions().subscribe(p=>{
      this.promotions = p;
    })

  }

  imageFile!: File;
  product:ProductMapper = new ProductMapper();
  categories: Category[] = [];
  promotions: Promotion[] = [];
  products: Product[] = [];

  handleFileInput(event: any) {

    const files: File[] = event.target.files;
    this.product.image = files[0];
  }




  onSubmit() {
    const formData = new FormData();
    formData.append('label', this.product.label);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('categoryId', this.product.categoryId.toString());
    formData.append('promotionId', this.product.promotionId.toString());

    formData.append('image',  this.product.image)


    this._productsService.addProduct(formData).subscribe(product => {

      this.products.unshift(product)
    }, error => {
      console.log(error);
    });
  }
}
