import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritosMockService, Favorito } from '../../core/services/favoritos-mock.service';

type OrdemFavorito = 'linha' | 'parada';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent implements OnInit {

  private favoritosService = inject(FavoritosMockService);

  favoritos: Favorito[] = [];
  ordem: OrdemFavorito = 'linha';

  ngOnInit(): void {
    this.carregar();
  }

  remover(id: number): void {
    this.favoritosService.remove(id);
    this.carregar();
  }

  ordenarPor(ordem: OrdemFavorito): void {
    this.ordem = ordem;
    this.carregar();
  }

  private carregar(): void {
    const lista = this.favoritosService.getAll();
    this.favoritos = lista.sort((a, b) => {
      const campoA = this.ordem === 'linha' ? a.letreiro : a.nomeParada;
      const campoB = this.ordem === 'linha' ? b.letreiro : b.nomeParada;
      return campoA.localeCompare(campoB);
    });
  }
}
