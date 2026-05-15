import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LinhaSpTrans {
  cl: number;
  lc: boolean;
  lt: string;
  sl: number;
  tl: number;
  tp: string;
  ts: string;
}

@Injectable({
  providedIn: 'root'
})
export class LinhaService {

  private readonly urlBase = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  buscarNaSPTrans(termo: string): Observable<LinhaSpTrans[]> {
    return this.http.get<LinhaSpTrans[]>(`${this.urlBase}/linhas/buscar-sptrans`, {
      params: { termo }
    });
  }
}
