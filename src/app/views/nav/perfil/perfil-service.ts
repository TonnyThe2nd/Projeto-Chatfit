import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface DadosUsuario {
  id: number;
  nome: string;
  email: string;
  Numero_Celular: string;
  dataNascimento: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private url = 'http://localhost:5202/api/AlimentarPerfil';
  constructor(private http : HttpClient){}

  alimentarPerfil(id : number){
      return this.http.get<any>(`${this.url}?Id=${id}`) ;
  }

  atualizarDados(dados : DadosUsuario){
      return this.http.patch(`${this.url}`, dados)
  }

}
