import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import {RouterLink} from '@angular/router';
import {CartPopupComponent} from '../shared/cart-popup/cart-popup.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isScrolled: boolean = false;
  showCart: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll(){
      this.isScrolled = window.scrollY > 10;
  }
}
