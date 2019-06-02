import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService){
    //service auth e service atlas
  }
  canActivate() {
    //se l'utente è loggato e ha i permessi per accedere
    return this.authService.isLogged();
  }
}
