import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, tap, concatMap, scan } from 'rxjs/operators';
import { IAtlas } from '../model/IAtlas';
import { IMapwork } from '../model/IMapwork';
import { IUser } from '../model/IUser';

@Injectable({
  providedIn: 'root'
})
export class AtlasService {
  atlasList: IAtlas[];
  mapWorkList: IMapwork[];

  constructor(private http: HttpClient) { }

  getAllAtlas(): Observable<IAtlas[]> {
    return this.http.get<IAtlas[]>('http://localhost:8080/concept_atlas_server/atlas');

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

