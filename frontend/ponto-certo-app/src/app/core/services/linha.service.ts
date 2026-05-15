import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './auth.service';

export interface LinhaSpTrans {
  cl: number;
  lc: boolean;
  lt: string;
  sl: number;
  tl: number;
  tp: string;
  ts: string;
}

export interface LinhaSalva {
  id: number;
  letreiro: string;
}

@Injectable({
  providedIn: 'root'
})
export class LinhaService {

  private readonly urlBase = 'http://localhost:8080';
  private readonly chaveNomes = 'ponto_certo_nomes_linhas';

  constructor(private http: HttpClient) {}

  salvarNomeLinha(letreiro: string, nome: string): void {
    const cache = this.obterCacheNomes();
    cache[letreiro] = nome;
    localStorage.setItem(this.chaveNomes, JSON.stringify(cache));
  }

  obterNomeLinha(letreiro: string): string {
    return this.obterCacheNomes()[letreiro] ?? '';
  }

  removerNomeLinha(letreiro: string): void {
    const cache = this.obterCacheNomes();
    delete cache[letreiro];
    localStorage.setItem(this.chaveNomes, JSON.stringify(cache));
  }

  private obterCacheNomes(): Record<string, string> {
    const dados = localStorage.getItem(this.chaveNomes);
    return dados ? JSON.parse(dados) : {};
  }

  buscarNaSPTrans(termo: string): Observable<LinhaSpTrans[]> {
    return this.http.get<LinhaSpTrans[]>(`${this.urlBase}/linhas/buscar-sptrans`, {
      params: { termo }
    });
  }

  salvarLinha(letreiro: string): Observable<LinhaSalva> {
    return this.http.post<LinhaSalva>(`${this.urlBase}/linhas`, { letreiro });
  }

  favoritar(usuarioId: number, linhaId: number): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.urlBase}/usuarios/${usuarioId}/favoritar/${linhaId}`, {});
  }

  removerFavorito(usuarioId: number, linhaId: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlBase}/usuarios/${usuarioId}/favoritar/${linhaId}`);
  }
}
