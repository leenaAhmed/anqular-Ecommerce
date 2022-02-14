import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';
import { ICart } from 'src/app/ViewModels/icart';
import { ProductListComponent } from '../product-list/product-list.component';
import { CartShopingService } from 'src/app/services/cart-shoping.service';
import { CartService } from 'src/app/services/cartSevice/cart.service';
@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent implements OnInit, AfterViewInit {
  productBuy: any;

  addToCart: any = [];
  @Input() orderTotalPrice: number = 0;
  @ViewChild(ProductListComponent, { static: true })
  ProductItems!: ProductListComponent;
  shopingCartItem: ICart[] = [];

  constructor(private CartService: CartService) {
    // console.log(this.shopingCartItem);
  }

  ngOnInit(): void {
    this.CartService.getAllCarts().subscribe((data) => {
      this.shopingCartItem = data;
    });
  }

  ngAfterViewInit(): void {
    console.log(this.ProductItems);
  }
  updateQuantity(count: any, productId: number) {
    let result = this.shopingCartItem.filter(
      (product) => product.cartID == productId
    );
    result.map((item) => (item.amount = +count));

    console.log(result);
  }
  removeProduct(id: number , index:number) {
    console.log('removed', id);
    this.CartService.deleteCart(id).subscribe((product) => {
      console.log('removed', product);
    });
    if (index) {
      this.shopingCartItem = this.shopingCartItem.slice(index);
    }
  }

  totalPrice() {
    this.orderTotalPrice = 0;
    this.shopingCartItem.map((index) => {
      this.orderTotalPrice += index.amount * index.price;
    });
  }

  placeOrder() {
    this.shopingCartItem.map((index) => {
      this.ProductItems.productListFilter.map((item) => {
        if (index.cartID == item.id) {
          item.Quantity -= index.amount ;
        }
      });
    });
  }
}
