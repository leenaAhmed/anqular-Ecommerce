import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { CartShopingService } from 'src/app/services/cart-shoping.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  cartID: number = 0;
  addList: IProduct = {} as IProduct;

  formValue!: FormGroup;
  constructor(
    private productService: CartShopingService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cartID = Number(this.activeRoute.snapshot.paramMap.get('addId'));
    this.addList = this.productService.getProductListById(this.cartID);
    console.log(this.addList);
  }

  editProduct() {
    this.productService.updateProductQuantity(this.addList);

    this.router.navigate(['/products']);
    console.log(this.addList);
  }
}
