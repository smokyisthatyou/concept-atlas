import {Component, OnInit} from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from './common/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ConceptAtlas';
  isLogged: boolean;
  constructor(private router: Router, private socialAuthService: AuthService, private authenticationService: AuthenticationService) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.isLogged = true;
    }
  }


  public signinWithGoogle() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider)
      .then((userData) => {
        // on success
        // this will return user data from google. What you need is a user token which you will send it to the server
        this.authenticationService.sendToRestApiMethod(userData.idToken);
      });
  }

  logOut() {
    this.socialAuthService.signOut().then(function () {
      window.location.assign('http://localhost:4200');
    });
    this.authenticationService.resetUser();
  }
}


