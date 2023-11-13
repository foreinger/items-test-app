import {Component, OnInit} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ]
})
export class ConfirmDialogComponent {
  constructor(
    public dialog: MatDialogRef<ConfirmDialogComponent>,
  ) {
  }


}
