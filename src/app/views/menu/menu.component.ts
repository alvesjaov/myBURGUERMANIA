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
  categories: any[] = []; // Adicionar uma propriedade para armazenar as categorias
  statuses: any[] = []; // Adicionar uma propriedade para armazenar os statuses
  order: { id: string, name: string, quantity: number, image: string, price: number }[] = []; // Modificar a estrutura da sacola
  hamburgueres: any[] = []; // Adicionar uma propriedade para armazenar os produtos da categoria "Hambúrgueres"
  selectedProductsId: string | null = null; // Adicionar uma propriedade para armazenar o ID dos produtos selecionados

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.fetchCategories(); // Buscar as categorias ao inicializar o componente
    this.fetchStatuses(); // Buscar os statuses ao inicializar o componente
    // this.fetchSelectedProductsId(); // Remover a busca de ID dos produtos selecionados ao inicializar o componente
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

    // Adicionar produtos à rota SelectedProducts
    this.updateSelectedProducts();
  }

  removeFromBag(productId: string) {
    this.order = this.order.filter(item => item.id !== productId);

    // Remover produto da rota SelectedProducts
    if (this.selectedProductsId !== null) {
      this.http.delete(`https://myburguermania-api.onrender.com/api/SelectedProducts/${this.selectedProductsId}/product/${productId}`)
        .subscribe(
          response => {
            console.log('Produto removido com sucesso!', response);
          },
          error => {
            console.error('Erro ao remover produto:', error);
          }
        );
    }
  }

  updateSelectedProducts() {
    const productIds = this.order.map(item => item.id);

    if (this.selectedProductsId !== null) {
      // Adicionar produtos a um SelectedProducts existente
      this.http.put(`https://myburguermania-api.onrender.com/api/SelectedProducts/${this.selectedProductsId}`, productIds)
        .subscribe(
          response => {
            console.log('Produtos selecionados atualizados com sucesso!', response);
          },
          error => {
            console.error('Erro ao atualizar produtos selecionados:', error);
          }
        );
    } else {
      // Criar novos produtos selecionados
      const payload = {
        userId: localStorage.getItem('userId'),
        productIds: productIds
      };

      this.http.post('https://myburguermania-api.onrender.com/api/SelectedProducts', payload)
        .subscribe(
          (response: any) => {
            console.log('Produtos selecionados criados com sucesso!', response);
            this.selectedProductsId = response.id; // Armazenar o ID dos produtos selecionados
          },
          error => {
            console.error('Erro ao criar produtos selecionados:', error);
          }
        );
    }
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

    if (!this.selectedProductsId) {
      alert('Nenhum produto selecionado.');
      return;
    }

    const statusId = this.statuses.find(status => status.name === 'Pendente')?.id;
    if (!statusId) {
      alert('Status não encontrado.');
      return;
    }

    const orderPayload = {
      userId: userId,
      statusId: statusId,
      selectedProductsId: this.selectedProductsId
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

  fetchStatuses() {
    this.http.get('https://myburguermania-api.onrender.com/api/status')
      .subscribe(
        (response: any) => {
          console.log('Statuses encontrados:', response);
          this.statuses = response.statuses;
        },
        (error: any) => {
          console.error('Erro ao buscar statuses:', error);
        }
      );
  }

  fetchCategories() {
    console.log('Iniciando a busca de categorias...');
    this.http.get('https://myburguermania-api.onrender.com/api/Category', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .subscribe(
      (response: any) => {
        console.log('Resposta da API:', response);
        this.categories = response.categorias
          .filter((category: any) => category.products && category.products.length > 0) // Filtrar categorias vazias
          .sort((a: any, b: any) => {
            const order = ['Hambúrgueres', 'Porções', 'Bebidas', 'Sobremesas'];
            return order.indexOf(a.name) - order.indexOf(b.name);
          });
        this.products = this.categories.flatMap((category: any) => 
          category.products.map((product: any) => ({ ...product, categoryName: category.name }))
        ); // Armazenar todos os produtos com a propriedade categoryName
      },
      (error: any) => {
        console.error('Erro ao buscar categorias:', error);
      }
    );
  }

  // fetchSelectedProductsId() {
  //   const userId = localStorage.getItem('userId');
  //   if (userId) {
  //     this.http.get(`https://myburguermania-api.onrender.com/api/SelectedProducts/user/${userId}`)
  //       .subscribe(
  //         (response: any) => {
  //           console.log('ID dos produtos selecionados encontrado:', response);
  //           this.selectedProductsId = response.id;
  //         },
  //         (error: any) => {
  //           console.error('Erro ao buscar ID dos produtos selecionados:', error);
  //         }
  //       );
  //   }
  // }

  generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  hasProductsInCategory(categoryName: string): boolean {
    return this.products.some(product => product.categoryName === categoryName);
  }
}
