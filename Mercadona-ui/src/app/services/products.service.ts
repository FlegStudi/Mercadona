import { ProductMapper } from './../models/ProductMapper';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from '../models/Product';
import { environment } from '../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  apiUrl:string = environment.apiUrl + "api/"

  constructor(private http: HttpClient)
  {
    console.log(environment.apiUrl);
    console.log(environment.production);
  }

  getProducts(): Observable<any>
  {
    return this.http.get<any>(this.apiUrl +'Products/products');
  }

  getCategories(): Observable<any>
  {
    return this.http.get<any>(this.apiUrl +'Products/categories');
  }

  getPromotions(): Observable<any>
  {
    return this.http.get<any>(this.apiUrl +'Products/promotions');
  }

  addProduct(formData: FormData): Observable<any>
  {
    return this.http.post<any>(this.apiUrl +'Products/addProduct', formData);
  }

  addCategory(label: string): Observable<any>
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.apiUrl +'Products/addCategory', `"${label}"`, { headers: headers });
  }

  addPromotion(promo : Promotion): Observable<any>
  {
    return this.http.post<any>(this.apiUrl +'Products/addPromotion', promo);
  }
}
