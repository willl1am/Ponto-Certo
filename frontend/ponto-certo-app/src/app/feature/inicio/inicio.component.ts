import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FavoritosMockService, Favorito } from '../../core/services/favoritos-mock.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {

  private roteador = inject(Router);
  private favoritosServico = inject(FavoritosMockService);
  private autenticacao = inject(AuthService);

  nomeUsuario = '';

  termoBusca = '';
  favoritos: Favorito[] = [];

  ngOnInit(): void {
    const usuario = this.autenticacao.obterUsuario();
    this.nomeUsuario = usuario?.nome ?? '';
    this.favoritos = this.favoritosServico.getAll();
  }

  buscar(evento: Event): void {
    evento.preventDefault();
    if (!this.termoBusca.trim()) return;
    this.roteador.navigate(['/busca'], { queryParams: { q: this.termoBusca } });
  }

  remover(id: number): void {
    this.favoritosServico.remove(id);
    this.favoritos = this.favoritosServico.getAll();
  }
}
