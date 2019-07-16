import { Component, OnInit, Input, Inject } from '@angular/core';
import { IConcept } from 'src/app/model/IConcept';
import { PaletteService } from '../palette.service';
import { IRelationType } from 'src/app/model/IRelationType';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  conceptName: string;
  conceptDesc: string;
  conceptSyn: string;
}

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent implements OnInit {
  
  @Input() atlasid: string;
  paletteId: string;
  concepts: IConcept[];
  relationTypes: IRelationType[];
  currentConcept: IConcept;
  currentRelType: IRelationType;
  public search:any = '';
  conceptNew: IConcept;

  constructor(private paletteService: PaletteService, public dialog: MatDialog) {
  }

  newConcept(): void {
    const dialogRef = this.dialog.open(NewConceptDialog, {
      height: '600px',
      width: '330px', 
      data: {conceptName: '', conceptDesc: '', conceptSyn: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.conceptNew.name = result.name;
      this.conceptNew.description = result.conceptDesc;
      this.conceptNew.synonyms = result.conceptSyn;
      this.paletteService.addNewConcept(this.conceptNew.name,this.conceptNew.description,this.conceptNew.synonyms);
      this.conceptNew = null;
    });
  }

  editConcept(): void {
    const dialogRef = this.dialog.open(EditConceptDialog, {
      height: '500px',
      width: '330px',
      data: {conceptName: this.currentConcept.name, conceptDesc: this.currentConcept.description, conceptSyn: this.currentConcept.synonyms}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.currentConcept.description = result.conceptDesc;
      this.currentConcept.synonyms = result.conceptSyn;
    });
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

@Component({
  selector: 'edit-concept-dialog',
  templateUrl: 'edit-concept-dialog.html'
})
export class EditConceptDialog {

  constructor(
    public dialogRef: MatDialogRef<EditConceptDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'new-concept-dialog',
  templateUrl: 'new-concept-dialog.html'
})
export class NewConceptDialog {

  constructor(
    public dialogRef: MatDialogRef<NewConceptDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
