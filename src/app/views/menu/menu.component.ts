import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'; 
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonModule } from '../../components/button/button.module'; 
import { FooterComponent } from '../../components/footer/footer.component';
import { CardComponent } from '../../components/card/card.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgOptimizedImage, ButtonModule, FooterComponent, CardComponent, HttpClientModule], // Adicionando CommonModule às importações
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  showFullMenu: boolean = false;
  selectedProduct: any = null;
  quantity: number = 1;

  constructor(private http: HttpClient) {}

  toggleFullMenu() {
    this.showFullMenu = !this.showFullMenu;
  }

  openProductDetails(product: any) {
    this.selectedProduct = product;
    this.quantity = 1; // Resetar a quantidade ao abrir os detalhes do produto
  }

  adjustQuantity(amount: number) {
    this.quantity = Math.max(1, this.quantity + amount);
  }

  addToOrder() {
    const order = {
      customerName: 'Cliente Exemplo',
      total: this.selectedProduct.price * this.quantity,
      items: [
        {
          productName: this.selectedProduct.title,
          quantity: this.quantity,
          price: this.selectedProduct.price
        }
      ]
    };

    this.http.post('https://json-server-burguermania.vercel.app/orders', order)
      .subscribe(response => {
        console.log('Pedido enviado com sucesso!', response);
        this.selectedProduct = null;
      });
  }
}
