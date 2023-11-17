import { Component } from '@angular/core';
import { Category, Product, Promotion } from 'src/app/models/Product';
import { ProductMapper } from 'src/app/models/ProductMapper';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
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

  imageFile: File;
  product:ProductMapper = new ProductMapper();
  categories : Category[];
  promotions : Promotion[];
  products:Product[];
  errorMsg = false;

  handleFileInput(event: any) {

    const files: File[] = event.target.files;
    this.product.image = files[0];
  }




  onSubmit() {
    console.log(this.product);

    const formData = new FormData();
    formData.append('label', this.product.label);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('categoryId', this.product.categoryId.toString());
    if(this.product.promotionId != null && this.product.promotionId != undefined && this.product.promotionId >0){
      formData.append('promotionId', this.product.promotionId.toString());
    }
    if(this.product.image != null && this.product.image != undefined){
      formData.append('image',  this.product.image);
      this._productsService.addProduct(formData).subscribe((product: Product) => {
        this.products.unshift(product);
        this.errorMsg = false;
      }, (error: any) => {
        console.log(error);
      });
    }else{
      this.errorMsg = true;
    }





  }
}


