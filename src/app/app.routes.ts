import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MenuComponent } from './views/menu/menu.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página inicial
  { path: 'cardapio', component: MenuComponent }, // Página do cardápio
];