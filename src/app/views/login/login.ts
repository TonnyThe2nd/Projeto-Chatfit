import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginServer } from './login-server';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

@Component({
  standalone:true,
  selector: 'app-login',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule,RouterModule,MatSnackBarModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private http : LoginServer, private router : Router, private snackBar : MatSnackBar){}

  login: any = {
    'Email': '',
    'Senha': '',
  }

  onLogin() {
  this.http.authenticate(this.login).subscribe({
    next: (res) => {
      if (res.token) {
        this.snackBar.open('Login realizado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/nav']);
      } else {
          this.snackBar.open('Erro no login.', 'Fechar', { duration: 3000 });
      }
    },
    error: (err) => {
      console.error(err);
      this.snackBar.open(err.error, 'Fechar', { duration: 3000 });
    }
  });
}

}
