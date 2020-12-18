import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../core/storage.service'
import { EventService } from '../core/EventService.service'

import { mdlEvent, mdlEventPayment } from '../Models/mdlEvents.model';
import { mdlSettings } from '../Models/mdlSettings.model';
import { mdlUser } from '../Models/mdUser.model';

declare var paypal;

@Component({
  selector: 'app-eventpayment',
  templateUrl: './eventpayment.component.html',
  styleUrls: ['./eventpayment.component.css']
})
export class EventpaymentComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  public paidFor: boolean = false;
  public id: string;
  public udcEvent: mdlEvent;
  public eventSettings: mdlSettings;
  public textareaValue = "";
  
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private store: StorageService,
    private eventstore: EventService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const user:mdlUser = this.store.GetUser();
    this.eventSettings = this.store.GetSettings()
    this.udcEvent = this.eventstore.getEvent(this.id);
    const ccCost: number = this.udcEvent.transportcost + this.udcEvent.carecost;

    // working. simple
    //paypal
    //  .Buttons({
    //    createOrder: (data, actions) => {
    //      return actions.order.create({
    //        "intent": "CAPTURE",
    //        "purchase_units": [
    //          {
    //            "amount": {
    //              "currency_code": "AUD",
    //              "value": ccCost.toString()
    //            }
    //          }
    //        ]
    //      });
    //    },
    //    onApprove: async (data, actions) => {
    //      const order = await actions.order.capture();
    //      this.eventPayment(order);
    //    },
    //    onError: err => {
    //      console.log('paypal error', err);
    //    }
    //  })
    //  .render(this.paypalElement.nativeElement);

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

  eventPayment(order: any){

    console.log("status", order.status);
    console.log("id",order.id);
    console.log("amnt",order.purchase_units[0].amount.value);

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
