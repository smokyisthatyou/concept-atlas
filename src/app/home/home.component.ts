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



  ngOnInit() {
  }

}
