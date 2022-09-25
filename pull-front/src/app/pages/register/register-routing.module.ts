import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SingUpComponent } from "./sing-up/sing-up.component";
import { AuthGuard } from '../../_helpers/auth.guard';
import { Role } from './../../models/user';

const routes: Routes =
    [
        { path: '', component: SingUpComponent },
        {
            path: 'profile/:param', component: ProfileComponent,
            canLoad: [AuthGuard],
            canActivate: [AuthGuard],
            data: {
                roles: [
                    Role.Admin,
                    Role.QA,
                ]
            }
        },
        {
            path: 'create/:param', component: ProfileComponent,
            canLoad: [AuthGuard],
            canActivate: [AuthGuard],
            data: {
                roles: [
                    Role.Admin,
                ]
            }
        },
        {
            path: "list",
            canLoad: [AuthGuard],
            canActivate: [AuthGuard],
            data: {
                roles: [
                    Role.Admin,
                ]
            },
            loadChildren: () => import('./list/list.module').then(m => m.ListModule)
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }
