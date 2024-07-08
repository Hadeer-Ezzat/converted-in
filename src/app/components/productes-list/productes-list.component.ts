import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-productes-list',
  templateUrl: './productes-list.component.html',
  styleUrls: ['./productes-list.component.scss']
})
export class ProductesListComponent implements OnInit {

  categories: any[] = [];
  products: any[] = [];
  brands: any[] = [];
  fromPrice = null;
  toPrice = null;
  cacheDuration = 15 * 60 * 1000;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
    this.productService.getProductsCategoriesList().subscribe((category) => {
      this.categories = category;
    });
    this.brands = this.productService.brands;
  }

  loadProducts(): void {
    const storedProducts = localStorage.getItem('products');
    const storedTimestamp = localStorage.getItem('productsTimestamp');
    if (storedProducts && storedTimestamp) {
      const timestamp = new Date(storedTimestamp).getTime();
      const now = new Date().getTime();
      const isCacheValid = now - timestamp < this.cacheDuration;
      if (isCacheValid) {
        this.products = JSON.parse(storedProducts);
        return;
      }
    }
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.saveProductsToLocalStorage();
    }, (error) => {
      console.error('Error fetching product data', error);
    });
  }

  saveProductsToLocalStorage(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
    localStorage.setItem('productsTimestamp', new Date().toISOString());
  }

  filterByCategory(category): void {
    this.productService.getProductsByCategory(category).subscribe((productsList) => {
      this.products = productsList.products;
    });
  }

  showProductDetails(id): void {
    this.router.navigate(['productDetails', id]);
  }

}
