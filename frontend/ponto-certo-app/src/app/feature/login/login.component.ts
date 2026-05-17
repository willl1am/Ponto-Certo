import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private roteador = inject(Router);
  private autenticacao = inject(AuthService);

  email = '';
  senha = '';
  erro = '';
  carregando = false;

  entrar(evento: Event): void {
    evento.preventDefault();
    this.erro = '';

    if (!this.email.trim() || !this.senha.trim()) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    if (!this.email.includes('@')) {
      this.erro = 'Informe um e-mail válido.';
      return;
    }

    if (this.senha.length < 6) {
      this.erro = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    this.carregando = true;
    this.autenticacao.login(this.email, this.senha).subscribe({
      next: () => {
        this.carregando = false;
        this.roteador.navigate(['/inicio']);
      },
      error: () => {
        this.carregando = false;
        this.erro = 'E-mail ou senha incorretos.';
      }
    });
  }
}
