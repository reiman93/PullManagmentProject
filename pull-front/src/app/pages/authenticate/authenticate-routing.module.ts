import {NgModule }from '@angular/core'; 
import {RouterModule, Routes }from '@angular/router'; 
import {LoguinComponent}from './loguin/loguin.component'

const routes:Routes = 
[ {path:'', component:LoguinComponent}]; 

@NgModule( {
imports:[RouterModule.forChild(routes)], 
exports:[RouterModule]
})
export class AuthenticateRoutingModule {}
