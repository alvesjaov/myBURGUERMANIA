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
  productIds: string[]; // Adicionar a propriedade productIds
  totalValue: number; // Adicionar a propriedade totalValue
  productNames: string[]; // Adicionar a propriedade productNames
  productImageUrls: string[]; // Adicionar a propriedade productImageUrls
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
    const orderId = '74959f99-f7c2-4130-8da8-19988d0e6ea3'; // Substituir pelo ID do pedido real

    this.http.get<any>(`https://myburguermania-api.onrender.com/api/Order/${orderId}`)
      .subscribe(order => {
        console.log('Dados do pedido recebidos:', order); // Adicionar log para verificar os dados recebidos
        if (order && order.productIds && order.productIds.length > 0) {
          this.orders = [{
            id: order.id,
            totalValue: order.totalValue,
            items: order.productIds.map((productId: string, index: number) => ({
              productName: order.productNames[index],
              price: order.totalValue / order.productIds.length, // Ajustar conforme necessário
              quantity: 1, // Ajustar conforme necessário
              image: order.productImageUrls[index]
            }))
          }];
        } else {
          console.error('Pedido ou itens do pedido não encontrados.');
          this.showErrorMessage = true; // Adicionar esta linha
        }
      }, error => {
        console.error('Erro ao buscar pedido:', error);
      });
  }

  cancelOrder(orderId: string) {
    this.http.patch(`https://myburguermania-api.onrender.com/api/Order/${orderId}/cancel`, {})
      .subscribe(() => {
        console.log('Pedido cancelado com sucesso!');
        this.fetchOrders(); // Atualizar a lista de pedidos após cancelar
      }, error => {
        console.error('Erro ao cancelar pedido:', error);
      });
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

