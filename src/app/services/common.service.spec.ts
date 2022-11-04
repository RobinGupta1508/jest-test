import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { EasyHttpService } from '@nge/easy-http';
import { of, throwError } from 'rxjs'; 

import { CommonService } from './common.service';

describe('TestService', () => {
  let service: CommonService;
  let easyHttp: EasyHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    easyHttp = TestBed.inject(EasyHttpService);
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUserDetail: success', () => {
    jest.spyOn(easyHttp, 'get').mockImplementation(() => of({name: 'test'}));
    service.getUserDetail()
    .subscribe(data => {
      expect(data.name).toEqual('test')
    })
    expect(easyHttp.get).toHaveBeenCalled();

  });

  it('should call getUserDetail: error', () => {
    jest.spyOn(easyHttp, 'get').mockReturnValue(throwError('Server Error'));
    service.getUserDetail(1)
    .subscribe(data=>{

    }, err=> {
      console.log('err', err);
      expect(err).toEqual('Server Error');
    })
  });

  it('should call addUser: success', () => {
    jest.spyOn(easyHttp, 'post').mockImplementation(() => of({name: 'test'}));
    service.addUser({name: 'test', project: 'test', status: 'Active'})
    .subscribe(data => {
      expect(data.name).toEqual('test')
    })
    expect(easyHttp.post).toHaveBeenCalled();
  });

  it('should call addUser: error', () => {
    jest.spyOn(easyHttp, 'post').mockReturnValue(throwError('Server Error'));
    service.addUser({name: 'test', project: 'test', status: 'Active'})
    .subscribe(data=>{

    }, err=> {
      console.log('err', err);
      expect(err).toEqual('Server Error');
    })
  });

  it('should call updateUser: success', () => {
    jest.spyOn(easyHttp, 'put').mockImplementation(() => of({name: 'test'}));
    service.updateUser({name: 'test', project: 'test', status: 'Active'}, 3)
    .subscribe(data => {
      expect(data.name).toEqual('test')
    })
    expect(easyHttp.put).toHaveBeenCalled();
  });

  it('should call updateUser: error', () => {
    jest.spyOn(easyHttp, 'put').mockReturnValue(throwError('Server Error'));
    service.updateUser({name: 'test', project: 'test', status: 'Active'}, 1)
    .subscribe(data=>{

    }, err=> {
      console.log('err', err);
      expect(err).toEqual('Server Error');
    })
  });

  it('should call deleteUser: success', () => {
    jest.spyOn(easyHttp, 'delete').mockImplementation(() => of({name: 'test'}));
    service.deleteUser(3)
    .subscribe(data => {
      expect(data.name).toEqual('test')
    })
    expect(easyHttp.delete).toHaveBeenCalled();
  });

  it('should call deleteUser: error', () => {
    jest.spyOn(easyHttp, 'delete').mockReturnValue(throwError('Server Error'));
    service.deleteUser(1)
    .subscribe(data=>{

    }, err=> {
      console.log('err', err);
      expect(err).toEqual('Server Error');
    })
  });
});
