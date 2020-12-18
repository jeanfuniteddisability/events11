import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { StorageService } from '../../core/storage.service'
import { AuthService } from '../../core/auth.service';
import { mdlUser } from '../../Models/mdUser.model'
import { HttpService } from '../../core/http.service'
@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {

  formGroup: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  public user: mdlUser;

  titleAlert: string = 'This field is required';

  hide: boolean = true;

  constructor(
    public authService: AuthService,
    public router: Router,
    private formBuilder: FormBuilder,
    private store: StorageService,
    private httpService: HttpService) { }

  ngOnInit(): void {
    this.user = new mdlUser();
    this.user = this.store.GetUser();

    console.log(this.user);

    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [this.user.email, [Validators.required, Validators.pattern(emailregex)]],
      'fname': [this.user.firstName, Validators.required],
      'lname': [this.user.lastName, Validators.required],
      'udcnumber': [this.user.udcNumber, Validators.required],
      'medreq': [this.user.medRequirement, [Validators.required, Validators.maxLength(50)]]
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

    this.user.email = value.email;
    this.user.firstName = value.fname;
    this.user.lastName = value.lname;
    this.user.udcNumber = value.udcnumber;
    this.user.medRequirement = value.medreq;
    this.user.region = value.region;

    this.httpService.UpdateUser(this.user)
      .then(res => {
        this.successMessage = 'User info is saved';
        this.store.SetUser(this.user);
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


}
