import { Injectable } from '@angular/core';
import { HttpService } from './http.service'
import { LogService } from './log.service'
import { AngularFireAuth }  from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { mdlUser } from '../Models/mdUser.model';

@Injectable()
export class UserService {
  constructor(
    public afAuth: AngularFireAuth,
    private httpService: HttpService,
    private logService: LogService) { }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = this.afAuth.onAuthStateChanged(function (user) {
        if (user) {
          //console.log('user logged in');
          resolve(user);
        } else {
          //console.log('user NOT loggied in');
          reject('No user logged in');
        }
      });
    });
  }

  getFBCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = this.afAuth.currentUser;

      //if (user != null) {
      //  console.log('getFBCurrentUser', user);
      //  console.log('emailVerified', user.emailVerified);
      //  console.log('uid', user.uid);
      //  console.log('token', user.getIdToken());
      //  console.log('token result', user.getIdTokenResult);
      //}
    });
  }

  updateFBPassword(newPassword: string) {
    // return new Promise<any>((resolve, reject) => {
    //   var user = this.afAuth;
    //   user.updatePassword(newPassword).then(function () {
    //     return (resolve());
    //     // Update successful.
    //   }).catch(function (error) {
    //     console.log('psw update error');
    //     // An error happened.
    //   });

    // });
  }

  updateCurrentUser(value) {
    // return new Promise<any>((resolve, reject) => {
    //   var user = this.afAuth.currentUser;
    //   user
    //     .updateProfile({
    //       displayName: value.name,
    //       // photoURL: user.photoURL
    //     })
    //     .then(
    //       (res) => {
    //         resolve(res);
    //       },
    //       (err) => reject(err)
    //     );
    // });
  }

  GetUserInfo(email: string) {
    const promise = new Promise((resolve) => {
      this.httpService
        .getData('client/GetClient?userEmail=' + email)
        .then((data: mdlUser) => {
          resolve(data);
        })
        .catch((error) => {
          this.logService.log(error);
        });
    });
    return promise;
  }

  // SaveUser(user: mdlUser) {

  //   const promise = new Promise((resolve) => {
  //     this.httpService
  //       .getData('client/GetClient?userEmail=' + user.email)
  //       .then((data: any) => {
  //         resolve(data);
  //       })
  //       .catch((error) => {
  //         this.logService.log(error);
  //       });
  //   });
  //   return promise;
  // }

  //UpdateUser(user: mdlUser) {

  //   const promise = new Promise((resolve) => {
  //     this.httpService
  //       .getData('client/GetClient?userEmail=' + user.email)
  //       .then((data: any) => {
  //         resolve(data);
  //       })
  //       .catch((error) => {
  //         this.logService.log(error);
  //       });
  //   });
  //   return promise;
  // }

}
