import { _supportsShadowDom } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { __exportStar } from 'tslib';
import { mdlEvent, mdlEventStatus, mdlEventPayment } from '../Models/mdlEvents.model';
import { HttpService } from './http.service'
import { LogService } from './log.service'

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(
    private httpService: HttpService,
    private logService: LogService
  ) { }

  loadEvents(email: string) {
    const promise = new Promise((resolve) => {
      this.httpService
        .getData('events/GetEventList?userEmail=' + email)
        .then((data: any) => {
          resolve(data);
        })
        .catch((error) => {
          this.logService.log(error);
        });
    });
    return promise;
  }


  GetEventList() {
    return JSON.parse(localStorage.getItem("eventlist"));
  }

  getEvent(id: string): mdlEvent {
    const udcEventlist = JSON.parse(localStorage.getItem("eventlist"));
    for (let i = 0; i < udcEventlist.events.length; i++) {
      if (udcEventlist.events[i].id == id) {
        return udcEventlist.events[i];
      }
    }
  }

  BookEvent(_estatus: mdlEventStatus) {
    const udcEventlist = JSON.parse(localStorage.getItem("eventlist"));
    for (let i = 0; i < udcEventlist.events.length; i++) {

      if (udcEventlist.events[i].id == _estatus.eventid) {
        udcEventlist.events[i].status = 2;
      }
    }
    localStorage.setItem("eventlist", JSON.stringify(udcEventlist))

    // server update book event
    console.log(_estatus);
    this.UpdateEventStatus(_estatus);
  }

  UNBookEvent(id: string, comment: string) {
    const udcEventlist = JSON.parse(localStorage.getItem("eventlist"));
    for (let i = 0; i < udcEventlist.events.length; i++) {

      if (udcEventlist.events[i].id == id) {
        udcEventlist.events[i].status = 1;
      }
    }
    localStorage.setItem("eventlist", JSON.stringify(udcEventlist))

    const _estatus: mdlEventStatus = new mdlEventStatus();
    _estatus.eventid = id;
    _estatus.comment = comment;
    _estatus.status = 1;

    // server confirm unbook event
    this.UpdateEventStatus(_estatus);


  }

  confirmevent(id: string, comment: string) {
    const udcEventlist = JSON.parse(localStorage.getItem("eventlist"));
    for (let i = 0; i < udcEventlist.events.length; i++) {

      if (udcEventlist.events[i].id == id) {
        udcEventlist.events[i].status = 4;
      }
    }
    localStorage.setItem("eventlist", JSON.stringify(udcEventlist))

    const _estatus: mdlEventStatus = new mdlEventStatus();
    _estatus.eventid = id;
    _estatus.comment = comment;
    _estatus.status = 4;

    // server confirm book event
    this.UpdateEventStatus(_estatus);
  }

  UpdateEventStatus(_estatus: mdlEventStatus) {

    const _user = JSON.parse(localStorage.getItem("user"));
    _estatus.email = _user.email;
    const promise = new Promise((resolve) => {
      this.httpService.UpdateStatusEvent(_estatus).then((data: any) => {
        resolve(data);
        //this.logService.log("Data is saved");
      }).catch(error => {
        this.logService.log("cannot save data : " + JSON.stringify(error));
      }).finally(() => {
      });
      resolve();
    });
    return promise;
  }

  // ************** payments *********************
  EventPayment(paym: mdlEventPayment) {
    //
    // update server with payment
    //

    console.log(paym);
    
    const _user = JSON.parse(localStorage.getItem("user"));
    paym.email = _user.email;

    const promise = new Promise((resolve) => {
      this.httpService.EventPayment(paym).then((data: any) => {
        resolve(data);

        // update local event list
        const udcEventlist = JSON.parse(localStorage.getItem("eventlist"));
        for (let i = 0; i < udcEventlist.events.length; i++) {

          if (udcEventlist.events[i].id == paym.eventid) {
            udcEventlist.events[i].status = 4;
          }
        }
        localStorage.setItem("eventlist", JSON.stringify(udcEventlist))

        this.logService.log("Data is saved");

      }).catch(error => {
        this.logService.log("cannot save data : " + JSON.stringify(error));
      }).finally(() => {
      });
      resolve();
    });
    return promise;
  }
  // ************** payments *********************

}


  // RefreshEventList() {

  //   const udcEventlist: mdlEventList = new mdlEventList();
  //   const event2 = new mdlEvent();
  //   event2.id = 2;
  //   event2.title = 'Learn to paint!';
  //   event2.descr =
  //     'This is a short course for learning to paint. Please come along! Paint will be provided';
  //   event2.date = '2 October 2020';
  //   event2.time = '23:00 PM';
  //   event2.cost = 15;
  //   event2.img = './assets/img/painting.jpg';
  //   event2.location = 'Robina Drive, Robina';
  //   event2.status = 1;
  //   udcEventlist.events.push(event2);

  //   const event3 = new mdlEvent();
  //   event3.id = 3;
  //   event3.title = 'Coffee morning to be confirmed';
  //   event3.descr = 'Meet and greet coffee & refreshments';
  //   event3.date = '25 October 2020';
  //   event3.time = '10:00 AM';
  //   event3.cost = 5;
  //   event3.carecost = 25.50;
  //   event3.transport = 1;
  //   event3.transportcost = 12.55;
  //   event3.totalcost = 43.05;
  //   event3.img = './assets/img/cofeemorning.jpg';
  //   event3.location = 'Robina Drive, Robina';
  //   event3.status = 3;
  //   udcEventlist.events.push(event3);

  //   const event5 = new mdlEvent();
  //   event5.id = 5;
  //   event5.title = 'Coffee morning confirmed';
  //   event5.descr = 'Meet and greet coffee & refreshments';
  //   event5.date = '25 October 2020';
  //   event5.time = '10:00 AM';
  //   event5.cost = 5;
  //   event5.carecost = 25.50;
  //   event5.transport = 1;
  //   event5.transportcost = 12.55;
  //   event5.totalcost = 43.05;
  //   event5.img = './assets/img/cofeemorning.jpg';
  //   event5.location = 'Robina Drive, Robina';
  //   event5.status = 4;
  //   udcEventlist.events.push(event5);



  //   const event4 = new mdlEvent();
  //   event4.id = 4;
  //   event4.title = 'AFL: St Kilda v GWS';
  //   event4.descr = 'St Kilda v GWS';
  //   event4.date = '2 December 2020';
  //   event4.time = '11:00 AM';
  //   event4.cost = 5;
  //   event4.img = './assets/img/footy.jpg';
  //   event4.location = 'Sydney';
  //   event4.status = 1;
  //   udcEventlist.events.push(event4);

  //   // for (let i = 0; i < 30; i++) {
  //   //   const event1 = new mdlEvent();
  //   //   event1.id = i;
  //   //   event1.title = "event " + i;
  //   //   event1.descr = "this is the first event";
  //   //   event1.date = "1 October 2020";
  //   //   event1.time = "2:00 PM";
  //   //   event1.cost = 15
  //   //   event1.img= "./assets/img/cofeemorning.jpg"
  //   //   this.udcEventlist.events.push(event1);
  //   // }

  //   localStorage.setItem("eventlist", JSON.stringify(udcEventlist))

  // }