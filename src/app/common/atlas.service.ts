import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable, throwError, from, BehaviorSubject } from 'rxjs';
import { catchError, tap, concatMap, scan } from 'rxjs/operators';
import { IAtlas } from '../model/IAtlas';
import { IMapwork } from '../model/IMapwork';


@Injectable({
  providedIn: 'root'
})
export class AtlasService {
  atlasList: IAtlas[];
  mapWorkList: IMapwork[];
  private currentAtlasIDSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;

  constructor(private http: HttpClient) {
    this.currentAtlasIDSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentAtlasId')));
    this.currentUser = this.currentAtlasIDSubject.asObservable();
   }

  getAllAtlas(): Observable<IAtlas[]> {
    return this.http.get<IAtlas[]>('http://localhost:8080/concept_atlas_server/atlas');

  }

  setCurrentAtlasId(id: string){
    localStorage.setItem('currentAtlasId', JSON.stringify(id));
    this.currentAtlasIDSubject.next(id);
  }

  getCurrentAtlasId(): string{
    return this.currentAtlasIDSubject.value;
  }

  getAtlas(id: string): IAtlas {
    return this.atlasList.find(x => x.id == id);
  }

  getMapwork(id: string): IMapwork {
    return this.mapWorkList.find(x => x.id == id);
  }

  getMapworks(atlasid: string): Observable<IMapwork[]> {
    // @ts-ignore
    return this.http.get<IMapwork[]>('http://localhost:8080/concept_atlas_server/mapworks/' + atlasid  );
  }

}

