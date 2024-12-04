import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MenuComponent } from './views/menu/menu.component';
import { OrderComponent } from './views/order/order.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página inicial
  { path: 'cardapio', component: MenuComponent }, // Página do cardápio
  { path: 'pedido', component: OrderComponent }, // Página de pedidos
  { path: 'login', component: LoginComponent }, // Página de login
];