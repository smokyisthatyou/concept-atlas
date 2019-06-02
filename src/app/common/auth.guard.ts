import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor() {
    // service auth e service atlas
  }
  canActivate() {
    // se l'utente è loggato e ha i permessi per accedere
    return true; // altrimenti si lamenta
  }
}
