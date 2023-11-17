import { Category } from 'src/app/models/Product';
import { Product } from 'src/app/models/Product';
import { ProductsService } from './../../services/products.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';



export interface CategoryInterface {
  label: string;
  completed: boolean;
  //color: black;

}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})

export class CatalogueComponent {
  @ViewChild('all', { static: false }) all: MatCheckbox;
  pathImages:string = "../../../assets/images";
  categories!: Category[]
  products:Product[] = [];
  selectedCategories: number[] = [];
  filteredProducts: Product[] = [];
  categoryChecker: any = {
    name: 'all',
    completed: true,
    //color: 'black',
    categories :[]
     ,
  };
  loading: boolean =false;

  constructor(private productsService :ProductsService){
    this.GetProducts();
    this.GetCategories();
  }

  GetProducts(): void {
      this.loading = true;
      this.productsService.getProducts().subscribe({
        next:  (data: Product[]) => {
          this.products = data;
          this.filteredProducts = data;
          this.loading = false;

        },
        error: error => {
          console.log(error);
        }
      });


  }

  GetCategories(): void {

    this.productsService.getCategories().subscribe({
      next:  (data: Category[]) => {
        this.categoryChecker.categories = data;
        this.setAll(true);

      },
      error: error => {
        console.log(error);
      }
    });

}

  ApplyPromo( price : number,  promo:number){
    return price - ((price * promo) / 100);
  }

  setAll(completed: boolean) {
    if (this.categoryChecker.categories == null) {

      return;
    }
    this.categoryChecker.categories.forEach((t:any) => (t.completed = completed));
    this.filterProducts();
  }

  getSelectedCategories(): string[] {
    return this.categoryChecker.categories.filter((c:any) => c.completed).map((c:any) => c.label);
  }

  filterProducts(){


    this.filteredProducts = this.products.filter(p => this.getSelectedCategories().includes( p.category.label) );

     if (this.all.checked==true && (this.categoryChecker.categories.length != this.getSelectedCategories().length)) {//et une des categories n'est pas cochée

      this.all.checked = false;
    }
  }
}

