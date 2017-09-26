import {NgModule, Component}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';


import {routing} from "./user.routing";
import {UserComponent} from "./user.component";
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {UserService} from "../../services/user.service";

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgZorroAntdModule,

    routing
  ],
  declarations: [
    UserComponent

  ],
  entryComponents: [
  ],
  providers: [
    UserService

  ]
})
export class UserModule {
}
