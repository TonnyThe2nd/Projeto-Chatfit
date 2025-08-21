import { Routes } from '@angular/router';
import { NovoUsuario } from './views/novo-usuario/novo_usuario';
import { Login } from './views/login/login';
import { Nav } from './views/nav/nav';
import { AuthGuard } from './views/login/auth-guard';
import { Perfil } from './views/nav/perfil/perfil';
import { Home } from './views/nav/home/home';
import { Chat } from './views/nav/chat/chat';

export const routes: Routes = [{
    path : 'cadastro', component:  NovoUsuario, pathMatch:'full'
    },{
        path: 'login', component: Login, pathMatch:'full'
    },{
        path:'', redirectTo:'login', pathMatch:'full'
    },{
        path:'nav', component: Nav, canActivate: [AuthGuard],
        children:[
            { path: 'home', component: Home},
            {path: 'chat', component: Chat},
            {path: 'perfil', component: Perfil}
        ]
    }
];
  