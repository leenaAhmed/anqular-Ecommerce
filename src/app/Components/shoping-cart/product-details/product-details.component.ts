import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { IProduct } from 'src/app/Models/iproduct';
// import { CartShopingService } from 'src/app/services/cart-shoping.service';
import { ProductServicesService } from 'src/app/services/productService/product-services.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  cartID: number = 0;
  productsList?: IProduct | null;
  productlistIds: number[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private CartService: ProductServicesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.productdetails = this.CartService.getProductIDs();
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.cartID = Number(paramMap.get('productId'));
    });

    this.CartService.getProductById(this.cartID).subscribe((product) => {
      this.productsList = product;
    });
    this.CartService.getProductIDs().subscribe((productIDs: number[]) => {
      this.productlistIds = productIDs;
    });
    console.log('list', this.productlistIds);
    console.log('id', this.cartID);
  }

  // loadProductDetails(productID){
  //   this.CartService.getProductById(productID).subscribe(product => {
  //     this.productsList = product;
  //   });
  // }
  backForword() {
    this.location.back();
  }
  nextProduct() {
    let next = this.productlistIds.findIndex((elem) => elem == this.cartID);
    console.log('nextProduct', next);
    let nextId;
    if (next < this.productlistIds.length) {
      nextId = this.productlistIds[next + 1];
      this.router.navigate(['/products', nextId]);
    }
    console.log('nextProduct', nextId);

    console.log(next);
    console.log(nextId);
  }

  privousProducts() {
    let privous = this.productlistIds.findIndex((elem) => elem == this.cartID);
    let privousId;
    if (privous > 0) {
      privousId = this.productlistIds[privous - 1];
      this.router.navigate(['/products', privousId]);
    }
  }
}
