import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ICart } from 'src/app/ViewModels/icart';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CartShopingService } from './../../../services/cart-shoping.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  shopingCartItem: ICart;
  ProductObj: IProduct = {} as IProduct;

  @Input() selctedCategory: number = 0;
  @Input() orderTotalPrice: number = 0;
  @Input() SelectPrice: number = 0;
  @Output() selectedProduct!: EventEmitter<ICart>;

  totalPriceOrder: number = 0;
  productListFilter: IProduct[] = [];
  time: Date;
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;

  constructor(
    private CartService: CartShopingService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.shopingCartItem = {
      cartID: 0,
      name: '',
      quantity: 0,
      price: 0,
      amount: 0,
      totalPrice: 0,
    };

    this.time = new Date();
    this.selectedProduct = new EventEmitter<ICart>();
  }
  ngOnChanges(): void {
    // this.filterCategory()
    this.productListFilter = this.CartService.filterByCategoryId(
      this.selctedCategory
    );
  }
  ngOnInit(): void {
    this.productListFilter = this.CartService.getAllProducts();
  }

  opentoUpdate(index: any) {
 

    this.showUpdate = true;
    this.showAdd = false;
    console.log(this.ProductObj);
  }
  BuyProduct(product: IProduct, count: any) {
    this.shopingCartItem = {
      name: product.Name,
      cartID: product.id,
      quantity: product.Quantity,
      price: product.Price,
      amount: +count,
      totalPrice: 0,
    };

    this.selectedProduct.emit(this.shopingCartItem);
  }
}
