import { Component, OnInit, HostListener } from '@angular/core';
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
  isMenuOpen: boolean = false;
  isAuthenticated = false;
  username = '';
  isModalOpen: boolean = false;
  isMiniMenuOpen: boolean = false;
  isLoginPage: boolean;

  constructor(private readonly router: Router) {
    this.isHomePage = this.isHomeRoute(this.router.url);
    this.isMenuPage = this.isMenuRoute(this.router.url);
    this.isLoginPage = this.isLoginRoute(this.router.url);
    this.isAuthenticated = !!localStorage.getItem('token');
    this.username = localStorage.getItem('username') || '';
    this.isOrderPage = this.isAuthenticated && this.isOrderRoute(this.router.url);
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.isHomeRoute(this.router.url);
        this.isMenuPage = this.isMenuRoute(this.router.url);
        this.isLoginPage = this.isLoginRoute(this.router.url);
        this.isOrderPage = this.isAuthenticated && this.isOrderRoute(this.router.url);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 768) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleMiniMenu() {
    this.isMiniMenuOpen = !this.isMiniMenuOpen;
  }

  closeMenu() {
    this.isMiniMenuOpen = false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('orderHistory');
    this.router.navigate(['/login']);
  }

  private isHomeRoute(url: string): boolean {
    return url.split('#')[0] === '/';
  }

  private isMenuRoute(url: string): boolean {
    return url.split('#')[0] === '/cardapio';
  }

  private isLoginRoute(url: string): boolean {
    return url.split('#')[0] === '/login';
  }

  private isOrderRoute(url: string): boolean {
    return url.split('#')[0] === '/pedido';
  }
}