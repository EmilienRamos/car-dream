import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models/Car';
import { CarsService } from '../cars.service';

@Component({
  selector: 'eap-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  @Input() car: Car;

  constructor(
    private carService: CarsService
  ) { }

  deleteCar(id: string): void {
    this.carService.deleteCar(id).subscribe();
  }

  ngOnInit(): void {
  }

}
