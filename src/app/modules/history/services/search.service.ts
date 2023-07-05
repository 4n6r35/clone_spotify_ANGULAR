import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/env';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly _url = environment.api

  constructor(private _http: HttpClient) { }

  searchTracks$(term_bsq: string): Observable<any> {
    return this._http.get(`${this._url}/tracks?src=${term_bsq}`)
      .pipe(
        map((dataRaw: any) => dataRaw.data)
      )
  }
}
