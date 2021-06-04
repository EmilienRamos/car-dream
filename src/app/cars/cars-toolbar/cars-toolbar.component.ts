import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddCarDialogComponent } from '../dialog/add-car-dialog/add-car-dialog.component';

@Component({
  selector: 'eap-cars-toolbar',
  templateUrl: './cars-toolbar.component.html',
  styleUrls: ['./cars-toolbar.component.scss']
})
export class CarsToolbarComponent {

  searchInputControl = new FormControl('');

  constructor(private dialog: MatDialog) { }

  addCar(): void {
    this.dialog.open(AddCarDialogComponent, {
      data: null,
      height: '630px',
      width: '550px'
    });
  }

}
