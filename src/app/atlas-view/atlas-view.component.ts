import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAtlas } from '../model/IAtlas';
import { IMapwork } from '../model/IMapwork';
import { AtlasService } from '../common/atlas.service';
import { Injectable } from '@angular/core';
import { IUser } from '../model/IUser';
import { AuthenticationService } from '../common/authentication.service';


@Component({
  selector: 'app-atlas-view',
  templateUrl: './atlas-view.component.html',
  styleUrls: ['./atlas-view.component.css']
})

export class AtlasViewComponent implements OnInit {
  atlasid: string;
  mapworkList: IMapwork[];
  currentAtlas: IAtlas;

    ngOnInit() {

    }

    // tslint:disable-next-line:max-line-length
  constructor(private authenticationService: AuthenticationService, private atlasService: AtlasService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.atlasid = params.idatlas);
   // this.currentAtlas = atlasService.getAtlas(this.atlasid);
  }


  userIsAdmin() {
    // non riesco a leggere user.role == 'admin' da authenticationService
    return true;
  }
}
