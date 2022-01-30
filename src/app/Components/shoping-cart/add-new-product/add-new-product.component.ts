import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IProduct } from 'src/app/Models/iproduct';
import { CartShopingService } from 'src/app/services/cart-shoping.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
})
export class AddNewProductComponent implements OnInit, AfterViewInit {
  showAdd!: boolean;
  showUpdate!: boolean;
  formValue!: FormGroup;
  ProductObj: IProduct = {} as IProduct;
  @ViewChild(ProductListComponent)
  ProductList!: ProductListComponent;

  cartID: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartShopingService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id: [''],
      name: [''],
      Image: [''],
      price: [''],
      Quantity: [''],
      CateogryId: [''],
    });
    this.cartService.getAllProducts();
  }
  ngAfterViewInit(): void {
    this.ProductList.showAdd = true;
    console.log('AddNewProductComponent', ProductListComponent);
  }

  postProduct() {
    this.ProductObj.id = this.formValue.value.id;
    this.ProductObj.Name = this.formValue.value.name;
    this.ProductObj.Quantity = this.formValue.value.Quantity;
    this.ProductObj.Price = this.formValue.value.price;
    this.ProductObj.Img = this.formValue.value.Image;
    this.ProductObj.CateogryId = this.formValue.value.CateogryId;
    this.cartService.addNewProduct(this.ProductObj);
    this.router.navigate(['/products']);
  }

  editProduct() {}
}
