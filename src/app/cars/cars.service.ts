import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Car } from '../core/models/Car';
import { StorageService } from '../core/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private readonly carAddedSubject$ = new Subject<Car>();
  private readonly carUpdatedSubject$ = new Subject<Car>();
  private readonly carDeletedSubject$ = new Subject<Car>();
  private readonly createdCars$ = new BehaviorSubject<number>(Number(this.storages.get('numbercarCreated')) || 0);

  get carAdded(): Observable<Car> {
    return this.carAddedSubject$.asObservable();
  }

  get carUpdated(): Observable<Car> {
    return this.carUpdatedSubject$.asObservable();
  }

  get carDeleted(): Observable<any> {
    return this.carDeletedSubject$.asObservable();
  }

  get createdCars(): Observable<number> {
    return this.createdCars$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private storages: StorageService
  ) { }

  cars(searchInput?: string): Observable<Car[]> {

    let params = new HttpParams();

    if (searchInput) {
      params = params.set('name_like', searchInput);
    }

    return this.http.get<Car[]>(`${environment.api}/cars`, { params });
  }

  car(id: string): Observable<Car> {
    return this.http.get<Car>(`${environment.api}/cars/${id}`);
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${environment.api}/cars`, { ...car }).pipe(
      tap((carAdded) => {
        this.carAddedSubject$.next(carAdded);
        const number = this.createdCars$.getValue() + 1;
        this.createdCars$.next(number);
        this.storages.set('numbercarCreated', number.toString());
      })
    );
  }

  updateCar(car: Car): Observable<Car> {
    return this.http.patch<Car>(`${environment.api}/cars/${car.id}`, { ...car }).pipe(
      tap((carUpdated) => this.carUpdatedSubject$.next(carUpdated))
    );
  }

  deleteCar(id: string): Observable<any> {
    return this.http.delete(`${environment.api}/cars/${id}`).pipe(
      tap(() => {
        this.carDeletedSubject$.next();
        const createdCars = this.createdCars$.getValue();
        const number = createdCars > 0 ? (createdCars - 1) : 0;

        this.createdCars$.next(number);
        this.storages.set('numbercarCreated', number.toString());
      })
    );
  }
}
