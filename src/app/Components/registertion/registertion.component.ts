import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { mustMatch } from '../custom/password';
import { checkEmailValidator } from '../custom/emaillValidator';
import { IUser } from '../../Models/iuser';
import { UserService } from '../../services/register/user.service';

@Component({
  selector: 'app-registertion',
  templateUrl: './registertion.component.html',
  styleUrls: ['./registertion.component.scss'],
})
export class RegistertionComponent implements OnInit {
  formValue: FormGroup;
  loading = false;
  submitted = false;
  userlist: IUser = {} as IUser;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.formValue = formBuilder.group(
      {
        fullName: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z]{3,}')],
        ],

        email: [
          '',
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        phone: formBuilder.array([
          this.formBuilder.control('', [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
            checkEmailValidator(this.userService),
          ]),
        ]),
        address: formBuilder.group({
          city: ['', Validators.required],
          postalCode: ['', Validators.required],
          street: ['', Validators.required],
        }),
        password: ['', [Validators.required], [Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        referral: [''],
        referralOther: [''],
      },
      { validators: mustMatch }
    );
  }

  ngOnInit(): void {}

  addPhone(event: any) {
    this.phoneNumbers.push(this.formBuilder.control(''));
    event.target?.classList.add('d-none');
  }
  removePhone(i: number) {
    this.phoneNumbers.removeAt(i);
  }

  onSubmit() {
    let userModel: IUser = this.formValue.value as IUser;

    this.userService.AddNewUser(userModel).subscribe((newprd) => {
      this.router.navigateByUrl('/products');
    });

    console.log('userModel', userModel);
  }
  updateReferral() {
    if (this.referral?.value == 'other') {
      this.formValue.get('referralOther')?.addValidators([Validators.required]);
    } else {
      this.formValue.get('referralOther')?.clearValidators();
    }
    this.formValue.get('referralOther')?.updateValueAndValidity();
  }
  get fullName() {
    return this.formValue.get('fullName');
  }
  get email() {
    return this.formValue.get('email');
  }
  get referral() {
    return this.formValue.get('referral');
  }
  get phoneNumbers() {
    return this.formValue.get('phone') as FormArray;
  }
  get phone() {
    return this.formValue.get('phone');
  }
  get city() {
    return this.formValue.get('address.city');
  }
  get postalCode() {
    return this.formValue.get('address.postalCode');
  }
  get street() {
    return this.formValue.get('address.street');
  }
  get password() {
    return this.formValue.get('password');
  }
  get confirmPassword() {
    return this.formValue.get('confirmPassword');
  }
  get f() {
    return this.formValue.controls;
  }
}
