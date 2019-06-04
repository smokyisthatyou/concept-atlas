import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    return this.http.get<IAtlas[]>('http://localhost:8080/concept_atlas_server/atlas').pipe(
        tap(data => console.log(JSON.stringify(data))),
    );
  }

  getAtlas(id: string): IAtlas {
    return this.atlasList.find(x => x.id == id);
  }

  getMapwork(id: string): IMapwork {
    return this.mapWorkList.find(x => x.id == id);
  }

  getMapworks(atlasid: string): IMapwork[] {
    return this.mapWorkList.filter(
      m => m.atlas == atlasid);
  }

}

