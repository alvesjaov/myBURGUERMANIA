import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { OrderComponent } from './views/order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pedido', component: OrderComponent },
  // outras rotas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }