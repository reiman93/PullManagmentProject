import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoguinComponent } from './loguin/loguin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import {MaterialModule}from '../../material.module';
import {AuthenticateRoutingModule} from '../authenticate/authenticate-routing.module'



@NgModule({
  declarations: [LoguinComponent],
  imports: [
    AuthenticateRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule
  ]
})
export class AuthenticateModule { }
