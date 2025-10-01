import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiResponse} from '../dto/response/api-response';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8880/api/orders';

  constructor(private http: HttpClient) {}

  getOrderHistoryByUser(userId: string, size: number = 10, page: number = 0): Observable<ApiResponse<any>> {
    const params = {
        size: size.toString(),
        page: page.toString()
    }
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/user/${userId}/history`, { params });
  }

  getAllOrders(size: number, page: number): Observable<ApiResponse<any>> {
    const params = {
        size: size.toString(),
        page: page.toString()
    }
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/get-order-list`, { params });
  }

  getOrderDetail(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/order-detail/${orderId}`);
  }
}
