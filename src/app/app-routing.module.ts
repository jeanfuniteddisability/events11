import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

import { LoginComponent } from '../app/admin/login.component'
import { RegisterComponent } from './register/register.component';
import { RegisterUDCComponent } from './register-udc/register-udc.component';

import { UserComponent } from '../app/user/user.component'
import { UserResolver } from './user/user.resolver';

import { EventlistComponent } from '../app/eventlist/eventlist.component'
import { EventdisplayComponent } from '../app/eventdisplay/eventdisplay.component'
import { EventpaymentComponent } from '../app/eventpayment/eventpayment.component'
import { EventbookComponent } from '../app/eventbook/eventbook.component'
import { MyeventsComponent} from '../app/myevents/myevents.component'
import { EventsreqComponent} from '../app/eventsreq/eventsreq.component'
import { PrivacyComponent } from '../app/privacy/privacy.component'
import { UdcCompanyComponent } from '../app/udc-company/udc-company.component'
import { ProfileMenuComponent } from '../app/profile/profile-menu/profile-menu.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  // { path: '', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]  },
  { path: 'privacy', component: PrivacyComponent},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'registerUDC', component: RegisterUDCComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'eventlist', component: EventlistComponent, resolve: { data: UserResolver} },
  { path: 'eventdisplay', component: EventdisplayComponent,  resolve: { data: UserResolver}},
  { path: 'eventbook', component: EventbookComponent,  resolve: { data: UserResolver}},
  { path: 'eventpayment', component: EventpaymentComponent,  resolve: { data: UserResolver}},
  { path: 'myevents/:type', component: MyeventsComponent,  resolve: { data: UserResolver}},
  { path: 'eventreq', component: EventsreqComponent,  resolve: { data: UserResolver}},
  { path: 'udc', component: UdcCompanyComponent,  resolve: { data: UserResolver}},
  { path: 'profile', component: ProfileMenuComponent,  resolve: { data: UserResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
