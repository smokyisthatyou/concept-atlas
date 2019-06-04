import { Component } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { HttpConnectionService } from './common/http-connection.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ConceptAtlas';
  isLogged: boolean;
  constructor(private socialAuthService: AuthService, private httpConn: HttpConnectionService) {
    const currentUser = this.httpConn.currentUserValue;
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
        this.httpConn.sendToRestApiMethod(userData.idToken);
      });
  }

  logOut() {
    // tslint:disable-next-line:only-arrow-functions
    this.socialAuthService.signOut().then(function () {
      window.location.assign('http://localhost:4200');
    });
    this.httpConn.resetUser();
  }

}


