import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { CommonService } from '../core/common.service';
import { Car } from '../core/models/Car';
import { CarsFiltersComponent } from './cars-filters/cars-filters.component';
import { CarsToolbarComponent } from './cars-toolbar/cars-toolbar.component';
import { CarsService } from './cars.service';

@Component({
  selector: 'eap-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements AfterViewInit, OnDestroy {

  cars$: Observable<Car[]>;
  createdCars$: Observable<number>;
  totalCarsFound: number;

  weather$ = this.commons.getWeather('Paris', 'fr');

  oldestCar: Car;

  destroy$ = new Subject<boolean>();

  @ViewChild(CarsToolbarComponent) carToolbarComponent: CarsToolbarComponent;
  @ViewChild(CarsFiltersComponent) carsFiltersComponent: CarsFiltersComponent;

  constructor(
    private carService: CarsService,
    private commons: CommonService,
    private route: ActivatedRoute
  ) {
    this.createdCars$ = this.carService.createdCars;
  }

  ngAfterViewInit(): void {
    this.cars$ = merge(
      this.carService.carAdded,
      this.carService.carUpdated,
      this.carService.carDeleted,
      this.carsFiltersComponent.filterChanged$,
      this.carToolbarComponent.searchInputControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
    ).pipe(
      startWith(''),
      switchMap(() => this.carService.cars(
        this.carToolbarComponent.searchInputControl.value,
        this.carsFiltersComponent.form.value
      )),
      tap((cars) => {
        this.oldestCar = this.getOldestCar(cars);
        this.totalCarsFound = cars.length;
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private getOldestCar(cars: Car[]): Car {
    const carsSorted = cars.sort(
      (car1, car2) =>
        new Date(car1.buy_date).getTime() - new Date(car2.buy_date).getTime()
    );
    return carsSorted[0];
  }
}
