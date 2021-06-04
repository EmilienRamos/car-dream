import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, pluck } from 'rxjs/operators';
import { Car } from 'src/app/core/models/Car';
import { CarsService } from '../cars.service';
import { AddCarDialogComponent } from '../dialog/add-car-dialog/add-car-dialog.component';

@Component({
  selector: 'eap-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  car: Car;

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private carService: CarsService,
    private router: Router
  ) {
    this.route.data.pipe(pluck('details')).subscribe((car) => {
      this.car = car;
    });
  }

  updateCar(): void {
    this.dialog.open(AddCarDialogComponent, {
      data: this.car,
      height: '630px',
      width: '550px',
    }).afterClosed().pipe(
      filter(res => !!res)
    ).subscribe(carUpdated => this.car = carUpdated);
  }

  deleteCar(): void {
    this.carService.deleteCar(this.car.id).subscribe(() => {
      this.router.navigate(['/cars']);
    });
  }
}
