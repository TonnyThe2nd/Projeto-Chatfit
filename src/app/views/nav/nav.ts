import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconAnchor,MatIconButton, MatButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { Perfil } from './perfil/perfil';
import { LoginServer } from '../login/login-server';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Chat } from './chat/chat';
import { Home } from './home/home';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet,FormsModule, CommonModule, MatListModule,MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule ],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {

  constructor(private route: ActivatedRoute,private observer: BreakpointObserver, private token : LoginServer, private router : Router) {
    this.observer.observe(['(max-width: 768px)']).subscribe(res => {
      this.opened = !res.matches;
    });
  }
    option : string = 'nav';
    opened: boolean = true;  
    setOption(option : string){
      this.option = option;
    }

    sair(){
      this.token.logout()
      this.router.navigate(['/login'])
    }
    
  navegar(url : string) {
    this.router.navigate([url], { relativeTo: this.route });
  }

}
