import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { defer, iif, Observable } from 'rxjs';
import { distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { CommonService } from 'src/app/core/common.service';
import { Brand } from 'src/app/core/models/Brand';
import { Car } from 'src/app/core/models/Car';
import { v4 as uuidv4 } from 'uuid';
import { CarsService } from '../../cars.service';

@Component({
  selector: 'eap-add-car-dialog',
  templateUrl: './add-car-dialog.component.html',
  styleUrls: ['./add-car-dialog.component.scss']
})
export class AddCarDialogComponent {

  brands$ = this.commons.brands();
  colors$ = this.commons.colors();

  models$: Observable<string[]>;

  form: FormGroup;

  compare(brand: Brand): string {
    return brand.label;
  }

  constructor(
    private fb: FormBuilder,
    private commons: CommonService,
    private carService: CarsService,
    private dialogRef: MatDialogRef<AddCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public car: Car | null
  ) {
    this.initForm();
    this.models$ = this.form.get('brand').valueChanges.pipe(
      distinctUntilChanged(),
      startWith(this.form.get('brand').value),
      switchMap(value => this.commons.getModelsByBrand(value))
    );
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.car?.name, Validators.required],
      brand: [this.car?.brand, Validators.required],
      immat: [this.car?.immat, Validators.required],
      buy_date: [this.car?.buy_date, Validators.required],
      color: [this.car?.color, Validators.required],
      state: [this.car?.state, Validators.required],
      price: [this.car?.price, Validators.required],
      miles: [this.car?.miles, Validators.required],
    });
  }

  submit(): void {
    const { name, brand, immat, buy_date, state, color, price, miles } = this.form.value;

    let carToCreate: Car = {
      ...this.car,
      name,
      brand,
      immat,
      buy_date,
      state,
      color,
      price,
      miles,
    };

    if (!this.car?.id) {
      carToCreate.id = uuidv4();
    }

    iif(() => !!this.car?.id,
      defer(() => this.carService.updateCar(carToCreate)),
      defer(() => this.carService.addCar(carToCreate))
    ).subscribe(carCreated => this.dialogRef.close(carCreated));
  }

}
