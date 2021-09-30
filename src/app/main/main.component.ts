import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/material/dialog/dialog.component';
import { Router } from '@angular/router';
import { IUserData } from '../services/auth/auth.types';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public user!: IUserData;

  constructor(private auth: AuthService, public dialog: MatDialog, public router: Router) {}

  public ngOnInit(): void {
    const user: IUserData = JSON.parse(localStorage.getItem('user') as string);
    this.user = user;

    if (!this.auth.isVerifiedAccount) {
      this.dialog.open(DialogComponent, {
        data: {
          name: user.displayName,
          color: 'warn',
        },
      });
      this.dialog.afterAllClosed.subscribe(() => {
        this.logout();
        this.router.navigate(['/auth']);
      });
    }
  }

  public logout(): void {
    this.auth.logout();
  }
}
