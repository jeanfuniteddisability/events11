import { Component, OnInit } from '@angular/core';
import { mdlEventList } from '../Models/mdlEvents.model';
import { mdlSettings } from '../Models/mdlSettings.model';
import { ActivatedRoute, Router } from '@angular/router';
import {  StorageService } from '../core/storage.service'
import { EventService } from '../core/EventService.service'

@Component({
  selector: 'app-myevents',
  templateUrl: './myevents.component.html',
  styleUrls: ['./myevents.component.css']
})
export class MyeventsComponent implements OnInit {

  
  public totalEvents: number = 0;
  public newEvents: number = 0;
  public bookedEvents: number = 0;
  public confirmedEvents: number = 0;
  public tobeConfirmedEvents: number = 0;
  public bookedConfirmed: number = 0;
  
  public type: string;
  public udcEventlist: mdlEventList = new mdlEventList();
  public eventSettings: mdlSettings;
  public textareaValue = "";

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private store: StorageService,
    private eventstore: EventService
  ) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');

    this.udcEventlist = this.eventstore.GetEventList();
    this.eventSettings = this.store.GetSettings();
    this.Calceventsno();
  }

  unbooknow(id: string) {
    this.eventstore.UNBookEvent(id, this.textareaValue);
    this.router.navigate(['eventlist']);
  }

  confirmevent(id: string) {
    this.eventstore.confirmevent(id, this.textareaValue);
    this.router.navigate(['eventlist']);
  }


  home() {
    this.router.navigate(['eventlist']);
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
    this.bookedConfirmed =  this.bookedEvents +  this.confirmedEvents
  }
}
