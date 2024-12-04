import { Component, OnInit } from '@angular/core';
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
export class MenuComponent implements OnInit {
  showFullMenu: boolean = false;
  selectedProduct: any = null;
  quantity: number = 1;
  products: any[] = [];

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
  }

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
      id: this.generateRandomId(), // Gerar um ID aleatório para o pedido
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
        this.selectedProduct = null; // Fechar o modal após adicionar o pedido
        this.quantity = 1; // Resetar a quantidade após adicionar o pedido
      });
  }

  fetchProducts() {
    console.log('Iniciando a busca de produtos...');
    this.http.get('https://myburguermania-api.onrender.com/api/product', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .subscribe(
      (response: any) => {
        console.log('Resposta da API:', response);
        this.products = response.produtos;
      },
      (error) => {
        console.error('Erro ao buscar produtos:', error);
      }
    );
  }

  generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
