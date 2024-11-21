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
  image?: string; // Adicionar a propriedade image
}

interface Order {
  id: string; // Adicionar a propriedade id no nível do pedido
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
    this.http.get<Order[]>('https://json-server-burguermania.vercel.app/orders')
      .subscribe(data => {
        const combinedOrders: Order[] = [];

        data.forEach(order => {
          const existingOrder = combinedOrders.find(o => o.id === order.id);
          if (existingOrder) {
            order.items.forEach(item => {
              const existingItem = existingOrder.items.find(i => i.productName === item.productName);
              if (existingItem) {
                existingItem.quantity += item.quantity;
              } else {
                existingOrder.items.push({ ...item, image: this.getProductImage(item.productName) });
              }
            });
          } else {
            combinedOrders.push({
              ...order,
              items: order.items.reduce((acc, item) => {
                const existingItem = acc.find(i => i.productName === item.productName);
                if (existingItem) {
                  existingItem.quantity += item.quantity;
                } else {
                  acc.push({ ...item, image: this.getProductImage(item.productName) });
                }
                return acc;
              }, [] as OrderItem[])
            });
          }
        });

        this.orders = combinedOrders;
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
    return this.orders.reduce((total: number, order: Order) => {
      return total + order.items.reduce((orderTotal, item) => orderTotal + item.price * item.quantity, 0);
    }, 0);
  }

  removeItem(orderId: string) {
    const index = this.orders.findIndex(order => order.id === orderId);
    if (index > -1) {
      this.orders.splice(index, 1);
      this.http.delete(`https://json-server-burguermania.vercel.app/orders/${orderId}`).subscribe(() => {
        console.log('Pedido removido com sucesso!');
      });
    }
  }

  finalizeOrder() {
    if (!this.customerName || !this.address || !this.paymentMethod) {
      this.showErrorMessage = true;
      return;
    }

    const orderDetails = {
      id: this.generateRandomId(), // Gerar um ID aleatório para o pedido
      customerName: this.customerName,
      address: this.address,
      paymentMethod: this.paymentMethod,
      items: this.orders.flatMap(order => order.items) // Combinar todos os itens dos pedidos
    };

    this.http.post('https://json-server-burguermania.vercel.app/finalizedOrders', orderDetails)
      .subscribe(response => {
        console.log('Pedido finalizado com sucesso!', response);
        this.orders = [orderDetails]; // Atualizar a lista de pedidos para exibir no modal
        this.showOverlay = true; // Mostrar a tela de sobreposição após finalizar o pedido
        this.showOrderModal = true;
        this.showErrorMessage = false; // Esconder a mensagem de erro após finalizar o pedido
      });
  }

  generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

