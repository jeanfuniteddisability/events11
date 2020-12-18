import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { mdlSettings } from '../Models/mdlSettings.model';
import { StorageService } from '../core/storage.service'

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  public showTicks: boolean = false;
  public eventSettings: mdlSettings;

  constructor(private route: ActivatedRoute,
    public router: Router,
    private store: StorageService) { }

  ngOnInit(): void {
    this.eventSettings = this.store.GetSettings()
  }

  ToggleAgree(val) {
    console.log(val);
  }
  signup(signintype: number) {
    if (signintype == 1)
      this.router.navigate(['registerUDC']);
    else
      this.router.navigate(['register', { type: signintype }]);
  }

  signout() {
    this.router.navigate(['login']);
  }

}
