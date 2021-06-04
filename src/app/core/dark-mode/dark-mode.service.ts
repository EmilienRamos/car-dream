import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private darkModeActivated = new BehaviorSubject<boolean>(
    this.getStoredDarkMode()
  );

  get isActivated(): boolean {
    return this.darkModeActivated.value;
  }

  constructor(
    private storage: StorageService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.darkModeActivated
      .pipe(distinctUntilChanged())
      .subscribe((darkModeActivated) => {
        if (darkModeActivated) {
          this.document.body.classList.add('dark');
        } else {
          this.document.body.classList.remove('dark');
        }
        this.setStoredDarkMode(darkModeActivated);
      });
  }

  activate(): void {
    this.darkModeActivated.next(true);
  }

  deactivate(): void {
    this.darkModeActivated.next(false);
  }

  toggle(): void {
    this.isActivated ? this.deactivate() : this.activate();
  }

  private getStoredDarkMode(): boolean {
    return JSON.parse(this.storage.get('darkMode') as string) || false;
  }

  private setStoredDarkMode(darkModeActivatedd: boolean): void {
    this.storage.set('darkMode', JSON.stringify(darkModeActivatedd));
  }
}

