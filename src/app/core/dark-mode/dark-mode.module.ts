import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { DarkModeComponent } from './dark-mode.component';


@NgModule({
  declarations: [DarkModeComponent],
  imports: [CommonModule, MaterialModule],
  exports: [DarkModeComponent],
})
export class DarkModeModule { }
