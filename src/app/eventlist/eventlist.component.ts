import { Component, OnInit, ɵConsole } from '@angular/core';

import { EventService } from '../core/EventService.service'
import { StorageService } from '../core/storage.service'
import { UserService } from '../core/user.service'

import { mdlEventList } from '../Models/mdlEvents.model';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css'],
})

export class EventlistComponent implements OnInit {
  public udcEventlist: mdlEventList = new mdlEventList();

  public totalEvents: number = 0;
  public newEvents: number = 0;
  public bookedEvents: number = 0;
  public tobeConfirmedEvents: number = 0;
  public confirmedEvents: number = 0;

  constructor(
    private eventService: EventService,
    private store: StorageService,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.eventService.loadEvents(this.store.GetUserEmail()).then((items: mdlEventList) => {
      this.store.SetData("eventlist", JSON.stringify(items));
      this.udcEventlist = items;
      //console.log(this.udcEventlist)
      this.Calceventsno();
    });


    this.userservice.getFBCurrentUser();
  }

  private Calceventsno() {
    this.totalEvents = this.udcEventlist.events.length;
    for (let i = 0; i < this.udcEventlist.events.length; i++) {
      if (this.udcEventlist.events[i].status == 1) {
        this.newEvents = this.newEvents + 1;
      }
      if (this.udcEventlist.events[i].status == 2) {
        this.bookedEvents = this.bookedEvents + 1;
      }
      if (this.udcEventlist.events[i].status == 3) {
        this.tobeConfirmedEvents = this.tobeConfirmedEvents + 1;
      }
      if (this.udcEventlist.events[i].status == 4) {
        this.confirmedEvents = this.confirmedEvents + 1;
      }
    }
  }

}
