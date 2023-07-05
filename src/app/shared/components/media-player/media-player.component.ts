import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') _progressBar: ElementRef = new ElementRef('')
  listObservers$: Array<Subscription> = []
  state: string = 'paused'
  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer$ = this.multimediaService._playerStatus$
      .subscribe(status => this.state = status)
    this.listObservers$ = [observer$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
    console.log('🔴🔴🔴🔴 BOOM!')
  }

  handlePosition(event: MouseEvent): void {
    const _elemtNative: HTMLElement = this._progressBar.nativeElement
    const { clientX } = event
    const { x, width } = _elemtNative.getBoundingClientRect()
    const _clickX = clientX - x
    const _percentageFromX = (_clickX * 100) / width
    console.log(`Click(x): ${_percentageFromX}`)
    this.multimediaService.seekAudio(_percentageFromX)
  }

}
