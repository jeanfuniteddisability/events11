import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';
import { UserComponent } from './user/user.component';
import { UserService } from './core/user.service';
import { UserResolver } from './user/user.resolver';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { LoginComponent } from './admin/login.component';
import { EventlistComponent } from './eventlist/eventlist.component';
import { EventdisplayComponent } from './eventdisplay/eventdisplay.component';
import { EventbookComponent } from './eventbook/eventbook.component';
import { MyeventsComponent } from './myevents/myevents.component';
import { EventsreqComponent } from './eventsreq/eventsreq.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { StorageService} from './core/storage.service'
import { EventService} from './core/EventService.service'
import { HttpService } from './core/http.service'

import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { UdcCompanyComponent } from './udc-company/udc-company.component';
import { RegisterUDCComponent } from './register-udc/register-udc.component';
import { EventcardComponent } from './eventcard/eventcard.component';
import { EventpaymentComponent } from './eventpayment/eventpayment.component';
import { ProfileMenuComponent } from './profile/profile-menu/profile-menu.component';
import { ProfileDataComponent } from './profile/profile-data/profile-data.component';
import { ProfilePasswordComponent } from './profile/profile-password/profile-password.component';
import { ProfileAuthComponent } from './profile/profile-auth/profile-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    EventlistComponent,
    EventdisplayComponent,
    EventbookComponent,
    MyeventsComponent,
    EventsreqComponent,
    PrivacyComponent,
    UdcCompanyComponent,
    RegisterUDCComponent,
    EventcardComponent,
    EventpaymentComponent,
    ProfileMenuComponent,
    ProfileDataComponent,
    ProfilePasswordComponent,
    ProfileAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, BrowserAnimationsModule, // imports firebase/auth, only needed for auth features
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    UserService,
    UserResolver,
    AuthGuard,
    StorageService,
    EventService,
    HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
