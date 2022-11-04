import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ClarityModule } from '@clr/angular';
import { CommonService } from '../../services/common.service';

import { of, throwError } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

import { UpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;
  let commonService: CommonService;
  const activatedRouteMock = {
  };

  const routerMock = {
    navigate: () => {}
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ 
        BrowserAnimationsModule,
        CommonModule,
        FormsModule, 
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [ UpdateComponent ],
      providers:[
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    commonService = TestBed.inject(CommonService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserDetail API inside getUserDetails method', () => {
    commonService.userId.next(1);
    jest.spyOn(commonService, 'getUserDetail').mockReturnValue(of({id:1, userName: 'trest', project: 'test', status:'test'}));
    component.getUserDetails();
    expect(commonService.getUserDetail).toHaveBeenCalled();
  });

  it('should call resetForm method', () => {
    jest.spyOn(component.updateForm, 'reset').mockImplementation(()=>{});
    component.resetForm();
    expect(component.updateForm.reset).toHaveBeenCalled();
  });

  it('should call redirectTo method', () => {
    jest.spyOn(routerMock, 'navigate').mockImplementation(()=>{})
    component.redirectTo();
    // expect(routerMock.navigate).toBeCalled();
  });

  it('should call updateUser API inside submit method for success block', () => {
    jest.spyOn(commonService, 'updateUser').mockReturnValue(of([]));
    component.submit(component.updateForm);
    expect(commonService.updateUser).toHaveBeenCalledTimes(1);
  });
  it('should call updateUser API inside submit method for error block', () => {
    jest.spyOn(commonService, 'updateUser').mockReturnValue(throwError("serveer Error"));
    component.submit(component.updateForm);
    expect(component.errorMessage).toEqual('Something went wrong. Please refresh the page or try again later.')
  });

});
