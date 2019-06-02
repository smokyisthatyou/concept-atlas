import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IUser} from '../model/IUser';


@Injectable({
  providedIn: 'root'
})
export class HttpConnectionService {

    user: IUser;

  constructor(private http: HttpClient) { }

  getUser(): IUser {
      return this.user;
  }

  sendToRestApiMethod(token: string): void {
    this.http.post('http://localhost:8080/concept_atlas_server/login',
        {
          token
        }
    ).subscribe(
        onSuccess => {
            console.log('login was successful, ' + token);
          // login was successful
          // tslint:disable-next-line:max-line-length
          // save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
        }, onFail => {
            // login was unsuccessful
            // show an error message
            return throwError('login was unsuccessful');
        }
    );
  }
}
