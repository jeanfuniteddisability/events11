import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { timeout, catchError } from "rxjs/operators";
import { StorageService } from "../core/storage.service";
import { mdlUser } from '../Models/mdUser.model'

@Injectable({
  providedIn: "root",
})
export class LogService {
  //prod
  private logUrl = 'https://api.corplinkservices.com.au:44333/UDCLog/api/log/AppLog';

  // localhost
  //private logUrl = "https://localhost:44300/api/log/AppLog";

  private httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "user-key": "28236d8ec201df516d0f6472d516d72d",
    }),
  };

  public user: mdlUser;
  constructor(public dataService: StorageService, public http: HttpClient) {}

  log(message: string) {
    var username: string = "";
    this.user = this.dataService.GetUser();
    if (this.user != null) username = this.user ? this.user.lastName : "janf";
    else username = "unknow";

    const payload = {
      system: "UDC Events",
      user: this.user ? this.user.lastName : "janf",
      message: message,
    };
    console.log("*******************  applog  *********************************");
    console.log(payload);
    console.log("************************************************************");

    const promise = new Promise((resolve, reject) => {
      this.http
        .post(this.logUrl, payload, this.httpOptions)
        .pipe(
          timeout(120000),
          catchError((e) => {
            let msg = "Something went wrong. Please contact Administrator.";
            if (e.error) {
              msg = e.error.title;
            }
            reject(msg);
            return [];
          })
        )
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => reject(`Error when trying to make client call:${err}`),
          () => {}
        );
    });
    return promise;
  }
}