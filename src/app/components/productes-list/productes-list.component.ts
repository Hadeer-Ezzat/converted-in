import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import {Router} from '@angular/router';
import { ProductModel } from '../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productes-list',
  templateUrl: './productes-list.component.html',
  styleUrls: ['./productes-list.component.scss']
})
export class ProductesListComponent implements OnInit, OnDestroy {

  categories: any[] = [];
  products: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  brands: any[] = [];
  fromPrice = null;
  toPrice = null;
  cacheDuration = 15 * 60 * 1000;
  private searchSubscription: Subscription;
  searchkey = '';
  filterBrands: any[] = [];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
    this.productService.getProductsCategoriesList().subscribe((category) => {
      this.categories = category;
    });
    this.brands = this.productService.brands;
    this.searchSubscription = this.productService.searchTerm$.subscribe((term) => {
      this.searchkey = term;
      this.filterProducts();
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchkey.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
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
      this.filteredProducts = data;
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
      this.filteredProducts = productsList.products;
    });
  }

  showProductDetails(id): void {
    this.router.navigate(['productDetails', id]);
  }

  filterProductByBrand(brandName, checkbox: HTMLInputElement, index: number): void {
    this.productService.brands[index].checked = checkbox.checked;
    if (this.productService.brands[index].checked) {
      this.filterBrands.push(brandName);
    } else {
      this.filterBrands =  this.filterBrands.filter(e => e !== brandName);
    }
  }

}
