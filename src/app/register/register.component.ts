import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
import { HttpService } from '../core/http.service'
import { LogService } from '../core/log.service'

import { mdlUser } from '../Models/mdUser.model'

interface Regions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formGroup: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  regions: Regions[] = [
    { value: '1', viewValue: 'Gold Coast' },
    { value: '2', viewValue: 'Tweed Heads' },
    { value: '3', viewValue: 'Noth Brisbane' }
  ];

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
    this.loadRegions();
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': ["", [Validators.required, Validators.pattern(emailregex)]],
      'fname': ["", Validators.required],
      'lname': ["", Validators.required],
      'password': [null, [Validators.required, this.checkPassword]],
      'medreq': ["", Validators.required],
      'dob': [null, Validators.required],
      'region': [null, Validators.required],
      'provider': [null],
      'planmanager': [null],
      'addressline': [null, Validators.required],
      'suburb': [null, Validators.required],
      'postcode': [null, Validators.required],
      'state': [null, Validators.required],
    });
  }


  get fname() {
    return this.formGroup.get('fname') as FormControl
  }

  get lname() {
    return this.formGroup.get('lname') as FormControl
  }

  get medreq() {
    return this.formGroup.get('medreq') as FormControl
  }

  get region() {
    return this.formGroup.get('region') as FormControl
  }

  validatemedreq(control: AbstractControl) {
    return true;
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

  //  tryGoogleLogin(){
  //    this.authService.doGoogleLogin()
  //    .then(res =>{
  //      this.router.navigate(['/user']);
  //    }, err => console.log(err)
  //    )
  //  }

  onSubmit(value) {

    console.log("submit", this.formGroup);

    if (!this.formGroup.valid)
      return;

    const _user = new mdlUser();
    _user.email = value.email;
    _user.firstName = value.fname;
    _user.lastName = value.lname;
    _user.udcNumber = "";
    _user.medRequirement = value.medreq;
    _user.region = value.region;
    _user.dob = value.dob;
    _user.provider = value.provider;
    _user.planmanager = value.planmanager;
    _user.addressLine1 = value.addressline;
    _user.subsurb = value.suburb;
    _user.postcode = value.postcode;
    _user.state = value.state;
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

  loadRegions() {
    const promise = new Promise((resolve) => {
      this.httpService
        .getData('events/GetEventRegions')
        .then((data: any) => {
          this.regions = data.regions;
          resolve(data);
        })
        .catch((error) => {
          this.logService.log(error);
        });
    });
    return promise;
  }
}
