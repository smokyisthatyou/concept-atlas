import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AtlasService } from '../common/atlas.service';
import { Injectable } from '@angular/core';
import { IMapwork } from '../model/IMapwork';
import { IAtlas } from '../model/IAtlas';

@Component({
  selector: 'app-mapwork-view',
  templateUrl: './mapwork-view.component.html',
  styleUrls: ['./mapwork-view.component.css']
})
export class MapworkViewComponent implements OnInit {
  mapworkid: string;
  currentMapwork: IMapwork;
  currentAtlas: IAtlas;

  constructor(private atlasService: AtlasService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.mapworkid = params.idmapwork);
    // this.currentMapwork = atlasService.getMapwork(this.mapworkid);
    // this.currentAtlas = atlasService.getAtlas(this.currentMapwork.atlas);
  }

  ngOnInit() {
  }

}
