import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/responses/login-response';
import { LoginRequest } from '../models/requests/login-request';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RegisterRequest } from '../models/requests/register-request';
import {UpdateUserRequest} from '../dto/request/update-user-request';
import {ApiResponse} from '../dto/response/api-response';
import {PageResponse} from '../dto/response/page-response';
import {UserDto} from '../dto/response/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http : HttpClient) { }

  private apiUrl = 'http://localhost:8880/api/user';

  getUserDetails(userId: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/user-detail/${userId}`);
  }

  updateUserDetails(userId: string, request: UpdateUserRequest): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, request);
  }

  getUserList(size: number, page: number): Observable<ApiResponse<PageResponse<UserDto>>>{
    let params = new HttpParams()
      .set('size', size.toString())
      .set('page', page.toString());
    return this.http.get<ApiResponse<PageResponse<UserDto>>>(`${this.apiUrl}/get-list`, { params });
  }
}
