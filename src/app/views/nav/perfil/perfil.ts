import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginServer } from '../../login/login-server';
import { jwtDecode } from 'jwt-decode';
import { PerfilService, DadosUsuario } from './perfil-service';
import { get } from 'http';
import { HttpHeaders } from '@angular/common/http';
import { NovoUsuario } from '../../novo-usuario/novo_usuario';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-perfil',
  imports: [ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit{
  formulario: FormGroup;
  mostrarBotao : boolean = false;
  salvarToken : any;
  decoded: any;
  constructor(private token : LoginServer, private dados : PerfilService, 
    private cdr: ChangeDetectorRef, private fb: FormBuilder){
    this.formulario = this.fb.group({
      nome: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(3)]],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      celular: [{value: '', disabled: true}, [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      data_nascimento: new FormControl({ value: new Date(), disabled: true }, [Validators.required])
    });
    this.salvarToken = this.token.getToken()
    this.decoded = jwtDecode(this.salvarToken)
  }
  getUser(): any {
    if(!this.salvarToken) return null;
    try{
        this.dados.alimentarPerfil(this.decoded.sub).subscribe({
        next: (res) => {
          this.formulario.patchValue({
            nome: res.userName,
            email: res.email,
            celular: res.numero_Celular,
            data_nascimento: res.dataNascimento
          });
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err)
      });
    }catch (error){
      console.error("Erro: ", error)
    }
  }
  filtro = (d: Date | null): boolean => {
    const ano = (d || new Date()).getFullYear();
    return ano <= 2010;
  };

  alterarEstadoInputs(habilitar: boolean) {
    if (habilitar) {
      this.formulario.get('nome')?.enable();
      this.formulario.get('email')?.enable();
      this.formulario.get('celular')?.enable();
      this.formulario.get('data_nascimento')?.enable();
    } else {
      this.formulario.get('nome')?.disable();
      this.formulario.get('email')?.disable();
      this.formulario.get('celular')?.disable();
      this.formulario.get('data_nascimento')?.disable();
    }

    this.mostrarBotao = habilitar;
  }

  formatarTelefone(event: any) {
    let valor = event.target.value.replace(/\D/g, ''); 
    valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    event.target.value = valor;
    this.formulario.get('Numero_Celular')?.setValue(valor, { emitEvent: false });
  }

  atualizarDados(){
    debugger;
    const usuario: DadosUsuario = this.formulario.value;
    usuario.id = this.decoded.sub;
    const dadosPatch: any = { id: usuario.id };
    if (usuario.nome) dadosPatch.nome = usuario.nome;
    if (usuario.email) dadosPatch.email = usuario.email;
    if (usuario.celular) dadosPatch.celular= usuario.celular;
    if (usuario.data_nascimento) dadosPatch.data_nascimento = usuario.data_nascimento;
    this.dados.atualizarDados(dadosPatch).subscribe({
      next: (res) => {console.log("Sucesso: ", res), this.alterarEstadoInputs(false)},
      error : (err) => {console.log("Erro: ", err)}
    })
  }
  ngOnInit(): void {
    this.getUser()
  }

  
}
