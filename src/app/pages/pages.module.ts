import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import {NgZorroAntdModule} from "ng-zorro-antd";

import { Pages } from './pages.component';
import {AuthGuard} from "../guards/auth.guard";
import {MenuService} from "../services/menu.service";

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule,NgZorroAntdModule.forRoot(), routing],
  providers: [
    AuthGuard,
    MenuService
  ],
  declarations: [Pages]
})
export class PagesModule {
}
