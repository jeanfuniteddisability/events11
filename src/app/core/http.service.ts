import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { timeout, catchError } from "rxjs/operators";
import { mdlUser } from '../Models/mdUser.model'
import { mdlEventStatus, mdlEventPayment } from '../Models/mdlEvents.model';

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "user-key": "28236d8ec201df516d0f6472d516d72d",
    }),
  };

  // prod
  private apEventsUrl = 'https://api.corplinkservices.com.au:44333/events/';
  // localhost
  //private apEventsUrl = "https://localhost:44361/";

  constructor(
    public http: HttpClient) { }

  getData(endPoint, external = false, t = 120000) {
    const self = this;

    let url = self.apEventsUrl + endPoint;

    if (external) {
      url = endPoint;
    }

    const promise = new Promise((resolve, reject) => {
      self.http
        .get(url, self.httpOptions)
        .pipe(
          timeout(t),
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
          () => { }
        );
    });
    return promise;
  }


  SaveUser(payload: mdlUser) {
    const url = this.apEventsUrl + 'client/saveclient';

    // console.log("************************************************************");
    // console.log(payload);
    // console.log("************************************************************");

    const promise = new Promise((resolve, reject) => {
      this.http
        .post(url, payload, this.httpOptions)
        .pipe(
          timeout(120000),
          catchError((e) => {
            let msg = "Something went wrong. Please contact Administrator.";
            if (e.error) {
              msg = e.error.text;
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
          () => { }
        );
    });
    return promise;
  }

  UpdateUser(payload: mdlUser) {
    const url = this.apEventsUrl + 'client/updateclient';

    // console.log("************************************************************");
    // console.log(payload);
    // console.log("************************************************************");

    const promise = new Promise((resolve, reject) => {
      this.http
        .post(url, payload, this.httpOptions)
        .pipe(
          timeout(120000),
          catchError((e) => {
            let msg = "Something went wrong. Please contact Administrator.";
            if (e.error) {
              msg = e.error.text;
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
          () => { }
        );
    });
    return promise;
  }


  UpdateStatusEvent(payload: mdlEventStatus) {

    console.log("payload", payload);

    const url = this.apEventsUrl + 'events/EventStatusUpdate';

    const promise = new Promise((resolve, reject) => {
      this.http
        .post(url, payload, this.httpOptions)
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
          () => { }
        );
    });
    return promise;
  }

  EventPayment(paym: mdlEventPayment) {

    console.log(paym);

    const url = this.apEventsUrl + 'events/EventPayment';

    const promise = new Promise((resolve, reject) => {
      this.http
        .post(url, paym, this.httpOptions)
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
          () => { }
        );
    });
    return promise;
  }

}
