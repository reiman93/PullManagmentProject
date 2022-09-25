import {NgModule }from '@angular/core'; 
import {CommonModule }from '@angular/common'; 

import {RegisterRoutingModule }from './register-routing.module'; 
import {SingUpComponent }from './sing-up/sing-up.component'; 

import {FormsModule }from '@angular/forms'; 
import {RouterModule }from '@angular/router'
import {MaterialModule}from '../../material.module'; 
import {ReactiveFormsModule }from '@angular/forms';
import { ProfileComponent } from './profile/profile.component'; 


@NgModule( {
declarations:[
    SingUpComponent,
    ProfileComponent
  ], 
imports:[
CommonModule, 
RegisterRoutingModule, 
ReactiveFormsModule, 
FormsModule, 
RouterModule, 
MaterialModule
  ]
})
export class RegisterModule {}
