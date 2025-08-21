import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  UserName: string;
  Senha: string;
  Email: string;
  dataNascimento: string;
  Numero_Celular: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiServer {
  
  private apiUrl = 'http://localhost:5202/NovoUsuario';
  constructor(private http : HttpClient){}

  cadastrar(usuario : Usuario) : Observable<any>{
    return this.http.post(this.apiUrl, usuario)
  }

}
