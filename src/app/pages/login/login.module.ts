import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Login } from './login.component';
import { routing }       from './login.routing';
import {HttpModule} from "@angular/http";
import {AuthenticationService} from "../../services/authentication.service";
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    HttpModule,
    NgZorroAntdModule
  ],
  providers: [
    AuthenticationService
  ],
  declarations: [
    Login
  ]
})
export class LoginModule {}
