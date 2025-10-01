import { Component } from '@angular/core';
import {HeaderComponent} from '../../header/header.component';
import {FooterComponent} from '../../footer/footer.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

}
