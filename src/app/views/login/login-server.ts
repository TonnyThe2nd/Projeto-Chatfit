import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode'
@Injectable({
  providedIn: 'root'
})
export class LoginServer {
  private apiUrl = 'http://localhost:5202/api/Login';
  private tokenKey  = 'token';

  constructor(private http : HttpClient) {}

  authenticate(login: any){
    return this.http.post<{token:string}>(this.apiUrl, login).pipe(
      tap(res => {
        if(res && res.token){
          localStorage.setItem(this.tokenKey, res.token)
        }
      })
    );
  }

  getToken():string | null{
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp; 
      const now = Math.floor(Date.now() / 1000);
      return exp > now; 
    } catch (e) {
      return false;
    }
  }

}
