import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EasyHttpService } from '@nge/easy-http';

import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class CommonService {
  userId: BehaviorSubject<any> = new BehaviorSubject<any>('');
  constructor(private httpService: EasyHttpService) {}
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getUserDetail(id: any = '') {
    const url = `http://localhost:3000/users/${id}`;
    return this.httpService.get(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        console.log('Throw error', error);
        return throwError(error);
      })
    );
  }

  addUser(userDetail: any){
    const url = 'http://localhost:3000/users';
    const user = {
      "userName": userDetail.name,
      "project": userDetail.project,
      "status": userDetail.status
    }
    const options = {
      headers: this.headers,
    };
    return this.httpService.post(url, user, options).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  updateUser(userDetail: any, id: number){
    const url = `http://localhost:3000/users/${id}`;
    const user = {
      "userName": userDetail.name,
      "project": userDetail.project,
      "status": userDetail.status
    }
    const options = {
      headers: this.headers,
    };
    return this.httpService.put(url, user, options).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteUser(id:number){
    const url = `http://localhost:3000/users/${id}`;
    return this.httpService.delete(url).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}