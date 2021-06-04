import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeBackground'
})
export class SanitizeBackgroundPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${url}')`);
  }

}
