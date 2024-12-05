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

interface UserOrderHistory {
  id: string;
  status: {
    name: string;
  };
  totalValue: number;
  selectedProducts: {
    productIds: string[];
    productNames: string[];
    productImageUrls: string[];
    productPrices: number[];
  };
}

interface MappedOrder {
  id: string;
  statusName: string;
  totalValue: number;
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
  showBagMenu: boolean = false;

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Usuário não está logado.');
      return;
    }

    this.http.get<any>(`https://myburguermania-api.onrender.com/api/User/${userId}`)
      .subscribe(user => {
        console.log('Histórico de pedidos do usuário:', user.orderHistory); // Adicionar log para verificar os dados recebidos
        const orderHistory: UserOrderHistory[] = user.orderHistory;

        const orderDetailsRequests = orderHistory.map(order =>
          this.http.get<any>(`https://myburguermania-api.onrender.com/api/Order/${order.id}`).toPromise()
        );

        Promise.all(orderDetailsRequests).then(orderDetailsResponses => {
          this.orders = orderDetailsResponses
            .filter(orderDetails => orderDetails.statusName !== 'Cancelado' && orderDetails.statusName !== 'Entregue') // Filtrar pedidos
            .map(orderDetails => ({
              id: orderDetails.id,
              statusName: orderDetails.statusName,
              totalValue: orderDetails.totalValue,
              items: orderDetails.productIds.map((productId: string, index: number) => ({
                productName: orderDetails.productNames[index],
                price: orderDetails.totalValue / orderDetails.productIds.length, // Ajustar conforme necessário
                quantity: 1, // Ajustar conforme necessário
                image: orderDetails.productImageUrls[index]
              }))
            }) as MappedOrder);
        }).catch(error => {
          console.error('Erro ao buscar detalhes dos pedidos:', error);
        });
      }, error => {
        console.error('Erro ao buscar histórico de pedidos do usuário:', error);
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

  toggleBagMenu(): void {
    this.showBagMenu = !this.showBagMenu;
  }

}

