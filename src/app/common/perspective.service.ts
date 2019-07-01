import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {IPerspective} from '../model/IPerspective';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PerspectiveService {

  private persp = new BehaviorSubject<IPerspective>(null); // TODO: cambiare null
  currentPersp = this.persp.asObservable();

  constructor(private http: HttpClient) { }

  getPerspectiveTree(mapworkid: string): Observable<IPerspective[]> {
    return this.http.get<IPerspective[]>('http://localhost:8080/concept_atlas_server/perspectivetree/' + mapworkid );
  }

  setCurrentPersp(persp) {
   this.persp.next(persp);
  }

  isRoot(perspid: string, mapworkid: string): Observable<boolean> {
    return this.http.get<boolean>('http:/localhost:8080/concept_atlas_server/isroot/' + perspid + '/' + mapworkid );
  }

  haveAChild(idPersp: string, user: string) {
    return this.http.post('http://localhost:8080/concept_atlas_server/child', {idPersp, user});
  }

  freezePersp(idPersp: string, user: string) {
    return this.http.put('http://localhost:8080/concept_atlas_server/freeze', {idPersp, user});
  }

  publishPersp(idPersp: string) {
    return this.http.put('http://localhost:8080/concept_atlas_server/publish', {idPersp});
  }

  createMapworkFromPersp(idPersp: string, user: string) {
    return this.http.post('http://localhost:8080/concept_atlas_server/createMapwork', {idPersp, user});
  }

}
