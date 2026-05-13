import { Routes } from '@angular/router';
import { InicioComponent } from './feature/inicio/inicio.component';
import { FavoritosComponent } from './feature/favoritos/favoritos.component';
import { BuscaComponent } from './feature/busca/busca.component';

export const routes: Routes = [
  { path: '',          component: InicioComponent },
  { path: 'busca',     component: BuscaComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: '**',        redirectTo: '' }
];
