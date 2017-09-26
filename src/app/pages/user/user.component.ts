import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

import {CONSTANTS} from "../../app.const";
import {User} from "../../models/user";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'ng-user',
  templateUrl: './user.component.html',
  styleUrls  : ['./user.component.less']
})
export class UserComponent  implements OnInit {
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _loading = true;

  constructor(private userService: UserService,private _message: NzMessageService,) {

  }

  ngOnInit() {
    this.getPageData();
  }

  getPageData(reset = false) {
    if (reset) {
      this._current = 1;
    }

    let user = new User();
    user.page = this._current - 1;
    user.size = this._pageSize;
    this._loading = true;
    this.userService.page(user).subscribe(
      res => {
        if (res.status === CONSTANTS.HTTPStatus.SUCCESS) {
          const data = JSON.parse(res.text());
          this._total = data.totalElements;
          this._loading = false;
          this._dataSet = data.content;
        }
      },
      error => {


      });
  }

  deleteById(id: number) {
    debugger
    this.userService.deleteById(id).subscribe(
      res => {
        if (res.status === CONSTANTS.HTTPStatus.NO_CONTENT) {

          this._message.create("success","删除成功");
          this.getPageData();
        }
      },
      error => {
        this._message.create("error","删除失败");


      });
  }


}
