import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FavoritosMockService, Favorito } from '../../core/services/favoritos-mock.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {

  private router = inject(Router);
  private favoritosService = inject(FavoritosMockService);

  termoBusca = '';
  favoritos: Favorito[] = [];

  ngOnInit(): void {
    this.favoritos = this.favoritosService.getAll();
  }

  buscar(event: Event): void {
    event.preventDefault();
    if (!this.termoBusca.trim()) return;
    this.router.navigate(['/busca'], { queryParams: { q: this.termoBusca } });
  }

  remover(id: number): void {
    this.favoritosService.remove(id);
    this.favoritos = this.favoritosService.getAll();
  }
}
