import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NovoUsuario } from './views/novo-usuario/novo_usuario';
import { Login } from './views/login/login';
import { Nav } from './views/nav/nav';
import { Home } from './views/nav/home/home';
import { Chat } from './views/nav/chat/chat';
import { Perfil } from './views/nav/perfil/perfil';
@Component({
  standalone:true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  protected readonly title = signal('cadastro');
}
