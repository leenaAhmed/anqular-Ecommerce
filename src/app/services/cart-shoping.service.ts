import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { ICart } from '../ViewModels/icart';

@Injectable({
  providedIn: 'root',
})
export class CartShopingService {
  private productList: IProduct[] = [];
  private products: ICart[] = [];
  constructor() {
    this.productList = [
      {
        id: 500,
        Name: 'LenovoThinkpad ',
        Price: 100000000,
        Quantity: 1,
        Img: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
        CateogryId: 1,
      },
      {
        id: 600,
        Name: 'Apple MacBook ',
        Price: 2007780,
        Quantity: 0,
        Img: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
        CateogryId: 1,
      },
      {
        id: 700,
        Name: 'nickles',
        Price: 3000,
        Quantity: 10,
        Img: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
        CateogryId: 3,
      },
      {
        id: 800,
        Name: 't-shirt ',
        Price: 40.5,
        Quantity: 2,
        Img: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
        CateogryId: 2,
      },
      {
        id: 900,
        Name: 'Pants',
        Price: 50000,
        Quantity: 0,
        Img: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
        CateogryId: 2,
      },
      {
        id: 888,
        Name: ' jw Ring',
        Price: 600,
        Quantity: 1,
        Img: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
        CateogryId: 3,
      },
    ];
  }

  getAllProducts() {
    return this.productList;
  }
  getProduct() {
    return this.products;
  }
  addToCart(product: ICart) {
    this.products.push(product);
  }
  filterByCategoryId(cateogryId: number): IProduct[] {
    if (cateogryId == 0) {
      return this.productList;
    } else {
      return this.productList.filter(
        (cateogry) => cateogry.CateogryId == cateogryId
      );
    }
  }

  getProductListById(productId: number): IProduct | null {
    let findSingleProduct = this.productList.find(
      (item) => item.id == productId
    );

    return findSingleProduct ? findSingleProduct : null;
  }

  getProductIDs(): number[] {
    let prdids: number[] = this.productList.map((product) => product.id);
    return prdids;
  }

  addNewProduct(product: IProduct) {
    this.productList.push(product);
  }
  // ICart looping and update
  updateProductQuantity(product: IProduct) {
    for (let i in this.productList) {
      if (this.productList[i].id == product.id) {
        this.productList[i] = product;
      }
    }
  }

  clearCart() {
    this.productList = [];
    return this.productList;
  }
}
