import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgOptimizedImage } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonModule } from '../../components/button/button.module';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardComponent } from '../../components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, NgOptimizedImage, ButtonModule, FooterComponent, CardComponent, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password // Envie a senha sem criptografar
    };
    console.log('Iniciando o login com os dados:', loginData); // Log para verificar os dados enviados

    this.http.post(`https://myburguermania-api.onrender.com/api/Login`, loginData).subscribe((response: any) => {
      console.log('Resposta da API:', response); // Log para verificar a resposta da API
      if (response && response.id) {
        console.log('Dados do usuário:', response); // Log para verificar os dados do usuário
        localStorage.setItem('token', 'fake-jwt-token');
        localStorage.setItem('username', response.name);
        localStorage.setItem('userId', response.id); // Armazena o ID do usuário
        localStorage.setItem('orderHistory', JSON.stringify(response.orderHistory)); // Armazena o histórico de pedidos
        this.router.navigate(['/']);
      } else {
        alert('Usuário ou senha incorretos');
      }
    }, (error) => {
      console.error('Erro da API:', error); // Log para verificar erros da API
    });
  }
}
