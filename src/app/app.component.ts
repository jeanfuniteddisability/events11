import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
import { mdlUser } from 'src/app/Models/mdUser.model';
import { StorageService } from './core/storage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'events';
  public user: mdlUser;
  public isShowing: boolean = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    private store: StorageService
  ) {
    this.user = new mdlUser();
    this.user.firstName = "firstname";
    this.user.lastName = "lastname";
    this.user = this.store.GetUser();

    console.log(this.isShowing);
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.log("Logout error", error);
      this.router.navigate(['/login']);
    });
  }

  profile() {
    this.router.navigate(['/profile']);
  }

}
