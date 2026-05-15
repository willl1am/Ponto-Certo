import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly urlBase = 'http://localhost:8080';
  private readonly chaveArmazenamento = 'ponto_certo_usuario';

  constructor(private http: HttpClient, private router: Router) {}

  cadastrar(nome: string, email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.urlBase}/usuarios`, { nome, email, senha });
  }

  login(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.urlBase}/usuarios/login`, { email, senha }).pipe(
      tap(usuario => localStorage.setItem(this.chaveArmazenamento, JSON.stringify(usuario)))
    );
  }

  logout(): void {
    localStorage.removeItem(this.chaveArmazenamento);
    this.router.navigate(['/login']);
  }

  obterUsuario(): Usuario | null {
    const dados = localStorage.getItem(this.chaveArmazenamento);
    return dados ? JSON.parse(dados) : null;
  }

  estaLogado(): boolean {
    return !!this.obterUsuario();
  }
}
