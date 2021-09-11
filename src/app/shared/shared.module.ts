import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';

@NgModule({
  declarations: [ToggleButtonComponent],
  exports: [MatTabsModule, MatButtonModule, MatInputModule, ToggleButtonComponent],
})
export class SharedModule {}
