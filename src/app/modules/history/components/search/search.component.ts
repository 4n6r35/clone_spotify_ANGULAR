import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() callbackData: EventEmitter<any> = new EventEmitter()
  src: string = ''
  constructor() { }

  ngOnInit(): void {

  }

  callSearch(term_bsq: string): void {
    if (term_bsq.length >= 4) {
      this.callbackData.emit(term_bsq)
      console.log('Llamamos a la API HTTP GET 👉', term_bsq)
    }
  }
}
