import { Component } from '@angular/core';
import { DarkModeService } from './dark-mode.service';

@Component({
  selector: 'eap-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss']
})
export class DarkModeComponent {

  get isActivated(): boolean {
    return this.darkMode.isActivated;
  }

  constructor(private darkMode: DarkModeService) {}

  toggle(): void {
    this.darkMode.toggle();
  }

}
