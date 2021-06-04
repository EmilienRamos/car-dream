import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  brands(): Observable<{ label: string; models: string[] }[]> {
    return of([
      { label: 'Toyota', models: ['Supra', 'Rav4', 'Prius'] },
      { label: 'Cupra', models: ['Ibiza', 'Leon', 'Ateca'] },
      { label: 'Lamborghini', models: ['Aventador', 'Huracan', 'Centenario'] },
      { label: 'Aston Martin', models: ['Vantage', 'One77', 'Vanquish'] },
      { label: 'Nissan', models: ['GT-R', 'Juke', 'Micra'] },
      {
        label: 'Renaut',
        models: ['Mégane RS Trophy', 'Clio RS Trophy', 'Alpine'],
      },
    ]);
  }

  colors(): Observable<{ label: string }[]> {
    return of([
      { label: 'orange' },
      { label: 'rouge' },
      { label: 'bleu' },
      { label: 'blanche' },
      { label: 'jaune racing' },
      { label: 'gris' },
    ]);
  }

  getModelsByBrand(brandLabel: string): Observable<string[]> {
    return this.brands().pipe(
      switchMap((brands) => {
        const currBrand = brands.filter(({ label }) => label === brandLabel)[0];
        return of(currBrand?.models);
      })
    );
  }

  getWeather(city: string, countryCode: string): Observable<any> {
    return this.http.get(
      `${environment.weatherApi}?q=${city},${countryCode}&APPID=2b3823b3e998cd8b73ee256620604902&lang=fr&units=metric`
    );
  }
}
