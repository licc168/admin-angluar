import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuEditComponent} from './menu-edit.component';

describe('UserEditComponent', () => {
    let component: MenuEditComponent;
    let fixture: ComponentFixture<MenuEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MenuEditComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
