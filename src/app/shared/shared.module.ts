import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { SnackBarComponent } from './material/snack-bar/snack-bar.component';

@NgModule({
  declarations: [ToggleButtonComponent, SnackBarComponent],
  exports: [MatTabsModule, MatButtonModule, MatInputModule, ToggleButtonComponent],
})
export class SharedModule {}
