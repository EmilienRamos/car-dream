import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DarkModeModule } from '../core/dark-mode/dark-mode.module';
import { SanitizeBackgroundPipe } from '../core/pipes/sanitize-background.pipe';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [SanitizeBackgroundPipe],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DarkModeModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    DarkModeModule,
    FormsModule,
    ReactiveFormsModule,
    SanitizeBackgroundPipe,
  ],
})
export class SharedModule {}
