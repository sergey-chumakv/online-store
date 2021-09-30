import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';

interface IDialogData {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IDialogData,
    private dialog: MatDialog,
  ) {}

  public close(): void {
    this.dialog.closeAll();
  }
}
