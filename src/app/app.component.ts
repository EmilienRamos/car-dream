import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { StorageService } from './core/storage.service';
import { TokenService } from './core/token.service';

@Component({
  selector: 'eap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  userId$ = of<string | null>(null);

  constructor(
    private storages: StorageService,
    private tokens: TokenService,
    private sanitizer: DomSanitizer,
    private registry: MatIconRegistry,
  ) {
    if (!this.storages.get('token')) {
      this.tokens.createToken();
    }
    this.userId$ = this.tokens.get();
    this.initializeIcons();
  }

  initializeIcons(): void {
    this.registry.addSvgIcon('sun', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sun.svg'));
    this.registry.addSvgIcon('moon', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/moon.svg'));
    this.registry.addSvgIcon('wheel', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/volant.svg'));
  }

}
