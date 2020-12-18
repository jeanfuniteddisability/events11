export class mdlEventList {
  events: mdlEvent[];

  constructor() {
    this.events = [];
  }
}

export class mdlEvent {
  id: number = 0;
  title: string = '';
  descr: string = '';
  img: string = '';
  location: string = '';
  date: string = '';
  time: string = '';
  cost: number = 0;
  status: number = 0;         // 1 = planned, 2 = booked, 3 = to be confirmed , 4 = confirmed, 5 = cancelled
  transport: number = 0;
  carecost: number = 0;
  transportcost: number = 0;
  totalcost: number = 0;
  bankable: number = 0;
  nearMe: number = 0;
  eventStatus: number = 0;
  cancelReason: string = '';
  isNDIS: number = 0;
  transportPay: string = '';
  careRatio: number = 0;
  planManager: string = '';
  maxPart: number = 0;
  isBookedOut: number = 0;
}

export class mdlEventStatus {
  email: string = '';
  eventid: string = '';
  status: number = 0;
  comment: string = '';
  transport: number = 0;
  transportPay: number = 0;
  careRatio: number = 0;
  planManager: number = 0;
}

export class mdlEventPayment {
  email: string = '';
  eventid: string = '';
  paystatus: string = '';
  payid: string = '';
  paydate: string = '';
  payamount: number= 0;
}

