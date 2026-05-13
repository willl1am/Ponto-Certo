import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FavoritosMockService } from '../../core/services/favoritos-mock.service';

interface Linha {
  cl: number;
  letreiro: string;
  lt: string;
  sentido: number;
  tp: string;
  ts: string;
}

interface Parada {
  cp: number;
  np: string;
  ed: string;
}

interface Veiculo {
  p: string;
  t: string;
  a: boolean;
  minutos: number;
}

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent {

  private favoritosService = inject(FavoritosMockService);

  step = 1;
  loading = false;
  erro = false;
  mostrarToast = false;
  toastMensagem = '';
  buscaRealizada = false;

  termoBusca = '';
  filtroParada = '';
  horarioAtualizacao = '';

  linhaSelecionada: Linha | null = null;
  paradaSelecionada: Parada | null = null;

  linhas: Linha[] = [];
  paradas: Parada[] = [];
  veiculos: Veiculo[] = [];

  private readonly LINHAS_MOCK: Linha[] = [
    { cl: 1001, letreiro: '8000-10', lt: '8000', sentido: 1, tp: 'Terminal Lapa',    ts: 'Terminal Bandeira' },
    { cl: 1002, letreiro: '8000-21', lt: '8000', sentido: 2, tp: 'Terminal Bandeira', ts: 'Terminal Lapa' },
    { cl: 1003, letreiro: '8000-41', lt: '8000', sentido: 1, tp: 'Terminal Lapa',    ts: 'Metrô Consolação' },
  ];

  private readonly PARADAS_MOCK: Parada[] = [
    { cp: 101, np: 'Terminal Lapa',       ed: 'Av. Antártica, 381 — Lapa'          },
    { cp: 102, np: 'Av. Paulista / MASP', ed: 'Av. Paulista, 1578 — Bela Vista'    },
    { cp: 103, np: 'Largo do Arouche',    ed: 'R. Aurora, 10 — República'           },
    { cp: 104, np: 'Terminal Bandeira',   ed: 'Av. São João, 2 — Centro'            },
  ];

  private readonly VEICULOS_MOCK: Veiculo[] = [
    { p: '12.345', t: '14:39', a: true,  minutos: 7  },
    { p: '67.890', t: '14:47', a: false, minutos: 15 },
  ];

  get paradasFiltradas(): Parada[] {
    const termo = this.filtroParada.toLowerCase();
    if (!termo) return this.paradas;
    return this.paradas.filter(p =>
      p.np.toLowerCase().includes(termo) || p.ed.toLowerCase().includes(termo)
    );
  }

  get jaFavoritado(): boolean {
    if (!this.linhaSelecionada || !this.paradaSelecionada) return false;
    return this.favoritosService.isFavoritado(this.linhaSelecionada.cl, this.paradaSelecionada.cp);
  }

  buscar(event: Event): void {
    event.preventDefault();
    if (!this.termoBusca.trim()) return;
    this.buscaRealizada = true;
    this.loading = true;
    this.linhas = [];
    setTimeout(() => {
      this.loading = false;
      this.linhas = this.LINHAS_MOCK;
    }, 800);
  }

  selecionarLinha(linha: Linha): void {
    this.linhaSelecionada = linha;
    this.filtroParada = '';
    this.step = 2;
    this.loading = true;
    this.paradas = [];
    setTimeout(() => {
      this.loading = false;
      this.paradas = this.PARADAS_MOCK;
    }, 600);
  }

  verPrevisao(parada: Parada): void {
    this.paradaSelecionada = parada;
    this.step = 3;
    this.loading = true;
    this.veiculos = [];
    setTimeout(() => {
      this.loading = false;
      this.veiculos = this.VEICULOS_MOCK;
      this.horarioAtualizacao = this.horaAtual();
    }, 600);
  }

  atualizar(): void {
    this.loading = true;
    this.veiculos = [];
    setTimeout(() => {
      this.loading = false;
      this.veiculos = this.VEICULOS_MOCK;
      this.horarioAtualizacao = this.horaAtual();
    }, 800);
  }

  toggleFavorito(): void {
    if (!this.linhaSelecionada || !this.paradaSelecionada) return;
    if (this.jaFavoritado) {
      const fav = this.favoritosService.findByLinhaPrada(
        this.linhaSelecionada.cl, this.paradaSelecionada.cp
      );
      if (fav) this.favoritosService.remove(fav.id);
      this.exibirToast('Linha removida dos favoritos');
    } else {
      this.favoritosService.add({
        codigoLinha: this.linhaSelecionada.cl,
        letreiro:    this.linhaSelecionada.lt,
        nomeLinha:   `${this.linhaSelecionada.tp} → ${this.linhaSelecionada.ts}`,
        codigoParada: this.paradaSelecionada.cp,
        nomeParada:   this.paradaSelecionada.np,
        endereco:     this.paradaSelecionada.ed,
      });
      this.exibirToast('✅ Linha salva nos favoritos!');
    }
  }

  trocarParada(): void {
    this.step = 2;
    this.paradaSelecionada = null;
    this.veiculos = [];
  }

  novaBusca(): void {
    this.step = 1;
    this.linhaSelecionada = null;
    this.paradaSelecionada = null;
    this.linhas = [];
    this.paradas = [];
    this.veiculos = [];
    this.termoBusca = '';
    this.buscaRealizada = false;
  }

  private exibirToast(mensagem: string): void {
    this.toastMensagem = mensagem;
    this.mostrarToast = true;
    setTimeout(() => this.mostrarToast = false, 3000);
  }

  private horaAtual(): string {
    return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }
}
