import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router:Router) {}


  loadUsers(): Observable<any> {

    const token = localStorage.getItem('token');

    const obj = new HttpHeaders().set('Authorization', "bearer "+token)

    return this.http.get(`${base_url}/users`, { headers:obj });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  loginAccess(data: LoginForm): Observable<any> {
    return this.http.post(`${base_url}/auth/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.access_token);
      })
    );
  }

}
