import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SnackBarComponent } from './material/snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SnackBarComponent],
  exports: [MatTabsModule, MatButtonModule, MatInputModule],
  imports: [CommonModule],
})
export class SharedModule {}
