import {Component, Input, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";

import {CONSTANTS} from "../../app.const";
import {Menu} from "../../models/menu";
import {NzMessageService} from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import {MenuEditComponent} from "./children/menu-edit/menu-edit.component";

@Component({
  selector: 'ng-menu',
  templateUrl: './menu.component.html',
  styleUrls  : ['./menu.component.less']
})
export class MenuComponent  implements OnInit {
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _loading = true;

  constructor(private menuService: MenuService,private _message: NzMessageService,private modalService: NzModalService) {

  }
  createMessage = (type, text) => {
    this._message.create(type,text);
  }
  ngOnInit() {
    this.getPageData();
  }

  getPageData(reset = false) {
    if (reset) {
      this._current = 1;
    }

    let menu = new Menu();
    menu.page = this._current - 1;
    menu.size = this._pageSize;
    this._loading = true;

    this.menuService.page(menu).subscribe(
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

    this.menuService.deleteById(id).subscribe(
      res => {
        if (res.status === CONSTANTS.HTTPStatus.SUCCESS) {
          this.createMessage("success","删除成功");
          this.getPageData();
        }
      },
      error => {


      });
  }
  showModalForComponentAdd() {
    const subscription = this.modalService.open({
      title          : '新增菜单',
      content        : MenuEditComponent,
      onOk() {
      },
      onCancel() {
      },
      footer         : false,
      componentParams: {
        flag: false
      }
    });
    subscription.subscribe(result => {

    });
  }
  showModalForComponentEdit(id:number) {
    const subscription = this.modalService.open({
      title          : '修改菜单',
      content        : MenuEditComponent,
      onOk() {
      },
      onCancel() {
      },
      footer         : false,
      componentParams: {
        flag: true,
        artId :id
      }
    });
    subscription.subscribe(result => {

    });
  }
}
