import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../common/authentication.service';
import { IUser } from '../model/IUser';

@Component({
  selector: 'app-atlas',
  templateUrl: './atlas.component.html',
  styleUrls: ['./atlas.component.css']
})

export class AtlasComponent {
  user: IUser;
  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router) {
    this.user = authenticationService.getUser();
  }
  userIsAdmin() {
    //non riesco a leggere user.role == 'admin' da authenticationService 
    return true;
  }
}
