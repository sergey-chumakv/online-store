import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public toggleDarkTheme = false;

  public ngOnInit(): void {}

  public onToggle(checked: boolean): void {
    this.toggleDarkTheme = checked;
  }
}
