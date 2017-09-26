import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Router, ActivatedRoute} from '@angular/router';
import {MenuService} from "../../../../services/menu.service";
import {Menu} from "../../../../models/menu";
import {CONSTANTS} from "../../../../app.const";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'nz-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.less']
})
export class MenuEditComponent implements OnInit {
  _id = '';
  validateForm: FormGroup;
  menus: Array<Object>;
  public id:AbstractControl;
  public title:AbstractControl;
  public parentId:AbstractControl;
  public icon:AbstractControl;
  public path:AbstractControl;
  public orderNum:AbstractControl;
  _flag: boolean;
  _artId: number;
  @Input()
  set flag(value: boolean) {
    this._flag = value;
  }
  @Input()
  set artId(value: number) {
    this._artId = value;
  }
  constructor(private menuService: MenuService, private _message: NzMessageService, private router: Router, private route: ActivatedRoute, fb: FormBuilder) {

    this.validateForm = fb.group({
      id: [''],
      title: ['', Validators.compose([Validators.required])],
      parentId: [''],
      icon: [''],
      path: [''],
      orderNum: [''],


    });

    this.route.params.subscribe((params) => {
      console.dir(params);
      this._id = params['id'] || '';
    });
  }

  createMessage = (type, text) => {
    this._message.create(type, text);
  }

  ngOnInit(): void {
    this.parentList();

    if(this._flag) {
      this.openEdit(this._artId);
    }
  }

  openEdit(id:number) {

    this.menuService.getById(id).subscribe(
      res => {
        if (res.status === CONSTANTS.HTTPStatus.SUCCESS) {

          const  data = JSON.parse(res.text());
          this.title = data.title;
          this.id = data.id;
          this.icon =data.icon;
          this.parentId  = data.parentId;
          this.path  = data.path;
          this.orderNum  = data.orderNum;

        }
      },
      error => {


      });


  }
  parentList() {

    this.menuService.parentList().subscribe(
      res => {
        if (res.status === CONSTANTS.HTTPStatus.SUCCESS) {
          let data = JSON.parse(res.text());
          this.menus = data;
        }
      },
      error => {


      });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  public onSubmit(menu: Menu): void {

    this.menuService.saveMenu(menu).subscribe(
      (data) => {
        if (data.status === CONSTANTS.HTTPStatus.SUCCESS) {
          this.createMessage("success", "操作成功");
        }
      },
      error => {
        this.createMessage("error", "操作失败");

      });
  };

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
    }
  }

}
