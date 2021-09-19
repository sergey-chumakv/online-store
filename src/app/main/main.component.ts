import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private auth: AuthService) {}

  public logout(): void {
    this.auth.logout();
  }
}
