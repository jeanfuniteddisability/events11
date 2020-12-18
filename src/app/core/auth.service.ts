import { Injectable } from "@angular/core";
//import 'rxjs/add/operator/toPromise';
import { AngularFireAuth }  from '@angular/fire/auth';
import 'firebase'

@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  //doFacebookLogin() {
  //  return new Promise<any>((resolve, reject) => {
  //    let provider = new firebase.auth.FacebookAuthProvider();
  //    this.afAuth
  //      .signInWithPopup(provider)
  //      .then(res => {
  //        resolve(res);
  //      }, err => {
  //        console.log(err);
  //        reject(err);
  //      })
  //  })
  //}

  //doTwitterLogin() {
  //  return new Promise<any>((resolve, reject) => {
  //    let provider = new firebase.auth.TwitterAuthProvider();
  //    this.afAuth
  //      .signInWithPopup(provider)
  //      .then(res => {
  //        resolve(res);
  //      }, err => {
  //        console.log(err);
  //        reject(err);
  //      })
  //  })
  //}

  doGoogleLogin() {
    // return new Promise<any>((resolve, reject) => {
    //   let provider = new this.afAuth.GoogleAuthProvider()
    //   provider.addScope('profile');
    //   provider.addScope('email');
    //   this.afAuth
    //     .signInWithPopup(provider)
    //     .then(result => {
    //       resolve(result);
    //     }, err => {
    //       console.log(err);
    //       reject(err);
    //     })
    // })
  }

  GetEmail() {
    return '';
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut();
        resolve();
      }
      else {
        reject();
      }
    });
  }


}
