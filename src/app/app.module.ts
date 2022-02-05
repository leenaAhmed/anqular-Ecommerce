import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HeaderComponent } from './Components/header/header.component';
import { ProductListComponent } from './Components/shoping-cart/product-list/product-list.component';
import { FilterProductComponent } from './Components/shoping-cart/filter-product/filter-product.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductDetailsComponent } from './Components/shoping-cart/product-details/product-details.component';
import { UserlogoutComponent } from './Components/userlogout/userlogout.component';
import { HomeComponent } from './Components/home/home.component';
import { AddNewProductComponent } from './Components/shoping-cart/add-new-product/add-new-product.component';
import { EditProductComponent } from './Components/shoping-cart/edit-product/edit-product.component';
import { CartProductComponent } from './Components/shoping-cart/cart-product/cart-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModelDilogComponent } from './Components/model-dilog/model-dilog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DailogExampleComponent } from './Components/shoping-cart/dailog-example/dailog-example.component';
import { RegistertionComponent } from './Components/registertion/registertion.component';
 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    ProductListComponent,
    FilterProductComponent,
    SidebarComponent,
    MainLayoutComponent,
    NotFoundComponent,
    LoginComponent,
    ProductDetailsComponent,
    UserlogoutComponent,
    HomeComponent,
    AddNewProductComponent,
    EditProductComponent,
    CartProductComponent,
    ModelDilogComponent,
    DailogExampleComponent,
    RegistertionComponent,
   ],
  entryComponents: [
    DailogExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
