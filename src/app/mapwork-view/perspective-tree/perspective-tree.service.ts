import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {IPerspective} from '../../model/IPerspective';
import {Observable} from 'rxjs';
import {IMapwork} from '../../model/IMapwork';

@Injectable({
  providedIn: 'root'
})
export class PerspectiveTreeService {

  constructor(private http: HttpClient) { }

  getPerspectiveTree(mapworkid: string): Observable<IPerspective[]> {
    return this.http.get<IPerspective[]>('http://localhost:8080/concept_atlas_server/perspectivetree/' + mapworkid );
  }

}
