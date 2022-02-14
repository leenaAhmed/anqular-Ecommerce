import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ICart } from 'src/app/ViewModels/icart';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DailogExampleComponent } from '../dailog-example/dailog-example.component';
import { CartShopingService } from './../../../services/cart-shoping.service';
import { ProductServicesService } from 'src/app/services/productService/product-services.service';
import { CartService } from 'src/app/services/cartSevice/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  shopingCartItem: ICart = {} as ICart;
  ProductObj: IProduct = {} as IProduct;
  searchKey: string = '';
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
  isUserLogged: boolean;

  constructor(
    private productService: ProductServicesService,
    private AuthService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.time = new Date();
    this.selectedProduct = new EventEmitter<ICart>();
    this.isUserLogged = this.AuthService.isUserExist;
  }
  ngOnChanges(): void {
    // this.filterCategory()
    if (this.selctedCategory == 0) {
      this.productService.getAllProducts().subscribe((product) => {
        this.productListFilter = product;
      });
    } else {
      this.productService
        .getProductByCategoryId(this.selctedCategory)
        .subscribe((product) => {
          this.productListFilter = product;
        });
    }
  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((product) => {
      this.productListFilter = product;
    });
    this.AuthService.getloggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
    // this.cartService.search.subscribe((val: any) => {
    //   this.searchKey = val;
    // });
  }
  filter(category: string) {
    this.productListFilter = this.productListFilter.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
  openDialog(id: number) {
    const dialogRef = this.dialog.open(DailogExampleComponent, {
      data: { id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  DeletProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((product) => {
      console.log('Delet Product', id);
    });
  }
  opentoUpdate(index: any) {
    this.showUpdate = true;
    this.showAdd = false;
    console.log(this.ProductObj);
  }
  BuyProduct(product: IProduct) {
    this.shopingCartItem = {
      name: product.Name,
      cartID: product.id,
      quantity: product.Quantity,
      price: product.Price,
      amount: 1,
      totalPrice: 0,
      id: 0,
    };
    console.log(this.shopingCartItem);
    this.selectedProduct.emit(this.shopingCartItem);
  }
}
