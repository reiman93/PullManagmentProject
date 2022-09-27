import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SingUpComponent } from "./sing-up/sing-up.component";
import { AuthGuard } from '../../_helpers/auth.guard';
import { Role } from './../../models/user';

const routes: Routes =
    [
        {
            path: 'create', component: ProfileComponent,
        },
        {
            path: "list",
            canLoad: [AuthGuard],
            canActivate: [AuthGuard],
            loadChildren: () => import('./list/list.module').then(m => m.ListModule)
        },
        { path: '', redirectTo: 'create', pathMatch: 'full' },
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }
