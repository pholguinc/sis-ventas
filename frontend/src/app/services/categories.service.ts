import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  //Función global para capturar y validar el token
  private getHeadersToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  //Función para cargar Categorías  y validar token
  loadCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${base_url}/categories`, { headers: this.getHeadersToken() });
  }

  //Función para crear Categoría y validar token
  addCategory(category:Category):Observable<Category> {
    return this.http.post<Category>(`${base_url}/categories`, category, { headers: this.getHeadersToken() });
  }

  //Función para capturar la Categoría por Id y validar token
  categoryId(id: string): Observable<Category> {
    return this.http.get<Category>(`${base_url}/categories/${id}`, { headers: this.getHeadersToken() });
  }

  //Función para actualizar la Categoría y validar token
  updateCategory(id: string, category:Category):Observable<Category> {
    return this.http.put<Category>(`${base_url}/categories/${id}`, category,{ headers: this.getHeadersToken() });
  }

  //Función para eliminar la Categoría y validar token
  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(`${base_url}/categories/${id}`, { headers: this.getHeadersToken() });
  }
}
