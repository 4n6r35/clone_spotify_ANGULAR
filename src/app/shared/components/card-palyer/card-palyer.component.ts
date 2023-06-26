import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-card-palyer',
  templateUrl: './card-palyer.component.html',
  styleUrls: ['./card-palyer.component.css']
})
export class CardPalyerComponent implements OnInit {
  @Input() mode: 'small' | 'big' = 'small';
  @Input() track: TrackModel = { _id: 0, name: '', album: '', url: '', cover: '' };
  constructor() { }

  ngOnInit(): void {

  }

}
