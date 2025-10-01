import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../dto/response/api-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private apiUrl: string = 'http://localhost:8880/api/category';
  constructor(private http:HttpClient) { }

  getAllCategories(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getProductsByCategory(categoryId: string, size: number, page: number) {
    return this.http.get(`${this.apiUrl}/products/${categoryId}`, {
      params: {
        size: size.toString(),
        page: page.toString()
      }
    });
  }

  addProductToCategory(categoryId: string, productId: string) {
    return this.http.post(`${this.apiUrl}/${categoryId}/add-product/${productId}`, {});
  }

  getCategoryById(categoryId: string) {
      return this.http.get(`${this.apiUrl}/${categoryId}`);
  }

  getCategoryIdAndCategoryName(): Observable<ApiResponse<{ [key: string]: string }>> {
    return this.http.get<ApiResponse<{ [key: string]: string }>>(`${this.apiUrl}/name`);
  }

  getCategoryNameById(categoryId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/category-name/${categoryId}`, {})
  }
}
