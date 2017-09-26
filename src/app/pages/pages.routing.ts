import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {UserComponent} from "./user/user.component";
import {AuthGuard} from "../guards/auth.guard";

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuard]},
      {path: 'user', loadChildren: 'app/pages/user/user.module#UserModule', canLoad: [AuthGuard]},
      {path: 'sys/menu', loadChildren: 'app/pages/menu/menu.module#MenuModule', canLoad: [AuthGuard]}

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
