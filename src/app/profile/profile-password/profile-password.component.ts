import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../core/storage.service'
import { UserService } from '../../core/user.service';
import { mdlUser } from '../../Models/mdUser.model'

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.css']
})
export class ProfilePasswordComponent implements OnInit {

  formGroup: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  public user: mdlUser;

  titleAlert: string = 'This field is required';

  hide: boolean = true;

  constructor(
    public userService: UserService,
    public router: Router,
    private formBuilder: FormBuilder,
    private store: StorageService) { }

  ngOnInit(): void {
    this.user = new mdlUser();
    this.user = this.store.GetUser();
    this.createForm();
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
      'password1': [null, [Validators.required, this.checkPassword]],
      'password2': [null, [Validators.required, this.checkPassword]]
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }


  getErrorPassword1() {
    return this.formGroup.get('password1').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password1').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  getErrorPassword2() {
    return this.formGroup.get('password2').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password2').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }


  onSubmit(value) {
    if (!this.formGroup.valid)
      return;

    if (value.password1 != value.password2) {
      this.errorMessage = "Password are not the same";
      return;
    }

    // this.userService.updateFBPassword(value.password1).
    //   then(result => {
    //     this.successMessage = "Your password has changed";
    //     this.errorMessage = '';
    //   })

  }
}
