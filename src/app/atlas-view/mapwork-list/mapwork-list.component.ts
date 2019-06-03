import { Component, OnInit, Input } from '@angular/core';
import { AtlasService } from 'src/app/common/atlas.service';
import { IMapwork } from 'src/app/model/IMapwork';
import { IAtlas } from 'src/app/model/IAtlas';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mapwork-list',
  templateUrl: './mapwork-list.component.html',
  styleUrls: ['./mapwork-list.component.css']
})
export class MapworkListComponent implements OnInit {

  selectedMapwork: IMapwork;
  mapworkList: IMapwork[];
  @Input() atlas: IAtlas;

  constructor(private atlasService: AtlasService,private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    //this.mapworkList = this.atlasService.getMapworks(this.atlas.id);
  }

  openMapwork(mapwork: IMapwork){
    //controllo su atlasService se il mapwork è pubblico
    //se il mapwork è privato controllo se l'utente fa parte del team
    this.router.navigate(['/mapwork-view', mapwork.id]);
  }

  deleteMapwork(mapwork: IMapwork){
    //controllo su atlasService se l'user ha i permessi per eliminare il mapwork
    //chiedo conferma all'utente
    //elimino il mapwork
  }
}
