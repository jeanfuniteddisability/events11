import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
import { HttpService } from '../core/http.service'
import { LogService } from '../core/log.service'

import { mdlUser } from '../Models/mdUser.model'

@Component({
  selector: 'app-register-udc',
  templateUrl: './register-udc.component.html',
  styleUrls: ['./register-udc.component.css']
})
export class RegisterUDCComponent implements OnInit {

  formGroup: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  titleAlert: string = 'This field is required';
  post: any = '';
  hide: boolean = true;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private logService: LogService
  ) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'fname': [null, Validators.required],
      'lname': [null, Validators.required],
      'udcnumber': [null, Validators.required],
      'password': [null, [Validators.required, this.checkPassword]],
      'medreq': [null, [Validators.required, Validators.maxLength(50)]]
    });
  }


  get fname() {
    return this.formGroup.get('fname') as FormControl
  }

  get lname() {
    return this.formGroup.get('lname') as FormControl
  }

  get udcnumber() {
    return this.formGroup.get('udcnumber') as FormControl
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  createaccount() {
    this.router.navigate(['privacy']);
  }

  signout() {
    this.router.navigate(['login']);
  }


  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  onSubmit(value) {

    if (!this.formGroup.valid)
      return;

    const _user = new mdlUser();
    _user.email = value.email;
    _user.firstName = value.fname;
    _user.lastName = value.lname;
    _user.udcNumber = value.udcnumber;
    _user.medRequirement = value.medreq;
    _user.region = value.region;

    this.httpService.SaveUser(_user)
      .then(res => {

        this.authService.doRegister(value)
          .then(res => {
            this.UserIsLoggedIn(_user);
          }, err => {
            console.log(err);
            this.errorMessage = err.message;
            this.successMessage = "";
          })

      }, err => {

        if (err == "001") {
          this.errorMessage = "Client already exists";
          return false;
        }

        if (err == "002") {
          this.errorMessage = "UDC number not found. Please ensure the number is entered correctly.";
          return false;
        }

        if (err == "003") {
          this.errorMessage = "UDC Client region not found. Please contact administrator";
          return false;
        }

        //this.errorMessage = err.message;
      }
      )
  }

  UserIsLoggedIn(user: mdlUser) {
    localStorage.setItem("user", JSON.stringify(user))
    this.router.navigate(['eventlist']);
  }

}
