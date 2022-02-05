import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AddNewProductComponent } from './Components/shoping-cart/add-new-product/add-new-product.component';
import { CartProductComponent } from './Components/shoping-cart/cart-product/cart-product.component';
import { EditProductComponent } from './Components/shoping-cart/edit-product/edit-product.component';
import { FilterProductComponent } from './Components/shoping-cart/filter-product/filter-product.component';
import { ProductDetailsComponent } from './Components/shoping-cart/product-details/product-details.component';
import { ProductListComponent } from './Components/shoping-cart/product-list/product-list.component';
import { UserlogoutComponent } from './Components/userlogout/userlogout.component';
import { RegistertionComponent } from './Components/registertion/registertion.component';

import { AuthGuard } from './Gaurds/auth.guard';
import { UserModule } from 'src/app/Components/profileModeul/user.module';
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      {
        path: 'products',
        component: FilterProductComponent,
      },
      { path: 'home', component: HomeComponent },
    ],
  },
  { path: 'addProduct', component: AddNewProductComponent },
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'editproduct', component: EditProductComponent },
  { path: 'editproduct/:id', component: EditProductComponent },
  { path: 'register', component: RegistertionComponent },
  { path: 'cart', component: CartProductComponent, canActivate: [AuthGuard] },
  {
    path: 'user',
    loadChildren: () =>
      import('src/app/Components/profileModeul/user.module').then(
        (m) => m.UserModule
      ),
  },
  { path: 'logout', component: UserlogoutComponent },

  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
