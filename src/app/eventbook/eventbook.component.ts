import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mdlSettings } from '../Models/mdlSettings.model';
import { StorageService } from '../core/storage.service'
import { mdlEvent, mdlEventStatus } from '../Models/mdlEvents.model';
import { EventService } from '../core/EventService.service'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { mdlUser } from '../Models/mdUser.model';
import { AUTO_STYLE } from '@angular/animations';

@Component({
  selector: 'app-eventbook',
  templateUrl: './eventbook.component.html',
  styleUrls: ['./eventbook.component.css'],
})
export class EventbookComponent implements OnInit {

  public id: string;
  public udcEvent: mdlEvent;
  public eventSettings: mdlSettings;
  public showbooked: boolean;
  public textareaValue = "";
  public transport: number = 0;
  public careRatio: number = 2;
  public transportPay: number = 1;
  public eventbooking: FormGroup;
  public bookedMessage: string = "";
  public udc: boolean;

  formGroup: FormGroup;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private store: StorageService,
    private eventstore: EventService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.showbooked = false;

    const user: mdlUser = this.store.GetUser();
    this.udc = user.udcNumber != null;

    this.eventSettings = this.store.GetSettings()
    this.udcEvent = this.eventstore.getEvent(this.id);
    this.formGroup = this.formBuilder.group({
      'transport': [false],
      'transportPay': [0],
      'careRatio': [0],
      'comment': [''],
      'planManager': [false]
    });

  }

  onSubmit(value) {

    if (value.careRatio == "0") {
      this.bookedMessage = "Please select support required"
      return
    }

    if (value.transport) {
      if (value.transportPay == "0") {
        this.bookedMessage = "Please transport payment method"
        return
      }

    }
    const _estatus: mdlEventStatus = new mdlEventStatus();
    _estatus.eventid = this.id;
    _estatus.comment = value.comment;
    _estatus.careRatio = +value.careRatio;
    _estatus.transport = value.transport ? 1 : 0;
    _estatus.status = 2;
    _estatus.transportPay = +value.transportPay;
    _estatus.planManager = value.planManager ? 1 : 0;

    this.eventstore.BookEvent(_estatus);
    this.showbooked = true;
    this.bookedMessage = "You are now booked for this event. You will be notified of the event details by email!"

  }

  backtolist() {
    this.router.navigate(['eventlist']);
  }
}

