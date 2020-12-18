import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import { mdlSettings } from '../Models/mdlSettings.model';
import { mdlUser } from '../Models/mdUser.model';

import { StorageService } from '../core/storage.service'
import { EventService } from '../core/EventService.service'
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  errorMessage: string = '';
  titleAlert: string = 'This field is required';
  post: any = '';
  hide = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: StorageService,
    private user: UserService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getSettings();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      password: [null, [Validators.required, this.checkPassword]],
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required')
      ? 'email address is required'
      : this.formGroup.get('email').hasError('pattern')
        ? 'Not a valid email address'
        : this.formGroup.get('email').hasError('alreadyInUse')
          ? 'This email address is already in use'
          : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required')
      ? 'Field is required (at least eight characters, one uppercase letter and one number)'
      : this.formGroup.get('password').hasError('requirements')
        ? 'Password needs to be at least eight characters, one uppercase letter and one number'
        : '';
  }

  tryGoogleLogin() {
    // this.authService.doGoogleLogin().then((res) => {
    //   this.UserIsLoggedIn(res.user.email);
    //   //this.router.navigate(['eventlist']);
    // });
  }

  onSubmit(value) {
    if (value.email != null) {
      this.authService.doLogin(value).then(
        (res) => {
          this.UserIsLoggedIn(value.email);
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.message;
        }
      );
    }
  }

  UserIsLoggedIn(email: string) {
    var _user = new mdlUser();
    return new Promise((resolve, reject) => {
      this.user.GetUserInfo(email).then(
        (res: mdlUser) => {
          _user = res;
          this.store.SetUser(_user)
          //console.log(_user);
          this.router.navigate(['eventlist']);
          return resolve(false);
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.message;
          return resolve(true);
        }
      );
    })

  }

  createaccount() {
    this.router.navigate(['privacy']);
  }

  getSettings() {
    const self = this;
    this.store.ClearData();
    this.store.loadSettings().then((items: mdlSettings) => {
      this.store.SetSettings(items);
    });
  }
}


    //
    // if (email != null) {
    //   this.user.GetUserInfo(email).then(
    //     (res) => {
    //       console.log(res);
    //     },
    //     (err) => {
    //       console.log(err);
    //       this.errorMessage = err.message;
    //     }
    //   );
    // }

