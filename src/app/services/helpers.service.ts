import { ThemePalette } from '@angular/material/core';
import { SnackBarComponent } from '../shared/material/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HelpersService {
  constructor(private snackBar: MatSnackBar) {}

  public showSnackBar(
    message: string,
    action?: string | null,
    style: ThemePalette = 'primary',
  ): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: {
        message,
        action,
        class: style,
      },
    });
  }
}
