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
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

export interface ISelectField {
  id?: number;
  name?: string;
}
export interface IFieldForm {
  model?: string;
  label?: string;
  type?: string;
  class?: string;
  data?: ISelectField[];
}

export interface IDialogForm {
  title?: string;
  fields?: IFieldForm[];
}


@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
})
export class DialogFormComponent implements OnInit {
  title = '';
  fields: IFieldForm[] = [];
  acceptAction = 'accept';

  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogForm
  ) { }

  ngOnInit(): void {
    this.title = this.data.title ? this.data.title : this.title;
    this.fields = this.data.fields ? this.data.fields : this.fields;
  }

  close(): void {
    this.dialogRef.close();
  }
}

@NgModule({
  declarations: [DialogFormComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
  ],
})
export class DialogFormModule { }
