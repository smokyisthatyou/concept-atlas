import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConcept } from '../model/IConcept';
import { Observable, BehaviorSubject } from 'rxjs';
import { IRelationType } from '../model/IRelationType';


@Injectable({
  providedIn: 'root'
})
export class PaletteService {
  
  private concept = new BehaviorSubject<IConcept>(null); // TODO: cambiare null
  currentConcept = this.concept.asObservable();

  private relType = new BehaviorSubject<IRelationType>(null); // TODO: cambiare null
  currentRelType = this.relType.asObservable();

  constructor(private http: HttpClient) {
  }

  setCurrentConcept(concept) {
    this.concept.next(concept);
  }

  setCurrentRelationType(relationType: any) {
    this.relType.next(relationType);
  }


  getConcepts(paletteId: string): Observable<IConcept[]> {
    return this.http.get<IConcept[]>('http://localhost:8080/concept_atlas_server/concepts/' + paletteId);
  }

  getRelationTypes(paletteId: string): Observable<IRelationType[]> {
    return this.http.get<IRelationType[]>('http://localhost:8080/concept_atlas_server/relationtypes/' + paletteId);
  }

  getPalette(atlasId: string) {
    return this.http.get<string>('http://localhost:8080/concept_atlas_server/palette/' + atlasId);
  }


}