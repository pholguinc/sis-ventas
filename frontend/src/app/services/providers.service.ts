import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Provider } from '../models/provider.model';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {


  constructor(private http: HttpClient) { }

  //Función global para capturar y validar el token
  private getHeadersToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  //Función para cargar Proveedores y validar token
  loadProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(`${base_url}/providers`, { headers: this.getHeadersToken() });
  }

  //Función para crear Proveedores y validar token
  addProvider(provider:Provider):Observable<Provider> {
    return this.http.post<Provider>(`${base_url}/providers`, provider, { headers: this.getHeadersToken() });
  }

  //Función para capturar el Proveedorpor Id y validar token
  providerId(id: string): Observable<Provider> {
    return this.http.get<Provider>(`${base_url}/providers/${id}`, { headers: this.getHeadersToken() });
  }

  //Función para actualizar el Proveedory validar token
  updateProvider(id: string, provider:Provider):Observable<Provider> {
    return this.http.put<Provider>(`${base_url}/providers/${id}`, provider,{ headers: this.getHeadersToken() });
  }

  //Función para eliminar el Proveedory validar token
  deleteProvider(id: string): Observable<Provider> {
    return this.http.delete<Provider>(`${base_url}/providers/${id}`, { headers: this.getHeadersToken() });
  }
}
