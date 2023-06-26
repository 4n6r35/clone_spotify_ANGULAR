import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import * as dataRaw from '../../../data/tracks.json'

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  dataTracksRandom$: Observable<TrackModel[]> = of([])
  dataTracksTrending$: Observable<TrackModel[]> = of([])

  constructor() {
    const { data }: any = (dataRaw as any).default;
    this.dataTracksTrending$ = of(data)

    this.dataTracksRandom$ = new Observable((observer) => {
      const trackExample: TrackModel = {
        _id: 9,
        name: 'Que precio tiene el cielo',
        album: 'Sigo siendo yo',
        url: 'http://',
        cover: 'https://img.youtube.com/vi/BzUWrRcAUew/0.jpg'
      }
      // observer.next([trackExample])
      setTimeout(() => {
        observer.next([trackExample])
      }, 3500)
    })
  }
}
