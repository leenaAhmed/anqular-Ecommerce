import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isUserLogged: boolean;
  Username: string | null = localStorage.getItem('name');
  constructor(private AuthService: AuthenticationService) {
    this.isUserLogged = this.AuthService.isUserExist;
  }

  ngOnInit(): void {
    this.AuthService.getloggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
    console.log(this.Username);
  }
  logout() {
    this.AuthService.logout();
    this.isUserLogged = this.AuthService.isUserExist;
  }
}
