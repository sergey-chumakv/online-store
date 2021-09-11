import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
})
export class ToggleButtonComponent {
  @Output() public toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
}
