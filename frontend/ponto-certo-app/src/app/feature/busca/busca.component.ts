import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent {
  step = 1;
  loading = false;
  erro = false;
  mostrarToast = false;
  jaFavoritado = false;
}
