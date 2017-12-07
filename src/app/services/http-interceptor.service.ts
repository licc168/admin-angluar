/**
 * name:http服务
 * describe:对http请求做统一处理
 * author:lichangchao
 * date:2017/6/3
 * time:11:29
 */
import {Injectable}              from '@angular/core';
import {Http, Response}          from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {CONSTANTS} from "../app.const";

@Injectable()
export class HttpInterceptorService {
  constructor(private http: Http) {
  }

  /**
   * 统一发送请求
   * @param params
   * @returns {Promise<{success: boolean, msg: string}>|Promise<R>}
   */
  public request(params: any): any {
    if (params['method'] == 'post' || params['method'] == 'POST') {
      return this.post(params['url'], params['data']);
    }
    else {
      return this.get(params['url'], params['data']);
    }
  }

  /**
   * get请求
   * @param url 接口地址
   * @param params 参数
   * @returns {Promise<R>|Promise<U>}
   */
  public get(url: string, params: any): any {
    return this.http.get(url, {search: params})
      .toPromise()
      .then(this.handleSuccess)
      .catch(res => this.handleError(res));
  }


  public  delete(url:string, params: any) {
    return this.http.delete(url,params)
      .toPromise()
      .then(this.handleSuccess)
      .catch(res => this.handleError(res));

  }

  /**
   * post请求
   * @param url 接口地址
   * @param params 参数
   * @returns {Promise<R>|Promise<U>}
   */
  public post(url: string, params: any) {

    return this.http.post(url, params)
      .toPromise()
      .then(this.handleSuccess)
      .catch(res => this.handleError(res));
  }

  /**
   * 处理请求成功
   * @param res
   * @returns {{data: (string|null|((node:any)=>any)
   */
  private handleSuccess(res: Response) {

    let body = res["_body"];
    let result = JSON.parse(body);
    if (result.code == CONSTANTS.HTTPStatus.FAIL) {
      return {
        msg: result.desc,
        success: false,
      }
    } else {
      return {
        data: result.data,
        msg: result.desc,
        success: true,
      }

    }

  }

  /**
   * 处理请求错误
   * @param error
   * @returns {void|Promise<string>|Promise<T>|any}
   */
  private handleError(error) {
    console.log(error);
    let msg = '请求失败';
    if (error.status == 400) {
      console.log('请求参数正确');
    }
    if (error.status == 404) {
      console.error('请检查路径是否正确');
    }
    if (error.status == 500) {
      console.error('请求的服务器错误');
    }
    console.log(error);
    return {success: false, msg: msg};

  }

}
