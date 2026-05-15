import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, LinhaFavorita } from '../../core/services/auth.service';
import { LinhaService } from '../../core/services/linha.service';

type OrdemFavorito = 'linha';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent implements OnInit {

  private autenticacao = inject(AuthService);
  private linhaServico = inject(LinhaService);

  favoritos: LinhaFavorita[] = [];
  ordem: OrdemFavorito = 'linha';

  ngOnInit(): void {
    this.carregar();
  }

  nomeDaLinha(letreiro: string): string {
    return this.linhaServico.obterNomeLinha(letreiro);
  }

  remover(linhaId: number): void {
    const usuario = this.autenticacao.obterUsuario();
    if (!usuario) return;

    this.linhaServico.removerFavorito(usuario.id, linhaId).subscribe({
      next: (usuarioAtualizado) => {
        this.autenticacao.salvarUsuario(usuarioAtualizado);
        this.carregar();
      }
    });
  }

  private carregar(): void {
    const usuario = this.autenticacao.obterUsuario();
    const lista = usuario?.linhasFavoritas ?? [];
    this.favoritos = [...lista].sort((a, b) => a.letreiro.localeCompare(b.letreiro));
  }
}
