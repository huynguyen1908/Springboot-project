import { HttpInterceptorFn } from '@angular/common/http';
import {AuthServiceService} from './services/auth-service.service';
import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  const token = authService.getToken();

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        alert('Phiên đăng nhập đã hết hạn. Đang đăng xuất...');
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
