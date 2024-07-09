import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../components/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  searchkey = '';
  products: any[] = [];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  searchProducts(): void {
    if (this.searchkey && this.searchkey !== '') {
      this.productService.getSearchProducts(this.searchkey).subscribe((searchProducts) => {
        this.products = searchProducts.products;
      });
    }
  }

  navigateToHome(): void {
    this.productService.setSearchTerm(this.searchkey);
  }

}
