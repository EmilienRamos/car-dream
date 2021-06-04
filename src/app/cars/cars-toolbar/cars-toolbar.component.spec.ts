import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsToolbarComponent } from './cars-toolbar.component';

describe('CarsToolbarComponent', () => {
  let component: CarsToolbarComponent;
  let fixture: ComponentFixture<CarsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
