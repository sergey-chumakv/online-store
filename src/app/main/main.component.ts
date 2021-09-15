import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  public ngOnInit(): void {}

  public logout(): void {
    this.auth.logout();
  }
}
