import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators, FormControl} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';

import 'style-loader!./register.scss';
import {CONSTANTS} from "../../app.const";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {NzMessageService} from "ng-zorro-antd";


@Component({
  selector: 'register',
  templateUrl: './register.html',
})
export class Register implements OnInit  {

  validateForm: FormGroup;

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

  constructor(private fb: FormBuilder,private userService:UserService,private _message: NzMessageService) {
  }

  updateConfirmValidator() {

    setTimeout(_ => {
      this.validateForm.controls[ 'checkPassword' ].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  };

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email            : [ null, [ Validators.email ] ],
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      userName         : [ null, [ Validators.required ] ]
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }
  public onSubmit(values:User):void {

    let user = new User();
    user.password = values.password;
    user.userName = values.userName;
    user.email = values.email;
    if (this.validateForm.valid) {
      this.userService.register(user).subscribe(
        (data) => {
          if (data.status === CONSTANTS.HTTPStatus.SUCCESS) {
            this._message.create("success","注册成功");
          }
        },
        error => {
          this._message.create("error","系统异常");

        });
    }
  }
}
