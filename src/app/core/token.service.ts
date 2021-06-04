import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenSubject$ = new BehaviorSubject<string | null>(this.storages.get('token'));

  constructor(
    private storages: StorageService
  ) { }

  get(): Observable<string | null> {
    return this.tokenSubject$.asObservable();
  }

  createToken(): void {
    const token = uuidv4();
    this.storages.set('token', token);
    this.set(token);
  }

  set(token: string): void {
    this.tokenSubject$.next(token);
  }
}
