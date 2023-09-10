import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  //Función global para capturar y validar el token
  private getHeadersToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  //Función para cargar Productos  y validar token
  loadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${base_url}/products`, { headers: this.getHeadersToken() });
  }

  //Función para crear Productos y validar token
  addProduct(product:Product):Observable<Product> {
    return this.http.post<Product>(`${base_url}/products`, product, { headers: this.getHeadersToken() });
  }

  //Función para capturar el Producto por Id y validar token
  productId(id: string): Observable<Product> {
    return this.http.get<Product>(`${base_url}/products/${id}`, { headers: this.getHeadersToken() });
  }

  //Función para actualizar el Producto y validar token
  updateProduct(id: string, product:Product):Observable<Product> {
    return this.http.put<Product>(`${base_url}/products/${id}`, product,{ headers: this.getHeadersToken() });
  }

  //Función para eliminar el Producto y validar token
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${base_url}/products/${id}`, { headers: this.getHeadersToken() });
  }
}
