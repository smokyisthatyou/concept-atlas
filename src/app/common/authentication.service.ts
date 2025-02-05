import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { IUser } from '../model/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;
  user: IUser;
  token: string;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  public get currentUserRole(): string {
    return this.currentUserSubject.value.role;
  }
  
  /*
  public get currentUserRole(){
    return (this.user.role == 'admin');
  }
  */

  // doesn't work
  public getUser(): IUser {
    return this.user;
  }

  resetUser() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.user = null;
  }



  sendToRestApiMethod(token: string) {
    return this.http.post('http://localhost:8080/concept_atlas_server/login', { token }
    ).subscribe(
      res => {
        if (res['email'] === '') {
          alert('This user in not in the db');
        } else {
          this.user = res as IUser;
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          this.currentUserSubject.next(this.user);
          // i didn't used route.navigate so the app component is refreshed and the button for logout is displayed correctly
          window.location.assign('http://localhost:4200/atlas');
        }
      }
    );
  }
}
