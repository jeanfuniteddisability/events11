import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { mdlUser, mdlauthSetting } from '../../Models/mdUser.model'
import { StorageService } from '../../core/storage.service'

@Component({
  selector: 'app-profile-auth',
  templateUrl: './profile-auth.component.html',
  styleUrls: ['./profile-auth.component.css']
})
export class ProfileAuthComponent implements OnInit {

  public user: mdlUser;
  public authSettings: mdlauthSetting[];
  color: ThemePalette = 'accent';
  disabled = false;

  constructor(
    private store: StorageService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = new mdlUser();
    this.user = this.store.GetUser();
    this.authSettings = this.user.authSettings;
  }

  updateToggle(id: string) {
    const self = this;

    self.authSettings.forEach(function (value) {
      if (value.id == id) {
        if (value.setting == 0)
          value.setting = 1;
        else
          value.setting = 0;
      }
    })

    self.cdr.detectChanges();

    // todo: api call
    console.log(this.authSettings);

    this.user.authSettings = this.authSettings;

    this.store.SetUser(this.user);
  }
}
