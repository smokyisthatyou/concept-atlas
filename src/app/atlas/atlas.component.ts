import {Injectable} from '@angular/core';
import { Component, HostListener } from '@angular/core';
import { IUser } from '../model/IUser';
import { Router, ActivatedRoute } from '@angular/router';
import { AtlasService } from '../common/atlas.service';
import {HttpConnectionService} from '../common/http-connection.service';


@Component({
  selector: 'app-atlas',
  templateUrl: './atlas.component.html',
  styleUrls: ['./atlas.component.css']
})

export class AtlasComponent {
  user: IUser;

  constructor(private httpConn: HttpConnectionService, private route: ActivatedRoute, private router: Router) {
    this.user = httpConn.getUser();
  }


  /*
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    event.returnValue = false;
  }

  canDeactivate() {
    return confirm("Controllo che l'user abbia i permessi necessari per accedere all'atlante.");
  }*/

}
