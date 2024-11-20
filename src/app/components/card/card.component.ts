import { Component, Input } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, NgIf], // Adicionar CurrencyPipe e NgIf
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() price: number = 0; // Adicionado valor padrão
  @Input() description: string = '';
}
