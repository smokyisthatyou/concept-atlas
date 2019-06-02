import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IUser} from '../model/IUser';
import {setUpControl} from '@angular/forms/src/directives/shared';


@Injectable({
  providedIn: 'root'
})
export class HttpConnectionService {

    user: IUser;
    token: string;

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
        res => {
            // tslint:disable-next-line:triple-equals
            if (res['email'] == '') {
                alert('This user in not in the db');
            } else {
                this.user = res as IUser;
                window.location.assign('http://localhost:4200/atlas');
            }
        }
    );
  }

}
