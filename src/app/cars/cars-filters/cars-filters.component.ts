import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'eap-cars-filters',
  templateUrl: './cars-filters.component.html',
  styleUrls: ['./cars-filters.component.scss']
})
export class CarsFiltersComponent implements OnInit {

  form: FormGroup;

  colorsList = [
    'white',
    'red',
    'gris',
    'orange'
  ];

  get colors(): FormArray {
    return this.form.get('colors') as FormArray;
  }

  get state(): FormArray {
    return this.form.get('state') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(): void {
    this.form = this.fb.group({
      priceFrom: [],
      priceTo: [],
      colors: this.fb.array([]),
      state: this.fb.array([]),
      kilometerFrom: [],
      kilometerTo: [],
    });
  }

  search(): void {
    this.router.navigate(['.'], {
      queryParams: this.form.value,
      queryParamsHandling: 'merge'
    });
  }

  toggleColor(color: string): void {
    const findedColorIndex = this.colors.controls.findIndex(({ value }) => value === color);

    if (findedColorIndex !== -1) {
      this.colors.removeAt(findedColorIndex);
    } else {
      this.colors.push(new FormControl(color));
    }
  }

  toggleState(state: string): void {
    const findedStateIndex = this.state.controls.findIndex(({ value }) => value === state);

    if (findedStateIndex !== -1) {
      this.state.removeAt(findedStateIndex);
    } else {
      this.state.push(new FormControl(state));
    }
  }

}
