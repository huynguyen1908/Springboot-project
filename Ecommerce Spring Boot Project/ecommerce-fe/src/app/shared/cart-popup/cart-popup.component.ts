import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-cart-popup',
  imports: [
    RouterLink
  ],
  templateUrl: './cart-popup.component.html',
  styleUrl: './cart-popup.component.css'
})
export class CartPopupComponent {

}
