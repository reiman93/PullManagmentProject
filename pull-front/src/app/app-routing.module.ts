import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from '../app/_helpers/auth.guard';


const routes: Routes = [
    {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then((n) => n.PagesModule),
        canActivate: [AuthGuard]
    },
    { path: 'auth', loadChildren: () => import('./pages/authenticate/authenticate.module').then((n) => n.AuthenticateModule) },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
        path: '**',
        redirectTo: 'auth',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
