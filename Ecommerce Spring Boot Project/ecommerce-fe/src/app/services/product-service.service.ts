import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CreateProductRequest} from '../dto/request/create-product-request';
import {Observable} from 'rxjs';
import {UpdateProductRequest} from '../dto/request/update-product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http : HttpClient) { }

  private apiUrl = 'http://localhost:8880/api/product';

  createProduct(formData:  FormData) : Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, formData);
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-details/${productId}`);
  }


  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${productId}`);
  }

  getAllProducts(size: number, page: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get(`${this.apiUrl}/get-list`, { params });
  }

  updateProduct(productId: string, request: UpdateProductRequest | null): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${productId}`, request);
  }

  uploadProductImage(productId: string, files: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload-image/${productId}`, files);
  }

  getProductImage(productId: string): Observable<Map<number, string>> {
    return this.http.get<Map<number, string>>(`${this.apiUrl}/get-image/${productId}`);
  }
  deleteProductImage(productId: string, imageId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/delete-image/${productId}/${imageId}`, {});
  }

}
