import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {OrderDto} from '../../dto/response/order-dto';
import {OrderService} from '../../services/order.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-order-list',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  orders : OrderDto[] = [];
  constructor(
    private routerActive: ActivatedRoute,
    private orderService : OrderService
  ) {}

  ngOnInit() {
    this.orderService.getAllOrders(10,0).subscribe(response => {
      this.orders = response.data.data;
    });
  }
}
