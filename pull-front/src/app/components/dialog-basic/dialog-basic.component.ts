import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

export interface IDialogData {
  title?: string;
  message?: string;
  value?: number;
  icon?: string;
}

@Component({
  selector: 'app-dialog-basic',
  templateUrl: './dialog-basic.component.html',
  styleUrls: ['./dialog-basic.component.scss'],
})
export class DialogBasicComponent implements OnInit {
  title = '';
  value = 1;
  message = '¿Está seguro que desea eliminar el elemento seleccionado?';
  icon = 'bolt_outline';
  acceptAction = 'accept';

  constructor(
    public dialogRef: MatDialogRef<DialogBasicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {}

  ngOnInit(): void {
    this.title = this.data.title ? this.data.title : this.title;
    this.value = this.data.value ? this.data.value : this.value;
    this.message = this.data.message ? this.data.message : this.message;
    this.icon = this.data.icon ? this.data.icon : this.icon;
    if (this.value !== 1) {
      this.message =
        '¿Está seguro que desea eliminar los  elementos seleccionados?';
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

@NgModule({
  declarations: [DialogBasicComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class DialogBasicModule {}
