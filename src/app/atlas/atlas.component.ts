import {Injectable} from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { IUser } from '../model/IUser';
import { Router, ActivatedRoute } from '@angular/router';
import { AtlasService } from '../common/atlas.service';
import { AuthService } from '../common/auth.service';

@Component({
  selector: 'app-atlas',
  templateUrl: './atlas.component.html',
  styleUrls: ['./atlas.component.css']
})

export class AtlasComponent {
  user: IUser;

  constructor(private authService: AuthService,private route: ActivatedRoute, private router: Router) { 
    this.user=authService.getUser();
  }
 
 
  /*
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
  }

  canDeactivate() {
    return confirm("Controllo che l'user abbia i permessi necessari per accedere all'atlante.");
  }*/

}
