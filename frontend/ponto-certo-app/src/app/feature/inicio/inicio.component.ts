import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, LinhaFavorita } from '../../core/services/auth.service';
import { LinhaService } from '../../core/services/linha.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {

  private roteador = inject(Router);
  private autenticacao = inject(AuthService);
  private linhaServico = inject(LinhaService);

  nomeUsuario = '';
  termoBusca = '';
  favoritos: LinhaFavorita[] = [];

  ngOnInit(): void {
    const usuario = this.autenticacao.obterUsuario();
    this.nomeUsuario = usuario?.nome ?? '';
    this.favoritos = usuario?.linhasFavoritas ?? [];
  }

  buscar(evento: Event): void {
    evento.preventDefault();
    if (!this.termoBusca.trim()) return;
    this.roteador.navigate(['/busca'], { queryParams: { q: this.termoBusca } });
  }

  remover(linhaId: number): void {
    const usuario = this.autenticacao.obterUsuario();
    if (!usuario) return;

    this.linhaServico.removerFavorito(usuario.id, linhaId).subscribe({
      next: (usuarioAtualizado) => {
        this.autenticacao.salvarUsuario(usuarioAtualizado);
        this.favoritos = usuarioAtualizado.linhasFavoritas;
      }
    });
  }
}
