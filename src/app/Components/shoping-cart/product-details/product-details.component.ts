import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { CartShopingService } from 'src/app/services/cart-shoping.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  cartID: number = 0;
  productsList?: IProduct | null;
  productdetails: number[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private CartService: CartShopingService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.productdetails = this.CartService.getProductIDs();

    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.cartID = Number(paramMap.get('productId'));
      this.productsList = this.CartService.getProductListById(this.cartID);
    });

    // this.cartID = Number(
    //   this.activeRoute.snapshot.paramMap.get('productId')
    // );
    // this.products = this.CartService.getProductListById(this.cartID);

    console.log(this.productsList);
    console.log(this.cartID);
    console.log(this.productsList);
  }
  backForword() {
    this.location.back();
  }
  nextProduct() {
    let next = this.productdetails.findIndex((elem) => elem == this.cartID);
    let nextId;
    if (next < this.productdetails.length) {
      nextId = this.productdetails[next + 1];
      this.router.navigate(['/products', nextId]);
    }
    console.log(next);
    console.log(nextId);
  }

  privousProducts() {
    let privous = this.productdetails.findIndex((elem) => elem == this.cartID);
    let privousId;
    if (privous > 0) {
      privousId = this.productdetails[privous - 1];
      this.router.navigate(['/products', privousId]);
    }
  }
}
