import { Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { CadastroComponent } from './feature/cadastro/cadastro.component';
import { InicioComponent } from './feature/inicio/inicio.component';
import { BuscaComponent } from './feature/busca/busca.component';
import { FavoritosComponent } from './feature/favoritos/favoritos.component';

export const routes: Routes = [
  { path: '',          redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',     component: LoginComponent },
  { path: 'cadastro',  component: CadastroComponent },
  { path: 'inicio',    component: InicioComponent },
  { path: 'busca',     component: BuscaComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: '**',        redirectTo: 'login' }
];
