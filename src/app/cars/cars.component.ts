import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { CommonService } from '../core/common.service';
import { Car } from '../core/models/Car';
import { CarsToolbarComponent } from './cars-toolbar/cars-toolbar.component';
import { CarsService } from './cars.service';

@Component({
  selector: 'eap-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements AfterViewInit {

  cars$: Observable<Car[]>;
  createdCars$: Observable<number>;
  weather$ = this.commons.getWeather('Paris', 'fr');

  oldestCar: Car;

  @ViewChild(CarsToolbarComponent) carToolbarComponent: CarsToolbarComponent;

  constructor(
    private carService: CarsService,
    private commons: CommonService,
  ) {
    this.createdCars$ = this.carService.createdCars;
  }

  ngAfterViewInit(): void {
    this.cars$ = merge(
      this.carService.carAdded,
      this.carService.carUpdated,
      this.carService.carDeleted,
      this.carToolbarComponent.searchInputControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
    ).pipe(
      startWith(''),
      switchMap((searchInput) => this.carService.cars(searchInput)),
      tap((cars) => (this.oldestCar = this.getOldestCar(cars)))
    );
  }

  deleteCar(id: string): void {
    this.carService.deleteCar(id).subscribe();
  }

  private getOldestCar(cars: Car[]): Car {
    const carsSorted = cars.sort(
      (car1, car2) =>
        new Date(car1.buy_date).getTime() - new Date(car2.buy_date).getTime()
    );
    return carsSorted[0];
  }
}
