import { Injectable } from '@angular/core';
import { mdlSettings } from '../Models/mdlSettings.model';
import { mdlUser } from '../Models/mdUser.model'
import { HttpService } from '../core/http.service'

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor(
    private httpService: HttpService
  ) { }


  loadSettings() {
    const promise = new Promise((resolve) => {
      this.httpService
        .getData('events/GetSettings')
        .then((data: any) => {
          resolve(data);
        })
        .catch((error) => {
        });
    });
    return promise;
  }

  ClearData(){
    localStorage.clear();
  }
  
  SetData(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  GetData(key: string) {
    return localStorage.getItem(key)
  }

  SetSettings(settings: mdlSettings) {
    localStorage.setItem("settings", JSON.stringify(settings))
  }

  GetSettings() {
    return JSON.parse(localStorage.getItem("settings"));
  }

  SetUser(user: mdlUser) {
    localStorage.setItem("user", JSON.stringify(user))
  }

  GetUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  GetUserEmail() {
    const _user: mdlUser = JSON.parse(localStorage.getItem("user"));
    return _user.email;
  }
}


// @Injectable({
//   providedIn: 'root'
// })
// export class EventStorage {

//   constructor(
//     private httpService: HttpService,
//     private logService: LogService
//   ) { }


//   loadEvents() {
//     const user: string = 'jeanf@uniteddisability.com.au'
//     const promise = new Promise((resolve) => {
//       this.httpService
//         .getData('events/GetEventList?userEmail=' + user)
//         .then((data: any) => {
//           resolve(data);
//         })
//         .catch((error) => {
//           this.logService.log(error);
//         });
//     });
//     return promise;
//   }

//   RefreshEventList() {

//     const udcEventlist: mdlEventList = new mdlEventList();
//     const event2 = new mdlEvent();
//     event2.id = 2;
//     event2.title = 'Learn to paint!';
//     event2.descr =
//       'This is a short course for learning to paint. Please come along! Paint will be provided';
//     event2.date = '2 October 2020';
//     event2.time = '23:00 PM';
//     event2.cost = 15;
//     event2.img = './assets/img/painting.jpg';
//     event2.location = 'Robina Drive, Robina';
//     event2.status = 1;
//     udcEventlist.events.push(event2);

//     const event3 = new mdlEvent();
//     event3.id = 3;
//     event3.title = 'Coffee morning to be confirmed';
//     event3.descr = 'Meet and greet coffee & refreshments';
//     event3.date = '25 October 2020';
//     event3.time = '10:00 AM';
//     event3.cost = 5;
//     event3.carecost = 25.50;
//     event3.transport = 1;
//     event3.transportcost = 12.55;
//     event3.totalcost = 43.05;
//     event3.img = './assets/img/cofeemorning.jpg';
//     event3.location = 'Robina Drive, Robina';
//     event3.status = 3;
//     udcEventlist.events.push(event3);

//     const event5 = new mdlEvent();
//     event5.id = 5;
//     event5.title = 'Coffee morning confirmed';
//     event5.descr = 'Meet and greet coffee & refreshments';
//     event5.date = '25 October 2020';
//     event5.time = '10:00 AM';
//     event5.cost = 5;
//     event5.carecost = 25.50;
//     event5.transport = 1;
//     event5.transportcost = 12.55;
//     event5.totalcost = 43.05;
//     event5.img = './assets/img/cofeemorning.jpg';
//     event5.location = 'Robina Drive, Robina';
//     event5.status = 4;
//     udcEventlist.events.push(event5);



//     const event4 = new mdlEvent();
//     event4.id = 4;
//     event4.title = 'AFL: St Kilda v GWS';
//     event4.descr = 'St Kilda v GWS';
//     event4.date = '2 December 2020';
//     event4.time = '11:00 AM';
//     event4.cost = 5;
//     event4.img = './assets/img/footy.jpg';
//     event4.location = 'Sydney';
//     event4.status = 1;
//     udcEventlist.events.push(event4);

//     // for (let i = 0; i < 30; i++) {
//     //   const event1 = new mdlEvent();
//     //   event1.id = i;
//     //   event1.title = "event " + i;
//     //   event1.descr = "this is the first event";
//     //   event1.date = "1 October 2020";
//     //   event1.time = "2:00 PM";
//     //   event1.cost = 15
//     //   event1.img= "./assets/img/cofeemorning.jpg"
//     //   this.udcEventlist.events.push(event1);
//     // }

//     localStorage.setItem("eventlist", JSON.stringify(udcEventlist))

//   }

//   GetEventList() {
//     return JSON.parse(localStorage.getItem("eventlist"));
//   }

//   getEvent(id: number): mdlEvent {
//     const udcEventlist = JSON.parse(localStorage.getItem("eventlist"));
//     for (let i = 0; i < udcEventlist.events.length; i++) {
//       if (udcEventlist.events[i].id == id) {
//         return udcEventlist.events[i];
//       }
//     }
//   }

//   BookEvent(id: number) {
//     const udcEventlist = JSON.parse(localStorage.getItem("eventlist"));
//     for (let i = 0; i < udcEventlist.events.length; i++) {

//       if (udcEventlist.events[i].id == id) {
//         udcEventlist.events[i].status = 2;
//       }
//     }
//     localStorage.setItem("eventlist", JSON.stringify(udcEventlist))

//     // server update book event

//   }

//   UNBookEvent(id: number) {
//     const udcEventlist = JSON.parse(localStorage.getItem("eventlist"));
//     for (let i = 0; i < udcEventlist.events.length; i++) {

//       if (udcEventlist.events[i].id == id) {
//         udcEventlist.events[i].status = 1;
//       }
//     }
//     localStorage.setItem("eventlist", JSON.stringify(udcEventlist))

//     // server confirm unbook event


//   }

//   confirmevent(id: number) {
//     const udcEventlist = JSON.parse(localStorage.getItem("eventlist"));
//     for (let i = 0; i < udcEventlist.events.length; i++) {

//       if (udcEventlist.events[i].id == id) {
//         udcEventlist.events[i].status = 4;
//       }
//     }
//     localStorage.setItem("eventlist", JSON.stringify(udcEventlist))

//     // server confirm book event

//   }


//}
