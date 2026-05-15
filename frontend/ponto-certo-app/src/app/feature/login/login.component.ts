import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private router = inject(Router);

  email = '';
  senha = '';
  erro = '';
  carregando = false;

  entrar(event: Event): void {
    event.preventDefault();
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
    setTimeout(() => {
      this.carregando = false;
      this.router.navigate(['/inicio']);
    }, 800);
  }
}
