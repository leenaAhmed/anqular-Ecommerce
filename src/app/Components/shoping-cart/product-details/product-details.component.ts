import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { IProduct } from 'src/app/Models/iproduct';
// import { CartShopingService } from 'src/app/services/cart-shoping.service';
import { ProductServicesService } from 'src/app/services/productService/product-services.service';
import { CartService } from './../../../services/cartSevice/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnChanges {
  cartID: number = 0;
  productsList?: IProduct | null;
  productlistIds: number[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private CartService: ProductServicesService,
    private location: Location
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // this.productdetails = this.CartService.getProductIDs();
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.cartID = Number(paramMap.get('productId'));
      this.CartService.getProductById(this.cartID).subscribe((product) => {
        this.productsList = product;
      });
  
    });

   
    this.CartService.getProductsID().subscribe((product: any) => {
      // console.log('product', product);
      this.productlistIds = product;
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
    let currentid = this.productlistIds.findIndex(
      (elem) => elem == this.cartID
    );
    console.log('currentProduct', currentid);
    let nextId;
    if (currentid < this.productlistIds.length) {
      nextId = this.productlistIds[currentid + 1];
      this.router.navigate(['/products', nextId]);
    }
    console.log('nextid', nextId);

    console.log(currentid);
    console.log(nextId);
  }

  privousProducts() {
    let currentid = this.productlistIds.findIndex(
      (elem) => elem == this.cartID
    );
    console.log('nextProduct', currentid);

    let privousId;
    if (currentid > 0) {
      privousId = this.productlistIds[currentid - 1];
      this.router.navigate(['/products', privousId]);
    }
  }
}
