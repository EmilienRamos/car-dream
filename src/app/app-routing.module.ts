import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { DetailsComponent } from './cars/details/details.component';
import { IsLoggedInGuard } from './core/guards/is-logged-in.guard';
import { CarResolver } from './core/resolvers/car.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cars',
    pathMatch: 'full'
  },
  {
    path: 'cars',
    component: CarsComponent,
    canActivate: [IsLoggedInGuard],
    children: [
      {
        path: ':id',
        component: DetailsComponent,
        resolve: {
          details: CarResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
