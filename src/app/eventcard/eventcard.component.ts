import { Component, OnInit, Input } from '@angular/core';
import { mdlEvent } from '../Models/mdlEvents.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-eventcard',
  templateUrl: './eventcard.component.html',
  styleUrls: ['./eventcard.component.css']
})
export class EventcardComponent implements OnInit {
  @Input() myevent: mdlEvent;

  constructor(
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  eventdisplay(id: number) {
    if (this.myevent.status == 1 && this.myevent.isBookedOut) {
      this.dialog.open(bookedDialog);
      return;
    }
 
    
    if(this.myevent.status == 1)
    {
      this.router.navigate(['eventbook', { id: id }]);
    }
   else
    {
      this.router.navigate(['eventdisplay', { id: id }]);
    }
  }

  closedialog() {
    console.log("close");
    this.dialog.closeAll();
  }
}

@Component({
  selector: 'bookedDialog',
  templateUrl: 'bookedDialog.html',
})
export class bookedDialog { }
