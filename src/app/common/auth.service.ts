import { Injectable } from '@angular/core';
import { IUser } from '../model/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: IUser;
  constructor() {
    this.user = {
      'email': 'giorgia.manna@unito.it',
      'name': 'Giorgia',
      'surname': 'Manna',
      'role': 'admin'
    };
  }

  getUser(): IUser {
    return this.user;
  }

  isLogged(): boolean {
    return true;
  }
}
