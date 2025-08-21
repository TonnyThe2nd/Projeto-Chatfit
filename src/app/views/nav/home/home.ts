import {  Component, OnInit } from '@angular/core';
import { LoginServer } from '../../login/login-server';
import { jwtDecode } from 'jwt-decode';
import { PerfilService } from '../perfil/perfil-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  tokenDecode : any;
  nome : string  = '';

  constructor(private token: LoginServer, private dados : PerfilService){
    this.tokenDecode = token.getToken()
    this.tokenDecode = jwtDecode(this.tokenDecode)
  }

  ngOnInit(): void {
      this.dados.alimentarPerfil(this.tokenDecode.sub).subscribe({
        next : (res) => {this.nome = res.userName.split(" ")[0]},
        error : (err) => console.log("Erro: ", err)
      })
      
  }
}
