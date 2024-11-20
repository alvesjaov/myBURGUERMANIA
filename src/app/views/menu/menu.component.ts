import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importando CommonModule
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonModule } from '../../components/button/button.module'; // Importando o módulo ButtonModule
import { NgOptimizedImage } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgOptimizedImage, ButtonModule, FooterComponent, CardComponent], // Adicionando CommonModule às importações
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  showFullMenu: boolean = false;

  toggleFullMenu() {
    this.showFullMenu = !this.showFullMenu;
  }
}
