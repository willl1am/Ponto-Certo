import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LinhaService, LinhaSpTrans } from '../../core/services/linha.service';
import { AuthService } from '../../core/services/auth.service';

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
export class BuscaComponent implements OnInit {

  private linhaServico = inject(LinhaService);
  private autenticacao = inject(AuthService);
  private rota = inject(ActivatedRoute);

  step = 1;
  loading = false;
  erro = false;
  mostrarToast = false;
  toastMensagem = '';
  avisoEndpoint = '';
  mostrarAvisoEndpoint = false;
  buscaRealizada = false;

  termoBusca = '';
  filtroParada = '';
  horarioAtualizacao = '';

  linhaSelecionada: Linha | null = null;
  paradaSelecionada: Parada | null = null;

  linhas: Linha[] = [];
  paradas: Parada[] = [];
  veiculos: Veiculo[] = [];

  private readonly PARADAS_MOCK: Parada[] = [
    { cp: 101, np: 'Terminal Lapa',       ed: 'Av. Antártica, 381 — Lapa'       },
    { cp: 102, np: 'Av. Paulista / MASP', ed: 'Av. Paulista, 1578 — Bela Vista' },
    { cp: 103, np: 'Largo do Arouche',    ed: 'R. Aurora, 10 — República'        },
    { cp: 104, np: 'Terminal Bandeira',   ed: 'Av. São João, 2 — Centro'         },
  ];

  private readonly VEICULOS_MOCK: Veiculo[] = [
    { p: '12.345', t: '14:39', a: true,  minutos: 7  },
    { p: '67.890', t: '14:47', a: false, minutos: 15 },
  ];

  get paradasDaBusca(): string {
    const paradas = new Set<string>();
    this.linhas.forEach(l => { paradas.add(l.tp); paradas.add(l.ts); });
    return [...paradas].join(', ');
  }

  get jaFavoritadoPrimeira(): boolean {
    if (!this.linhas.length) return false;
    const usuario = this.autenticacao.obterUsuario();
    if (!usuario) return false;
    return usuario.linhasFavoritas.some(f => f.letreiro === this.linhas[0].lt);
  }

  favoritarPrimeiraDaBusca(): void {
    if (!this.linhas.length) return;
    this.linhaSelecionada = this.linhas[0];
    this.toggleFavorito();
  }

  get paradasFiltradas(): Parada[] {
    const termo = this.filtroParada.toLowerCase();
    if (!termo) return this.paradas;
    return this.paradas.filter(p =>
      p.np.toLowerCase().includes(termo) || p.ed.toLowerCase().includes(termo)
    );
  }

  get jaFavoritado(): boolean {
    if (!this.linhaSelecionada) return false;
    const usuario = this.autenticacao.obterUsuario();
    if (!usuario) return false;
    return usuario.linhasFavoritas.some(f => f.letreiro === this.linhaSelecionada!.lt);
  }

  ngOnInit(): void {
    this.rota.queryParams.subscribe(params => {
      const termo = params['q'];
      if (termo) {
        this.termoBusca = termo;
        this.buscar();
      }
    });
  }

  buscar(evento?: Event): void {
    evento?.preventDefault();
    if (!this.termoBusca.trim()) return;
    this.buscaRealizada = true;
    this.loading = true;
    this.erro = false;
    this.linhas = [];

    this.linhaServico.buscarNaSPTrans(this.termoBusca).subscribe({
      next: (resultado) => {
        this.loading = false;
        this.linhas = resultado.map((item: LinhaSpTrans) => ({
          cl: item.cl,
          letreiro: item.lt,
          lt: item.lt,
          sentido: item.sl,
          tp: item.tp,
          ts: item.ts
        }));
      },
      error: () => {
        this.loading = false;
        this.erro = true;
      }
    });
  }

  selecionarLinha(linha: Linha): void {
    this.linhaSelecionada = linha;
    this.filtroParada = '';
    this.step = 2;
    this.loading = true;
    this.paradas = [];
    this.exibirAvisoEndpoint('Endpoint GET /paradas/buscar-sptrans não implementado no backend. Exibindo dados mock.');
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
    this.exibirAvisoEndpoint('Endpoint GET /previsao não implementado no backend. Exibindo dados mock.');
    setTimeout(() => {
      this.loading = false;
      this.veiculos = this.VEICULOS_MOCK;
      this.horarioAtualizacao = this.horaAtual();
    }, 600);
  }

  atualizar(): void {
    this.loading = true;
    this.veiculos = [];
    this.exibirAvisoEndpoint('Endpoint GET /previsao não implementado no backend. Exibindo dados mock.');
    setTimeout(() => {
      this.loading = false;
      this.veiculos = this.VEICULOS_MOCK;
      this.horarioAtualizacao = this.horaAtual();
    }, 800);
  }

  toggleFavorito(): void {
    if (!this.linhaSelecionada) return;
    const usuario = this.autenticacao.obterUsuario();
    if (!usuario) return;

    if (this.jaFavoritado) {
      const favorito = usuario.linhasFavoritas.find(f => f.letreiro === this.linhaSelecionada!.lt);
      if (!favorito) return;
      this.linhaServico.removerFavorito(usuario.id, favorito.id).subscribe({
        next: (usuarioAtualizado) => {
          this.autenticacao.salvarUsuario(usuarioAtualizado);
          this.linhaServico.removerNomeLinha(this.linhaSelecionada!.lt);
          this.exibirToast('Linha removida dos favoritos');
        }
      });
    } else {
      const nomeLinha = `${this.linhaSelecionada.tp} → ${this.linhaSelecionada.ts}`;
      this.linhaServico.salvarLinha(this.linhaSelecionada.lt).subscribe({
        next: (linhaSalva) => {
          this.linhaServico.favoritar(usuario.id, linhaSalva.id).subscribe({
            next: (usuarioAtualizado) => {
              this.autenticacao.salvarUsuario(usuarioAtualizado);
              this.linhaServico.salvarNomeLinha(this.linhaSelecionada!.lt, nomeLinha);
              this.exibirToast('Linha salva nos favoritos!');
            }
          });
        }
      });
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

  private exibirAvisoEndpoint(mensagem: string): void {
    this.avisoEndpoint = mensagem;
    this.mostrarAvisoEndpoint = true;
    setTimeout(() => this.mostrarAvisoEndpoint = false, 5000);
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
