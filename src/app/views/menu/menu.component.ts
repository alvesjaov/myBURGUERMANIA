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
  showBagMenu: boolean = false;
  selectedProduct: any = null;
  quantity: number = 1;
  products: any[] = [];
  statuses: any[] = []; // Adicionar uma propriedade para armazenar os statuses
  order: { id: string, name: string, quantity: number, image: string, price: number }[] = []; // Modificar a estrutura da sacola

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
    this.fetchStatuses(); // Buscar os statuses ao inicializar o componente
  }

  toggleFullMenu() {
    this.showFullMenu = !this.showFullMenu;
  }

  toggleBagMenu() {
    this.showBagMenu = !this.showBagMenu;
  }

  openProductDetails(product: any) {
    this.selectedProduct = product;
    this.quantity = 1; // Resetar a quantidade ao abrir os detalhes do produto
  }

  adjustQuantity(amount: number) {
    this.quantity = Math.max(1, this.quantity + amount);
  }

  addToBag() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Usuário não está logado.');
      return;
    }

    const productId = this.selectedProduct.id;
    const productName = this.selectedProduct.title;
    const productImage = this.selectedProduct.image;
    const productPrice = this.selectedProduct.price;

    const existingProduct = this.order.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity += this.quantity;
    } else {
      this.order.push({ id: productId, name: productName, quantity: this.quantity, image: productImage, price: productPrice });
    }

    console.log('Sacola atual:', this.order);

    this.selectedProduct = null; // Fechar o modal após adicionar à sacola
    this.quantity = 1; // Resetar a quantidade após adicionar à sacola
  }

  removeFromBag(productId: string) {
    this.order = this.order.filter(item => item.id !== productId);
  }

  getTotal() {
    return this.order.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  submitOrder() {
    const userId = localStorage.getItem('userId'); // Buscar o ID do usuário logado
    if (!userId) {
      alert('Usuário não está logado.');
      return;
    }

    const orderPayload = {
      userId: userId,
      products: this.order.map(item => ({ id: item.id, quantity: item.quantity }))
    };

    console.log('Enviando pedido:', orderPayload); // Log do pedido antes de enviar

    this.http.post('https://myburguermania-api.onrender.com/api/order', orderPayload)
      .subscribe(
        response => {
          console.log('Pedido enviado com sucesso!', response);
          this.order = []; // Limpar a sacola após enviar
        },
        error => {
          console.error('Erro ao enviar pedido:', error);
          console.log('Pedido:', orderPayload); // Log do pedido em caso de erro
        }
      );
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

  fetchStatuses() {
    this.http.get('https://myburguermania-api.onrender.com/api/status')
      .subscribe(
        (response: any) => {
          console.log('Statuses encontrados:', response);
          this.statuses = response.statuses;
        },
        (error) => {
          console.error('Erro ao buscar statuses:', error);
        }
      );
  }

  generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
