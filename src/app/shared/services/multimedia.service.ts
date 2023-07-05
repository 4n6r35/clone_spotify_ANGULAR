import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();
  public _trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public _audio!: HTMLAudioElement;
  public _timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public _timeRemainig$: BehaviorSubject<string> = new BehaviorSubject('- 00:00')
  public _playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public _playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() {
    this._audio = new Audio()
    this._trackInfo$.subscribe(responseOK => {
      if (responseOK) {
        this.setAudio(responseOK)
      }
    })
    this.ListenAllEvents()
  }

  private ListenAllEvents(): void {
    this._audio.addEventListener("timeupdate", this.calculateTime, false)
    this._audio.addEventListener("playing", this.setPlayerStatus, false)
    this._audio.addEventListener("play", this.setPlayerStatus, false)
    this._audio.addEventListener("pause", this.setPlayerStatus, false)
    this._audio.addEventListener("ended", this.setPlayerStatus, false)
  }

  private setPlayerStatus = (_state: any) => {
    console.log('😬😬😬', _state)
    switch (_state.type) {
      case 'play':
        this._playerStatus$.next("play")
        break;

      case 'playing':
        this._playerStatus$.next("playing")
        break;

      case 'ended':
        this._playerStatus$.next("ended")
        break;

      default:
        this._playerStatus$.next("paused")
        break;
    }

  }

  private calculateTime = () => {
    console.log('--> Disparando este evento');
    const { duration, currentTime } = this._audio
    // console.table([duration, currentTime])
    this.setTimeElapsed(currentTime)
    this.setTimeRemainig(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }

  private setPercentage(currentTime: number, duration: number): void {
    //TODO duration  ----> 100%
    //TODO currentTime  ----> (x)
    //TODO (currentTime * 100)/duration
    let _percentage = (currentTime * 100) / duration;
    this._playerPercentage$.next(_percentage)

  }

  private setTimeElapsed(_currentTime: number): void {
    let seconds = Math.floor(_currentTime % 60)
    let minutes = Math.floor((_currentTime / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes} : ${displaySeconds}`
    this._timeElapsed$.next(displayFormat)
  }

  private setTimeRemainig(_currentTime: number, _duration: number): void {
    let timeLeft = _duration - _currentTime;
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60)
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `- ${displayMinutes} : ${displaySeconds}`
    this._timeRemainig$.next(displayFormat)
  }

  public setAudio(_track: TrackModel): void {
    console.log('⚡⚡⚡⚡⚡', _track);
    this._audio.src = _track.url;
    this._audio.play()
  }

  public tooglePlayer(): void {
    (this._audio.paused) ? this._audio.play() : this._audio.pause()
  }

  public seekAudio(percentage: number): void {
    const { duration } = this._audio
    const _percentageToSecond = (percentage * duration) / 100
    this._audio.currentTime = _percentageToSecond
  }

}
