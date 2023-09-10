import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Customer } from '../models/customer.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }


  //Función global para capturar y validar el token
  private getHeadersToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }


   //Función para cargar Clientes y validar token
   loadCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${base_url}/customers`, { headers: this.getHeadersToken() });
  }

  //Función para crear Cliente y validar token
  addCustomer(customer:Customer):Observable<Customer> {
    return this.http.post<Customer>(`${base_url}/customers`, customer, { headers: this.getHeadersToken() });
  }

  //Función para capturar la Cliente por Id y validar token
  customerId(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${base_url}/customers/${id}`, { headers: this.getHeadersToken() });
  }

  //Función para actualizar la Cliente y validar token
  updateCustomer(id: string, customer:Customer):Observable<Customer> {
    return this.http.put<Customer>(`${base_url}/customers/${id}`, customer,{ headers: this.getHeadersToken() });
  }

  //Función para eliminar la Cliente y validar token
  deleteCustomer(id: string): Observable<Customer> {
    return this.http.delete<Customer>(`${base_url}/customers/${id}`, { headers: this.getHeadersToken() });
  }
}
