import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  erro = '';
  carregando = false;

  criar(event: Event): void {
    event.preventDefault();
    this.erro = '';

    if (!this.nome.trim() || !this.email.trim() || !this.senha.trim() || !this.confirmarSenha.trim()) {
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

    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    this.carregando = true;
    this.authService.cadastrar(this.nome, this.email, this.senha).subscribe({
      next: () => {
        this.carregando = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.status === 400
          ? 'E-mail já cadastrado.'
          : 'Erro ao criar conta. Tente novamente.';
      }
    });
  }
}
