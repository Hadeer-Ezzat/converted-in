import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productImages: any[] = [];
  product: ProductModel = new ProductModel();
  productImageSrc = '';
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.product.id = param['id'];
      this.productService.getProductDetails(this.product.id).subscribe((productDetails: ProductModel) => {
        this.product = productDetails;
        this.productImages = this.product.images;
        this.productImageSrc = this.product.thumbnail;
      });
    });
  }

  addToCart(): void {
    
  }

}
