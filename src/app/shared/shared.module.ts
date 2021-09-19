import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SnackBarComponent } from './material/snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SnackBarComponent],
  exports: [MatTabsModule, MatButtonModule, MatInputModule, MatSidenavModule, MatIconModule],
  imports: [CommonModule],
})
export class SharedModule {}
