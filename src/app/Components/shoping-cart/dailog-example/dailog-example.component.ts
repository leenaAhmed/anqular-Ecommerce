import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ProductServicesService } from 'src/app/services/productService/product-services.service';

@Component({
  selector: 'app-dailog-example',
  templateUrl: './dailog-example.component.html',
  styleUrls: ['./dailog-example.component.scss'],
})
export class DailogExampleComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductServicesService
  ) {}

  ngOnInit(): void {
    
  }
  Delete() {
    this.productService.deleteProduct(this.data.id).subscribe((product) => {
      console.log('Delet Product', this.data.id);
    });
  }
}
