import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ChatApi } from './chat-api';
import { catchError, finalize, of } from 'rxjs';

interface Mensagem {
  user: 'eu' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatIconModule]
})
export class Chat {
  novaMensagem = '';
  messages: Mensagem[] = [
    { user: 'bot', text: 'Olá! Eu sou o Bot Fitness. Fale comigo sobre nutrição e/ou academia!\nComo posso te ajudar hoje?' }
  ];

  constructor(private apiRequest: ChatApi, private cdr : ChangeDetectorRef) {}

  enviarMensagem() {
    if (!this.novaMensagem.trim()) return;
    this.messages.push({ user: 'eu', text: this.novaMensagem });
    this.apiRequest.mensagemApi(this.novaMensagem).pipe(
      finalize(()=>{
        this.cdr.detectChanges();
      }),
      catchError((err)=>
        {
          console.log("Erro"); 
          return of(null)
        })
    )
    .subscribe({
      next: (res) => {
        if(res){
          this.messages.push({ user: 'bot', text: res.response });
          this.scroll();
        }
        
      },
      error: (err) => console.error(err)
    });
    this.novaMensagem = '';
    this.scroll();
  }

  scroll() {
    setTimeout(() => {
      const container = document.querySelector('.chat-messages');
      if (container) container.scrollTop = container.scrollHeight;
    }, 100);
  }
}
