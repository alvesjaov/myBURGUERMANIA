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
  // Remover a propriedade selectedProducts
}

interface MappedOrder {
  id: string;
  statusName: string;
  totalValue: number;
  items: OrderItem[];
}

interface Product {
  id: string;
  title: string; // Atualizar para 'title'
  price: number;
  image: string; // Atualizar para 'image'
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

        this.http.get<any>(`https://myburguermania-api.onrender.com/api/Product`)
          .subscribe(response => {
            console.log('Resposta da API de produtos:', response); // Adicionar log para verificar a resposta da API de produtos
            const products = response.produtos;
            if (!Array.isArray(products)) {
              console.error('Erro: a resposta da API de produtos não é um array.');
              return;
            }
            const productDetailsMap = new Map(products.map((product: Product) => [product.id, product]));

            const orderDetailsRequests = orderHistory.map(order =>
              this.http.get<any>(`https://myburguermania-api.onrender.com/api/Order/${order.id}`).toPromise()
            );

            Promise.all(orderDetailsRequests).then(orderDetailsResponses => {
              console.log('Detalhes dos pedidos:', orderDetailsResponses); // Adicionar log para verificar os detalhes dos pedidos
              this.orders = orderDetailsResponses
                .filter(orderDetails => orderDetails.statusName !== 'Cancelado' && orderDetails.statusName !== 'Entregue') // Filtrar pedidos
                .map(orderDetails => ({
                  id: orderDetails.id,
                  statusName: orderDetails.statusName,
                  totalValue: orderDetails.totalValue,
                  items: orderDetails.productIds.map((productId: string, index: number) => {
                    const product = productDetailsMap.get(productId);
                    console.log('Detalhes do produto:', product); // Adicionar log para verificar os detalhes do produto
                    return {
                      productName: product?.title || 'Produto desconhecido', // Atualizar para 'title'
                      price: product?.price || 0, // Usar o preço correto de cada produto
                      quantity: 1, // Ajustar conforme necessário
                      image: product?.image || '' // Atualizar para 'image'
                    };
                  }).filter((item: OrderItem) => item.productName && item.image) // Ignorar produtos sem imagem ou nome
                }) as MappedOrder);
              console.log('Pedidos mapeados:', this.orders); // Adicionar log para verificar os pedidos mapeados
            }).catch(error => {
              console.error('Erro ao buscar detalhes dos pedidos:', error);
            });
          }, error => {
            console.error('Erro ao buscar detalhes dos produtos:', error);
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

