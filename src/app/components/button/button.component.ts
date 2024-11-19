import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  @Input() isPrimary: boolean = true;
  @Input() text: string = 'Cardápio';
  @Input() routerLink?: string; 
}