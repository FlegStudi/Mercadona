import { Component } from '@angular/core';
import { Category } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private productService:ProductsService){
    this.productService.getCategories().subscribe(cats => {
      this.categories =  cats ;
    })
  }

  label!: string;
  categories!: Category[];

  submit(){
    this.productService.addCategory(this.label).subscribe((data:any) =>{

        this.categories.unshift({categoryId :0, label : data.label});
    })
  }
}
