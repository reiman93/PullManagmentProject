import { PagesComponent } from './pages/pages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_helpers/auth.guard';
import { Role } from './../models/user';

const routes: Routes =
    [{
        path: '', component: PagesComponent,
        children: [
            {
                path: 'poll',
                loadChildren: () => import('./poll/poll.module').then((n) => n.PollModule),
                canActivate: [AuthGuard]
            },{
                path: '**',
                redirectTo: 'auth',
            }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
