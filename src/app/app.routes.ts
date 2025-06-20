import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './page/login/login';
import { Home } from './page/home/home';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'home', component: Home }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouteModule { }