import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { CartShopingService } from 'src/app/services/cart-shoping.service';
import { ProductServicesService } from 'src/app/services/productService/product-services.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { ICateogray } from 'src/app/Models/icateogray';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  cartID: number = 0;
  addList: IProduct = {} as IProduct;

  categoryList: ICateogray[] = [];
  id: number = 0;
  isAddMode: boolean | undefined;
  loading = false;
  submitted = false;
  durationInSeconds = 2;

  constructor(
    private productService: ProductServicesService,
    private categoryservice: CategoryService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.categoryservice.getAllCategory().subscribe((category) => {
      this.categoryList = category;
    });
  }

  ngOnInit(): void {
    this.id = Number(this.activeRoute.snapshot.params['id']);
    this.isAddMode = !this.id;
    console.log(this.addList);

    if (!this.isAddMode) {
      this.productService.getProductById(this.id).subscribe((product) => {
        this.addList = product;
      });
    }
  }
  openSnackBar(message: string, action: string) {
    let snackbar = this._snackBar.open(message, action, {
      duration: 2000,
    });
    snackbar.afterDismissed().subscribe(() => {
      console.log('Success ');
    });
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.isAddMode) {
      this.addProduct();
    } else {
      this.UpdateProduct();
    }
  }

  addProduct() {


    const observer={
      next: (prd:IProduct) => {
          this.router.navigateByUrl('/products');
      },
      error: (err:Error)=>{alert(err.message)}
    }
    this.productService.getAddNewProduct(this.addList).subscribe(observer)
  }

  UpdateProduct() {
    this.productService
      .updateProductDetails(this.addList, this.id)
      .subscribe((data) => {
        this.router.navigateByUrl('/products');
      });
  }
}
