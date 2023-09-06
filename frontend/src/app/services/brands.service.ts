import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Brand } from '../models/brand.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http: HttpClient) { }

  loadBrands(): Observable<any> {
    const token = localStorage.getItem('token');

    const obj = new HttpHeaders().set('Authorization', 'bearer ' + token);

    return this.http.get(`${base_url}/brands`, { headers: obj });
  }

  //Función para Crear Brands con TOKEN
  addBrand(brand:Brand) {
    const token = localStorage.getItem('token');
    const obj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.post(`${base_url}/brands`, brand, { headers: obj });
  }


  loadImages(): Observable<any> {
    const token = localStorage.getItem('token');
    const obj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.post(`${base_url}/brands/images`, { headers: obj });
  }

  deleteBrand(id: string): Observable<Brand> {
    const token = localStorage.getItem('token');
    const obj = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.delete<Brand>(`${base_url}/brands/${id}`, { headers: obj });
  }
}
