import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';

interface IClasses {
  'wrapper--space-between': boolean;
  'wrapper--center': boolean;
  [key: string]: boolean;
}

interface IDataSnackBar {
  message: string;
  action?: string;
  class: ThemePalette;
}

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {
  public classes!: IClasses;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: IDataSnackBar,
    public snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
    this.classes = {
      'wrapper--space-between': !!this.data.action,
      'wrapper--center': !this.data.action,
      [`${this.data.class}`]: true,
    };
  }

  public close(): void {
    this.snackBar.dismiss();
  }
}
