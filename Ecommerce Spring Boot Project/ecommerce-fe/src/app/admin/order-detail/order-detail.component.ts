import {Component} from '@angular/core';
import {OrderDto} from '../../dto/response/order-dto';
import {OrderService} from '../../services/order.service';
import {ActivatedRoute} from '@angular/router';
import {response} from 'express';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OrderDetailDto} from '../../dto/response/order-detail-dto';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-order-detail',
  imports: [
    NgForOf
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  order: OrderDto | null = null;
  orderDetails: OrderDetailDto[] = [];
  subtotal = 0;

  constructor(private orderService: OrderService,
              private routerActive: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const orderId = this.routerActive.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.orderService.getOrderDetail(orderId).subscribe({
        next: (response: any) => {
          this.order = response.data;
          this.orderDetails = response.data.orderDetailList;
          this.orderDetails.forEach(orderDetail => {
            this.subtotal += orderDetail.price * orderDetail.quantity;
          })
        },
        error: (error) => {
          console.log(error);
          // this.snackBar.open('Error updating product', 'Close', {
          //   duration: 3000,
          //   panelClass: ['error-snackbar'],
          //   horizontalPosition: 'right',
          //   verticalPosition: 'bottom',
          // });
        }
      });
    }
  }
}
