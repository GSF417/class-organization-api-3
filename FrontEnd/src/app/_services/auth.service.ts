import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:7275/';
const httpOptions = {
  headers: new HttpHeaders({ ContentType: 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        email,
        password,
      },
      httpOptions
    );
  }
  register(name: string, email: string,password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        name,
        email,
        password
      },
      httpOptions
    );
  }
}
