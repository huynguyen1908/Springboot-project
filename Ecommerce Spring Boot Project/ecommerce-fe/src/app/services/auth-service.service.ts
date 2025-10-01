import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { LoginRequest } from '../models/requests/login-request';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginResponse } from '../models/responses/login-response';
import { RegisterRequest } from '../models/requests/register-request';
import {Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isBrowser: boolean;
  constructor(private http : HttpClient,
              private router: Router, // Thêm Router
              @Inject(PLATFORM_ID) private platformId: Object)
  {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private apiUrl = 'http://localhost:8880/api/auth'

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request);
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, request)
  }

  changePassword(userId: string, newPassword: string): Observable<any> {
    const params = new HttpParams().set('newPassword', newPassword);
    return this.http.post<any>(`${this.apiUrl}/change-password/${userId}`, null, {params})
  }

  saveToken(accessToken: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', accessToken)
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/auth/login']);
  }
}
