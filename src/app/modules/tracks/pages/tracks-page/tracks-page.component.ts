import { Component, OnDestroy, OnInit } from '@angular/core';
import * as dataRaw from '../../../../data/tracks.json'
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { response } from 'express';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksRandom: Array<TrackModel> = []
  tracksTrending: Array<TrackModel> = []

  listObservers$: Array<Subscription> = []

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    const observable1$ = this.trackService.dataTracksTrending$
      .subscribe(response => {
        this.tracksTrending = response
        this.tracksRandom = response
      })

    const observable2$ = this.trackService.dataTracksRandom$
      .subscribe(response => {
        this.tracksRandom = [...this.tracksRandom, ...response]
        console.log('🔴🔴Cancion entrando...')
      })

    this.listObservers$ = [observable1$, observable2$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }
}
