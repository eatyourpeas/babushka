import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Platform } from '@ionic/angular';
import { ProfilePage } from './pages/user-management/profile/profile.page';
import { ThrowStmt } from '@angular/compiler';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public isSignedIn: boolean;
  public userNow;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private userService: UserService
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.userService.signedInStatus().subscribe(user => {
        if (user) {
          this.userNow = user;
          this.isSignedIn = true;
        } else {
          this.isSignedIn = false;
        }
      });
    });
  }

  signOut() {
    this.userService.signOut();
  }
}
