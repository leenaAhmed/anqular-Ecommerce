import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isUserLogged: boolean = false;
  username: string = '';

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserExist;
    this.authService.getloggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
  }
  login() {
    this.authService.login(this.username, 'Password');
    this.isUserLogged = this.authService.isUserExist;
    console.log(this.username);
  }
  logout() {
    this.authService.logout();
    this.isUserLogged = this.authService.isUserExist;
  }
}
