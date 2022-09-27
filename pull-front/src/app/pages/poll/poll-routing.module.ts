import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/_helpers/auth.guard';

const routes: Routes = [
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then((n) => n.CreateModule),
    canActivate: [AuthGuard]
},
{ path: '', redirectTo: 'create', pathMatch: 'full' },
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
