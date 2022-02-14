import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cartSevice/cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isUserLogged: boolean;
  public totalItem: number = 0;
  public searchTerm!: string;
  Username: string | null = localStorage.getItem('name');
  constructor(
    private AuthService: AuthenticationService,
    private cartService: CartService
  ) {
    this.isUserLogged = this.AuthService.isUserExist;
  }

  ngOnInit(): void {
    this.cartService.getAllCarts().subscribe((data) => {
      this.totalItem = data.length;
    });

    this.AuthService.getloggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
    console.log(this.Username);
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
  logout(): void {
    this.AuthService.logout();
    this.isUserLogged = this.AuthService.isUserExist;
  }
}
