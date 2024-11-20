import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonModule } from '../../components/button/button.module';
import { NgOptimizedImage } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [HeaderComponent, NgOptimizedImage, ButtonModule, FooterComponent], // Use o módulo em vez do componente diretamente
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
