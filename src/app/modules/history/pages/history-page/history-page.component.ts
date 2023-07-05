import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  listResults$: Observable<any> = of([])
  constructor(private _searchService: SearchService) { }

  ngOnInit(): void {

  }

  receiveData(event: string): void {
    // Se toma el termino y se sabe que se ejecuta cuando solo tiene 3 caracteres
    console.log('🎁 Estoy en el padre --> ', event)
    this.listResults$ = this._searchService.searchTracks$(event)
  }

}
