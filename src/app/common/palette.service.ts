import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConcept } from '../model/IConcept';
import { Observable, BehaviorSubject } from 'rxjs';
import { IRelationType } from '../model/IRelationType';


@Injectable({
  providedIn: 'root'
})
export class PaletteService {


  constructor(private http: HttpClient) {
  }



  getConcepts(paletteId: string): Observable<IConcept[]> {
    return this.http.get<IConcept[]>('http://localhost:8080/concept_atlas_server/concepts/' + paletteId);
  }

  getRelationTypes(paletteId: string): Observable<IRelationType[]> {
    return this.http.get<IRelationType[]>('http://localhost:8080/concept_atlas_server/relationtypes/' + paletteId);
  }

  addNewConcept(name: string, desc: string, syn: string) {
    return this.http.post('http://localhost:8080/concept_atlas_server/addConcept', { name, desc, syn });
  }

  getPalette(atlasId: string) {
    return this.http.get<string>('http://localhost:8080/concept_atlas_server/palette/' + atlasId);
  }


}
