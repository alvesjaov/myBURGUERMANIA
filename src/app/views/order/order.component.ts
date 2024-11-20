import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Adicionado FormsModule
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardComponent } from '../../components/card/card.component';
import { ButtonModule } from '../../components/button/button.module'; 
import { CommonModule, NgOptimizedImage } from '@angular/common'; 

interface OrderItem {
  productName: string;
  price: number;
  quantity: number;
}

interface Order {
  items: OrderItem[];
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgOptimizedImage, ButtonModule, FooterComponent, CardComponent, HttpClientModule, FormsModule], // Adicionando CommonModule às importações
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  customerName: string = '';
  address: string = '';
  paymentMethod: string = '';
  showOverlay: boolean = false; 
  showOrderModal: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.http.get<any[]>('http://localhost:3000/orders')
      .subscribe(data => {
        this.orders = data.flatMap((order: Order) => order.items.map((item: OrderItem) => ({
          ...item,
          image: this.getProductImage(item.productName)
        }))); // Tratar todos os itens como um único pedido e adicionar a imagem
      });
  }

  getProductImage(productName: string): string {
    const productImages: { [key: string]: string } = {
      'Hambúrguer Tradicional': '/hamburguer-tradicional.png',
      'Hambúrguer Vegano': '/hamburguer-vegano.png',
      'Hambúrguer de Frango': '/hamburguer-frango.png',
      'Hambúrguer de Bacon': '/hamburgue-bacon.png',
      'Porção de Batata': '/porcao-batata.png',
      'Porção de Onion Rings': '/porcao-onion.png',
      'Porção de Nuggets': '/porcao-nuggets.png',
      'Coca-cola Lata': '/coca-cola.jpeg',
      'Coca-cola Zero Lata': '/coca-cola-zero.jpeg',
      'Guaraná Lata': '/guarana.jpeg'
    };
    return productImages[productName as keyof typeof productImages] || '';
  }

  getTotal() {
    return this.orders.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
  }

  finalizeOrder() {
    if (!this.customerName || !this.address || !this.paymentMethod) {
      this.showErrorMessage = true;
      return;
    }

    const orderDetails = {
      customerName: this.customerName,
      address: this.address,
      paymentMethod: this.paymentMethod,
      items: this.orders
    };

    this.http.post('http://localhost:3000/finalizedOrders', orderDetails)
      .subscribe(response => {
        console.log('Pedido finalizado com sucesso!', response);
        this.showOverlay = true; // Mostrar a tela de sobreposição após finalizar o pedido
        this.showOrderModal = true;
        this.showErrorMessage = false; // Esconder a mensagem de erro após finalizar o pedido
      });
  }
}
