import { Component, OnInit } from '@angular/core';
import { ApiServer, Usuario } from './api-server';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  standalone:true,
  selector: 'app-novo_usuario',
  imports: [ReactiveFormsModule,HttpClientModule, RouterModule,
     CommonModule,MatNativeDateModule,MatDatepickerModule,
    FormsModule, MatInputModule, MatFormFieldModule ],
  templateUrl: './novo_usuario.html',
  styleUrl: './novo_usuario.css'
})
export class NovoUsuario {
  @ViewChild('userForm') userForm!: NgForm;
  formulario : FormGroup
  
  constructor(private api : ApiServer, private fb : FormBuilder){
    this.formulario = this.fb.group({
      email: ['',[Validators.required,Validators.email]]
    })
  }

  filtro = (d: Date | null): boolean => {
    const ano = (d || new Date()).getFullYear();
    return ano <= 2010;
  };

  posts: any[] = [];
  SenhaConf : string = '';  
  mensagemAlertaSenha : string = '';
  mensagemAlertaAno : string = '';
  mensagemAlertaEmail : string = '';

  usuario : Usuario = {
    UserName:'',
    Senha:'',
    Email:'',
    Numero_Celular:'',
    dataNascimento:''
  }

  enviar() {
    console.log(this.usuario.Numero_Celular)
    if(this.usuario.Senha.localeCompare(this.SenhaConf)){
      this.mensagemAlertaSenha = 'Senhas não coincidem!';
    }else if(new Date(this.usuario.dataNascimento) > new Date(2010, 0, 1)){
      this.mensagemAlertaAno = 'Ano inválido!';
    }
    else{
        this.api.cadastrar(this.usuario).subscribe({
          next: res => {
            alert('Cadastro Realizado com sucesso!')
            this.mensagemAlertaSenha = '';
            this.mensagemAlertaAno= '';
            this.limparFormulario();
          },
          error: err => {
            alert('Erro no cadastro: '+ err.error)
          }
        });
      }
    }
  formatarTelefone(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); 
    valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    event.target.value = valor;
    this.formulario.get('Numero_Celular')?.setValue(valor, { emitEvent: false });
  }
  limparFormulario() {
    this.userForm.resetForm({
      Id: 1,
      UserName: '',
      Senha: '',
      Email: '',
      Numero_Celular: '',
      dataNascimento: ''
    });
    this.SenhaConf = '';
  }
}
