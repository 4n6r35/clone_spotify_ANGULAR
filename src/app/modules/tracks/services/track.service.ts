import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/env';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly _url = environment.api;

  constructor(private _http: HttpClient) {
  }

  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTemp = listTracks.filter(a => a._id !== id)
      resolve(listTemp)
    })
  }

  /**
   * 
   * @returns Devolver todas las canciones
   */
  getAllTracks$(): Observable<any> {
    return this._http.get(`${this._url}/tracks`)
      .pipe(
        map(({ data }: any) => {
          return data
        })
      )
  }

  /**
   * 
   * @returns Devolver canciones random
   */
  getAllRandom$(): Observable<any> {
    return this._http.get(`${this._url}/tracks`)
      .pipe(
        mergeMap(({ data }: any) => this.skipById(data, 1)),
        catchError((err) => {
          const { status, statusText } = err;
          return of([])
        })
      )
  }

}
