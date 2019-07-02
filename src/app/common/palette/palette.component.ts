import { Component, OnInit, Input } from '@angular/core';
import { IAtlas } from 'src/app/model/IAtlas';
import { IConcept } from 'src/app/model/IConcept';
import { PaletteService } from '../palette.service';
import { IRelationType } from 'src/app/model/IRelationType';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent implements OnInit {

  selectedConcept: IConcept;
  concepts: IConcept[];
  @Input() atlasid: string;
  @Input() mapworkid: string;
  paletteId: string;
  relationTypes: IRelationType[];
  currentConcept: IConcept;
  currentRelType: IRelationType;

  constructor(private paletteService: PaletteService) {
  }

  setCurrentConcept(concept) {
    this.paletteService.setCurrentConcept(concept);
  }

  setCurrentRelationType(relationType) {
    this.paletteService.setCurrentRelationType(relationType);
  }

  ngOnInit() {
    /* this.paletteService.getPalette(this.atlasid).subscribe(
       p => {
         this.paletteId = p
       }
     )
  
    this.paletteService.getConcepts(this.atlasid).subscribe(
      c => {
        this.concepts = c;
      });

    this.paletteService.getRelationTypes(this.atlasid).subscribe(
      r => {
        this.relationTypes = r;
      });

    this.paletteService.currentConcept.subscribe(data => this.currentConcept = data);
    this.paletteService.currentRelType.subscribe(data => this.currentRelType = data);*/
  }
  ngOnChanges(){
   
    this.paletteService.getConcepts(this.atlasid).subscribe(
      c => {
        this.concepts = c;
        console.log(this.concepts);
      });

    this.paletteService.getRelationTypes(this.atlasid).subscribe(
      r => {
        this.relationTypes = r;
      });

    this.paletteService.currentConcept.subscribe(data => this.currentConcept = data);
    this.paletteService.currentRelType.subscribe(data => this.currentRelType = data);
  }
}
