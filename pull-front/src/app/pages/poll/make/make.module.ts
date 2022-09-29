import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakeRoutingModule } from './make-routing.module';
import { MakeComponent } from './make.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    MakeComponent
  ],
  imports: [
    CommonModule,
    MakeRoutingModule,
    MaterialModule
  ]
})
export class MakeModule { }
