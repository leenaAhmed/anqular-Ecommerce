import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ICateogray } from 'src/app/Models/icateogray';
import { IProduct } from 'src/app/Models/iproduct';
import { CartShopingService } from 'src/app/services/cart-shoping.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ICart } from 'src/app/ViewModels/icart';
import { ProductListComponent } from '../product-list/product-list.component';
@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.scss'],
})
export class FilterProductComponent implements OnInit {
  categoryList: ICateogray[] = [];
  shopingCartItem: ICart[] = [];
  selectedId: number = 0;
  selectedPrice: number = 0;
  @Input() orderTotalPrice: number = 0;
  @ViewChild(ProductListComponent)
  ProductItems!: ProductListComponent;
  // addToCartProduct : IProduct[] = []

  productBuy: any;

  addToCart: any = [];

  constructor(private categoryservice: CategoryService) {
    console.log('this.categoryList');
  }

  ngOnInit(): void {
    console.log('this.categoryList');
    this.categoryservice.getAllCategory().subscribe((cat) => {
      this.categoryList = cat;
    });
  }
  ngAfterViewInit(): void {
    console.log(this.ProductItems.productListFilter);
  }

  addfun(product: any) {
    this.shopingCartItem.push(product);
    // this.CartService.addToCart(product);
    console.log(this.shopingCartItem);
  }

  priceFilter(price: any) {
    console.log(+price);
  }
}
