import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatApi {

  private url = 'http://localhost:8000/chat';

  constructor(private http : HttpClient){}
 
  mensagemApi(texto : string){
    return this.http.post<{response : string}>(this.url, {user_input: texto})
  }
}
