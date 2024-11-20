import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isHomePage: boolean;
  isMenuPage: boolean;
  isOrderPage: boolean = false;
  isMenuOpen: boolean = false; // Adicionado

  constructor(private readonly router: Router) {
    this.isHomePage = this.isHomeRoute(this.router.url);
    this.isMenuPage = this.isMenuRoute(this.router.url);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.isHomeRoute(this.router.url);
        this.isMenuPage = this.isMenuRoute(this.router.url);
      }
    });
  }

  toggleMenu() { // Adicionado
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() { // Adicionado
    this.isMenuOpen = false;
  }

  private isHomeRoute(url: string): boolean {
    return url.split('#')[0] === '/';
  }

  private isMenuRoute(url: string): boolean {
    return url.split('#')[0] === '/cardapio';
  }
}