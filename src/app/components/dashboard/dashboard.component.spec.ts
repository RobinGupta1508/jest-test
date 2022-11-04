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


import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
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
      declarations: [ DashboardComponent ],
      providers:[
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    commonService = TestBed.inject(CommonService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call getDetails method', () => {

  // });

  it('should call getUserDetail API inside getDetails method for success block', () => {
    jest.spyOn(commonService, 'getUserDetail').mockReturnValue(of([{name: 'test'}]))
    component.getDetails();
    expect(component.data.length).toEqual(1);
  });

  it('should call getUserDetail API inside getDetails method for error block', () => {
    jest.spyOn(commonService, 'getUserDetail').mockReturnValue(throwError('Error from server'))
    component.getDetails();
    expect(component.data.length).toEqual(0);
  });

  it('should check modalVal', () => {
    component.modalVal(true);
    expect(component.showModal).toBeTruthy();
  });

  it('should call addUser API inside submitUser method for success block', () => {
    component.userForm.setValue({name: 'Test', project: 'test', status: 'active'});
    jest.spyOn(commonService, 'addUser').mockReturnValue(of(true));
    jest.spyOn(commonService, 'getUserDetail').mockReturnValue(of([]))
    component.submitUser(component.userForm);
    expect(commonService.addUser).toBeCalledTimes(1);
  });

  it('should call addUser API inside submitUser method for error block', () => {
    component.userForm.setValue({name: 'Test', project: 'test', status: 'active'});
    jest.spyOn(commonService, 'addUser').mockReturnValue(throwError('Error from server'));
    component.submitUser(component.userForm);
    expect(commonService.addUser).toBeCalledTimes(1);
    expect(component.errorMessage).toEqual('Something went wrong. Please refresh the page or try again later.')
  });

  it('should show error msg if form cvalidation is failed on submit click', () => {
    component.userForm.patchValue({name: 'Test', project: 'test', status: ''});
    component.submitUser(component.userForm);
    expect(component.formErrorMessage).toEqual(true)
  });

  it('should call deleteUser API inside deleteUser method for success block', () => {
    jest.spyOn(commonService, 'deleteUser').mockReturnValue(of(true));
    jest.spyOn(commonService, 'getUserDetail').mockReturnValue(of([]))
    component.deleteUser(1);
    expect(commonService.deleteUser).toBeCalledTimes(1);
  });

  it('should call deleteUser API inside deleteUser method for error block', () => {
    jest.spyOn(commonService, 'deleteUser').mockReturnValue(throwError('Error from server'));
    jest.spyOn(commonService, 'getUserDetail').mockReturnValue(of([]))
    component.deleteUser(1);
    expect(commonService.deleteUser).toBeCalledTimes(1);
    expect(component.errorMessage).toEqual('Something went wrong. Please refresh the page or try again later.')
  });
  
  it('should call redirectTo method', () => {
    jest.spyOn(commonService.userId, 'next').mockImplementation(()=>{});
    component.redirectTo(1);
    expect(commonService.userId.next).toBeCalled();
  });
});
