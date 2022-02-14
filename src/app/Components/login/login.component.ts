import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isUserLogged: boolean = false;
  username: string = '';
  back: any;
  constructor(
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.isUserLogged = this.authService.isUserExist;
    this.authService.getloggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
    this.activatedRoute.queryParams.subscribe(
      (params) => (this.back = params['back'])
    );
  }
  login() {
    this.authService.login(this.username, 'Password');
    this.isUserLogged = this.authService.isUserExist;
    this.router.navigateByUrl(this.back);
    console.log(this.username);
  }
  logout() {
    this.authService.logout();
    this.isUserLogged = this.authService.isUserExist;
  }
}
