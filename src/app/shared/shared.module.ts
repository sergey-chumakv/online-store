import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SnackBarComponent } from './material/snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './material/dialog/dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SnackBarComponent, DialogComponent],
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    HttpClientModule,
  ],
  imports: [CommonModule, MatButtonModule, MatSnackBarModule],
  providers: [],
})
export class SharedModule {}
