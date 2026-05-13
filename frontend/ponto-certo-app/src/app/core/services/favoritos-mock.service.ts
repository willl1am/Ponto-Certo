import { Injectable } from '@angular/core';

export interface Favorito {
  id: number;
  codigoLinha: number;
  letreiro: string;
  nomeLinha: string;
  codigoParada: number;
  nomeParada: string;
  endereco: string;
}

@Injectable({ providedIn: 'root' })
export class FavoritosMockService {

  private favoritos: Favorito[] = [
    {
      id: 1, codigoLinha: 1001, letreiro: '8000',
      nomeLinha: 'Terminal Lapa → Terminal Bandeira',
      codigoParada: 102, nomeParada: 'Av. Paulista / MASP', endereco: 'Av. Paulista, 1000'
    },
    {
      id: 2, codigoLinha: 2001, letreiro: '5100',
      nomeLinha: 'Terminal Santo André → Terminal Penha',
      codigoParada: 201, nomeParada: 'R. das Flores', endereco: 'R. das Flores, 200'
    },
    {
      id: 3, codigoLinha: 3001, letreiro: '6290',
      nomeLinha: 'Terminal Pinheiros → Terminal Tucuruvi',
      codigoParada: 301, nomeParada: 'Av. Rebouças', endereco: 'Av. Rebouças, 450'
    },
  ];

  getAll(): Favorito[] {
    return [...this.favoritos];
  }

  add(fav: Omit<Favorito, 'id'>): void {
    const id = Math.max(0, ...this.favoritos.map(f => f.id)) + 1;
    this.favoritos.push({ ...fav, id });
  }

  remove(id: number): void {
    this.favoritos = this.favoritos.filter(f => f.id !== id);
  }

  isFavoritado(codigoLinha: number, codigoParada: number): boolean {
    return this.favoritos.some(f => f.codigoLinha === codigoLinha && f.codigoParada === codigoParada);
  }

  findByLinhaPrada(codigoLinha: number, codigoParada: number): Favorito | undefined {
    return this.favoritos.find(f => f.codigoLinha === codigoLinha && f.codigoParada === codigoParada);
  }
}
