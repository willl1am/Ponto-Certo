import { Routes } from '@angular/router';
import { InicioComponent } from './feature/inicio/inicio.component';
import { FavoritosComponent } from './feature/favoritos/favoritos.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: '**', redirectTo: '' }
];
