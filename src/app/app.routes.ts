import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './page/login/login';
import { Home } from './page/home/home';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'home', component: Home, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouteModule { }