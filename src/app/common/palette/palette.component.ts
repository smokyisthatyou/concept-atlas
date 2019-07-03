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
  paletteId: string;
  relationTypes: IRelationType[];
  currentConcept: IConcept;
  currentRelType: IRelationType;
  public search:any = '';

  constructor(private paletteService: PaletteService) {
    
  }

  showConceptConnectedConcepts(currentConcept) {
    if (currentConcept != null)
      return "il concetto non è presente ancora in nessuna prospettiva"
  }

  showConceptConnectedRelationship(currentConcept) {
    if (currentConcept != null)
      return "il concetto non è presente ancora in nessuna prospettiva"
  }

  showRelTypeConnectedConcept(currentRelType) {
    if (currentRelType != null)
      return "il tipo di relazione non è presente ancora in nessuna prospettiva"

  }
  setCurrentConcept(concept) {
    this.currentConcept = concept;
  }

  setCurrentRelationType(relationType) {
    this.currentRelType = relationType;
  }

  ngOnInit() {
    /* this.paletteService.getPalette(this.atlasid).subscribe(
       p => {
         this.paletteId = p
       }
     )
  */
  }
  ngOnChanges() {
    this.currentConcept = null;
    this.currentRelType = null;
    console.log("changes: " + this.atlasid);
    this.paletteService.getConcepts(this.atlasid).subscribe(
      c => {
        this.concepts = c;
        console.log(this.paletteService);
      });
    this.paletteService.getRelationTypes(this.atlasid).subscribe(
      r => {
        this.relationTypes = r;
      });
  }
}
