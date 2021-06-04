import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragScrollModule } from 'ngx-drag-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsFiltersComponent } from './cars/cars-filters/cars-filters.component';
import { CarsToolbarComponent } from './cars/cars-toolbar/cars-toolbar.component';
import { CarsComponent } from './cars/cars.component';
import { DetailsComponent } from './cars/details/details.component';
import { AddCarDialogComponent } from './cars/dialog/add-car-dialog/add-car-dialog.component';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    DetailsComponent,
    CarsToolbarComponent,
    CarsFiltersComponent,
    AddCarDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    DragScrollModule
  ],
  exports: [DragScrollModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
