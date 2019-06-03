import { Component, OnInit } from '@angular/core';
import { IAtlas } from 'src/app/model/IAtlas';
import { Router, ActivatedRoute } from '@angular/router';
import { AtlasService } from 'src/app/common/atlas.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-atlas-list',
  templateUrl: './atlas-list.component.html',
  styleUrls: ['./atlas-list.component.css']
})
export class AtlasListComponent implements OnInit {
  title: string;
  atlasList: IAtlas[];

  constructor(private atlasService: AtlasService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.title = 'Atlanti disponibili:';
    this.atlasService.getAllAtlas().subscribe(
        atlas => {
          this.atlasList = atlas;
        });
  }

  openAtlas(atlas: IAtlas) {
    // controllo su atlasService se l'user ha i permessi per accedere all'atlante
    this.router.navigate(['/atlas-view', atlas.id]);
  }

  deleteAtlas(atlas: IAtlas) {
    // controllo su atlasService se l'user ha i permessi per eliminare l'atlante
    // chiedo conferma all'utente
    // elimino l'atlante

  }
}
