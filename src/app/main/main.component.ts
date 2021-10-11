import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    public router: Router,
    public http: HttpClient,
    public store: Store,
  ) {}

  public ngOnInit(): void {
    console.log('otstoy');
  }

  public logout(): void {
    this.auth.logout();
  }
}
