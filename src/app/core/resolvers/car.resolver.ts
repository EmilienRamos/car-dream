import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve
} from '@angular/router';
import { Observable } from 'rxjs';
import { CarsService } from 'src/app/cars/cars.service';
import { Car } from '../models/Car';

@Injectable({
  providedIn: 'root'
})
export class CarResolver implements Resolve<Car> {

  constructor(private carService: CarsService) {}

  resolve({ paramMap }: ActivatedRouteSnapshot): Observable<Car> {
    return this.carService.car(paramMap.get('id'));
  }
}
