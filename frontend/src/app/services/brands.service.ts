//Librerías
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Enviorments
import { environment } from 'src/environments/environment.prod';
const base_url = environment.base_url;

//Modelos
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http: HttpClient) { }

  //Función global para capturar y validar el token
  private getHeadersToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  //Función para cargar Marcas y validar token
  loadBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${base_url}/brands`, { headers: this.getHeadersToken() });
  }

  //Función para crear Marca y validar token
  addBrand(brand:Brand):Observable<Brand> {
    return this.http.post<Brand>(`${base_url}/brands`, brand, { headers: this.getHeadersToken() });
  }

  //Función para capturar la Marca por Id y validar token
  brandId(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${base_url}/brands/${id}`, { headers: this.getHeadersToken() });
  }

  //Función para actualizar la Marca y validar token
  updateCustomer(id: string, brand:Brand):Observable<Brand> {
    return this.http.put<Brand>(`${base_url}/brands/${id}`, brand,{ headers: this.getHeadersToken() });
  }

  //Función para eliminar la Marca y validar token
  deleteBrand(id: string): Observable<Brand> {
    return this.http.delete<Brand>(`${base_url}/brands/${id}`, { headers: this.getHeadersToken() });
  }
}
