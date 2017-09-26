import { Routes, RouterModule }  from '@angular/router';
import {MenuComponent} from "./menu.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: MenuComponent,

  }
];

export const routing = RouterModule.forChild(routes);
