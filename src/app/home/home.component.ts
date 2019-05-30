import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import {HttpConnectionService} from '../common/http-connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private socialAuthService: AuthService, private httpConn: HttpConnectionService ) {}

  public signinWithGoogle() {
    const socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider)
        .then((userData) => {
          // on success
          // this will return user data from google. What you need is a user token which you will send it to the server
          this.httpConn.sendToRestApiMethod(userData.idToken);
        });
  }


  ngOnInit() {
  }

}
