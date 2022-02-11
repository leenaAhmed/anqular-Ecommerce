import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ICart } from 'src/app/ViewModels/icart';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DailogExampleComponent } from '../dailog-example/dailog-example.component';
import { CartShopingService } from './../../../services/cart-shoping.service';
import { ProductServicesService } from 'src/app/services/productService/product-services.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  shopingCartItem: ICart = {} as ICart;
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
    private productService: ProductServicesService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.time = new Date();
    this.selectedProduct = new EventEmitter<ICart>();
  }
  ngOnChanges(): void {
    // this.filterCategory()
    this.productService
      .getProductByCategoryId(this.selctedCategory)
      .subscribe((product) => {
        this.productListFilter = product;
      });
  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((product) => {
      this.productListFilter = product;
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
  BuyProduct(product: IProduct, count: any) {
    this.shopingCartItem = {
      name: product.Name,
      cartID: product.id,
      quantity: product.Quantity,
      price: product.Price,
      amount: +count,
      totalPrice: 0,
      id: 0,
    };
    console.log(this.shopingCartItem);
    this.selectedProduct.emit(this.shopingCartItem);
  }
}
