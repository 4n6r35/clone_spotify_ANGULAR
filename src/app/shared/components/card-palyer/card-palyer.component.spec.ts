import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPalyerComponent } from './card-palyer.component';

describe('CardPalyerComponent', () => {
  let component: CardPalyerComponent;
  let fixture: ComponentFixture<CardPalyerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPalyerComponent]
    });
    fixture = TestBed.createComponent(CardPalyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
