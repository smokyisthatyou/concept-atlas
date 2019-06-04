import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { IUser } from '../model/IUser';
import { setUpControl } from '@angular/forms/src/directives/shared';


@Injectable({
  providedIn: 'root'
})
export class HttpConnectionService {
  public currentUser: Observable<IUser>;
  private currentUserSubject: BehaviorSubject<IUser>;

  user: IUser;
  token: string;

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  resetUser() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  getUser(): IUser {
    return this.user;
  }

  sendToRestApiMethod(token: string) {
    return this.http.post('http://localhost:8080/concept_atlas_server/login',
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
          //console.log(this.user);
          //this.logged = true;
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.currentUserSubject.next(this.user);
          window.location.assign('http://localhost:4200/atlas');
        }
      }
    );
  }

}
