import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  brands = [
    {name: 'Samsung', qty: 0, checked: false},
    {name: 'Sony', qty: 0, checked: false},
    {name: 'Xiaomi', qty: 0, checked: false},
    {name: 'Apple', qty: 0, checked: false},
    {name: 'Canon', qty: 0, checked: false},
    {name: 'HUAWEI', qty: 0, checked: false},
    {name: 'HP', qty: 0, checked: false},
    {name: 'Lenovo', qty: 0, checked: false},
  ];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any>('https://dummyjson.com/products?limit=100').pipe(
      map(response => response.products)
    );
  }

  getProductsCategories(): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/products/categories');
  }

  getProductsCategoriesList(): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/products/category-list');
  }

  getProductsByCategory(category): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/products/category/' + category);
  }

  getProductDetails(id): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/products/' + id);
  }
}
