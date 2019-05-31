import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError, from} from 'rxjs';
import {catchError, tap, concatMap, scan} from 'rxjs/operators';
import { IAtlas } from '../model/IAtlas';
import { IMapwork } from '../model/IMapwork';
import { IUser } from '../model/IUser';

@Injectable({
  providedIn: 'root'
})
export class AtlasService {
  
  atlasList: IAtlas[];
  errorHandler: (err: HttpErrorResponse) => Observable<any>;
  mapWorkList: IMapwork[];

  constructor() {
    
    this.atlasList=[{
      'id': 'a1',
      'name': 'Atlante di prova',
      'description': 'prova atlas',
      'owner': 'giorgia.manna@unito.it'
    },
    {
      'id': 'a2',
      'name': 'Secondo atlante',
      'description': 'hello everybody',
      'owner': 'giorgia.manna@unito.it'
    }]
    this.mapWorkList=[{
      'id': 'm1',
      'name': 'Mapwork di prova',
      'atlas': 'a1',
      'privacy': 'public'
    },
    {
      'id': 'm2',
      'name': 'Secondo mapwork di prova',
      'atlas': 'a1',
      'privacy': 'public'
    },
    {
      'id': 'm3',
      'name': 'Mapwork Atlante 2',
      'atlas': 'a2',
      'privacy': 'public'
    }]
    this.errorHandler = function (err: HttpErrorResponse) {
      let errorMessage = '';
      if (err instanceof ErrorEvent) {
        errorMessage = 'C\'è stato un errore: ' + err.error.message;
      } else {
        errorMessage = 'Il server ha restituito il codice di errore ' + err.status +
          ' con messaggio: ' + err.message;
      }
      return throwError(errorMessage);
    };
  }

  getAllAtlas(): IAtlas[] {
    return this.atlasList;
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

