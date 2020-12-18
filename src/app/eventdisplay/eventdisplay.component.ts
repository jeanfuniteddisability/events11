import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mdlSettings } from '../Models/mdlSettings.model';
import { StorageService } from '../core/storage.service'
import { mdlEvent, mdlEventStatus, mdlEventPayment } from '../Models/mdlEvents.model';
import { EventService } from '../core/EventService.service'
//import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { mdlUser } from '../Models/mdUser.model';

// import { __exportStar } from 'tslib';
// import { _supportsShadowDom } from '@angular/cdk/platform';

declare var paypal;

@Component({
  selector: 'app-eventdisplay',
  templateUrl: './eventdisplay.component.html',
  styleUrls: ['./eventdisplay.component.css'],
})
export class EventdisplayComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  public id: string;
  public udcEvent: mdlEvent;
  public eventSettings: mdlSettings;
  public showbooked: boolean;
  public textareaValue = "";
  public transport: number = 0;
  public careRatio: number = 2;
  //public eventbooking: FormGroup;

  public makepayment: number = 0;

  public paidFor: boolean = false;
  private Booked: boolean;

  //formGroup: FormGroup;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private store: StorageService,
    private eventstore: EventService//,
    //private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.showbooked = false;

    this.eventSettings = this.store.GetSettings()
    this.udcEvent = this.eventstore.getEvent(this.id);

    console.log(this.udcEvent);

    //this.formGroup = this.formBuilder.group({
    //  'transport': [false],
    //  'careRatio': [2],
    //  'comment': ['']
    //});

    this.Booked = false;
  }

  booknow(id: number) {
    this.Booked = true;
    //this.showbooked = true;
    //this.eventstore.BookEvent(this.id, this.textareaValue, this.transport, this.careRatio);
  }

  onSubmit(value) {
    if (this.Booked) {
      const _estatus: mdlEventStatus = new mdlEventStatus();
      _estatus.eventid = this.id;
      _estatus.comment = value.comment;
      _estatus.careRatio = +value.careRatio;
      if (value.transport)
        _estatus.transport = 1;
      else
        _estatus.transport = 0;
      _estatus.status = 2;
      //console.log(_estatus);
      this.eventstore.BookEvent(_estatus);

      this.showbooked = true;
    }

  }

  unbooknow(id: string) {
    this.eventstore.UNBookEvent(id, this.textareaValue);
    this.router.navigate(['eventlist']);
  }

  confirmevent(id: string) {
    //this.router.navigate(['eventpayment', { id: id }]);

    // testing
    //this.udcEvent.totalcost = 100;

    const ccCost: number = this.udcEvent.totalcost;

    if (this.udcEvent.totalcost > 0) {
      const user: mdlUser = this.store.GetUser();
      this.makepayment = 1;

      // actual payment
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              "payer": { //Pass and prefill buyer details like first name, lastname, email address and phone number
                "name": {
                  "given_name": user.firstName,
                  "surname": user.lastName
                },
                "email_address": user.email,
                "phone": {
                  "phone_number": {
                    "national_number": "9874563210"
                  }
                },
                "address": { //Pass and prefill buyer billing address details
                  "address_line_1": user.addressLine1, //"10, east street",
                  "address_line_2": user.addressLine2, //"second building",
                  "admin_area_1": user.state, // "Queensland",
                  "admin_area_2": user.subsurb, //"Robina",
                  "postal_code": user.postcode, //"4226",
                  "country_code": "AU"
                }
              },
              "intent": "CAPTURE",
              "purchase_units": [
                {
                  "amount": {
                    "currency_code": "AUD",
                    "value": ccCost.toString()
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.eventPayment(order);
          },
          onError: err => {
            console.log('paypal error', err);
          }
        })
        .render(this.paypalElement.nativeElement);

    }
    else {
      const paym: mdlEventPayment = new mdlEventPayment();
      paym.eventid = this.id;
      paym.paystatus = "NDIS";
      paym.payid = "";
      paym.payamount = ccCost;
      paym.paydate = '';
      this.eventstore.EventPayment(paym);

      this.router.navigate(['eventlist']);
    }
   
  }


  eventPayment(order: any) {

    console.log("status", order.status);
    console.log("id", order.id);
    console.log("amnt", order.purchase_units[0].amount.value);

    const paym: mdlEventPayment = new mdlEventPayment();
    paym.eventid = this.id;
    paym.paystatus = order.status;
    paym.payid = order.id;
    paym.payamount = +order.purchase_units[0].amount.value;
    paym.paydate = '';

    this.eventstore.EventPayment(paym);

    this.paidFor = true;

  }

  backtolist() {
    this.router.navigate(['eventlist']);
  }
}
