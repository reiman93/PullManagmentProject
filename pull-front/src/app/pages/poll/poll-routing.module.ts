import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_helpers/auth.guard';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then((n) => n.ListModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then((n) => n.CreateModule),
    canActivate: [AuthGuard]
  },
  {
    path: "make/:id",
    loadChildren: () => import('./make/make.module').then((n) => n.MakeModule),
    canActivate: [AuthGuard]
  },
  {
    path: "edit/:id",
    loadChildren: () => import('./create/create.module').then((n) => n.CreateModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'auth',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollRoutingModule { }
