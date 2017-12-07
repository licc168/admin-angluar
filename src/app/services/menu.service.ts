
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestMethod, Request} from '@angular/http';
import 'rxjs/add/operator/map';
import {CONSTANTS} from "../app.const";
import {Menu} from "app/models/menu";
import {HttpInterceptorService } from "app/services/http-interceptor.service";

@Injectable()
export class MenuService {
  constructor(private http: HttpInterceptorService) {
  }
  // 获取菜单列表
   list() {
    return this.http.get(CONSTANTS.API_URL.menu.list,null);
  }
  // 查询菜单信息
  page(menu: Menu) {
    return this.http.get(CONSTANTS.API_URL.menu.page,menu);
  }

  deleteById(id: number) {
    return this.http.delete(CONSTANTS.API_URL.menu.delete + "/" + id,null);
  }

  saveMenu(menu: Menu) {

    return this.http.post(CONSTANTS.API_URL.menu.save, menu);
  }

  parentList() {
    return this.http.get(CONSTANTS.API_URL.menu.parentList,null);

  }
  getById(id: number) {
    return this.http.get(CONSTANTS.API_URL.menu.getById + "/" + id,null);
  }
}
