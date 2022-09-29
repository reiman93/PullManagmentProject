import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeComponent } from './make.component';

const routes: Routes = [{ path: '', component: MakeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakeRoutingModule { }
