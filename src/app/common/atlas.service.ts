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
  errorHandler: (err: HttpErrorResponse) => Observable<any>;
  mapWorkList: IMapwork[];

  constructor(private http: HttpClient) {

    this.atlasList = [{
      id: 'a1',
      name: 'Atlante di prova',
      description: 'prova atlas',
      owner: 'giorgia.manna@unito.it'
    },
    {
      id: 'a2',
      name: 'Secondo atlante',
      description: 'hello everybody',
      owner: 'giorgia.manna@unito.it'
    }];
    this.mapWorkList = [{
      id: 'm1',
      name: 'Mapwork di prova',
      atlas: 'a1',
      privacy: 'public'
    },
    {
      id: 'm2',
      name: 'Secondo mapwork di prova',
      atlas: 'a1',
      privacy: 'public'
    },
    {
      id: 'm3',
      name: 'Mapwork Atlante 2',
      atlas: 'a2',
      privacy: 'public'
    }];
    // tslint:disable-next-line:only-arrow-functions
    this.errorHandler = function(err: HttpErrorResponse) {
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

  getAllAtlas(): Observable<IAtlas[]> {
    return this.http.get<IAtlas[]>('http://localhost:8080/concept_atlas_server/atlas').pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.errorHandler)
    );
  }

  getAtlas(id: string): IAtlas {
    // tslint:disable-next-line:triple-equals
    return this.atlasList.find(x => x.id == id);
  }

  getMapwork(id: string): IMapwork {
    // tslint:disable-next-line:triple-equals
    return this.mapWorkList.find(x => x.id == id);
  }

  getMapworks(atlasid: string): IMapwork[] {
    return this.mapWorkList.filter(
        // tslint:disable-next-line:triple-equals
      m => m.atlas == atlasid);
  }



// non ho capito a cosa serva
  getAllAtlasDB(atlasid: string): void {
    this.http.post('http://localhost:8080/concept_atlas_server/index.php', {atlasid}).subscribe(
      onSuccess => {
        // login was successful
        // tslint:disable-next-line:max-line-length
        // save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
      }, onFail => {
        // login was unsuccessful
        // show an error message
      }
    );
  }

}

