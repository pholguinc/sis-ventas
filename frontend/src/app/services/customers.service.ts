import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }


  loadCustomers(): Observable<any> {
    const token = localStorage.getItem('token');

    const obj = new HttpHeaders().set('Authorization', 'bearer ' + token);

    return this.http.get(`${base_url}/customers`, { headers: obj });
  }
}
