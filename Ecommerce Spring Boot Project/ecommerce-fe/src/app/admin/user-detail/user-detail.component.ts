import { Component } from '@angular/core';
import {UserDto} from '../../dto/response/user-dto';
import {UserServiceService} from '../../services/user-service.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe, CommonModule} from '@angular/common';
import {OrderDto} from '../../dto/response/order-dto';
import {OrderService} from '../../services/order.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatSnackBarModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  orders: OrderDto[] = [];
  dataExisted: boolean = false;
  user!: UserDto | null;

  constructor(
    private router: ActivatedRoute,
    private userService: UserServiceService,
    private orderService: OrderService,
    private snackBar : MatSnackBar,
  ) {}

  ngOnInit() {
    const userId = this.router.snapshot.paramMap.get('userId');
    if (userId) {
      this.userService.getUserDetails(userId).subscribe({
        next: (response) => {
          this.user = response.data;
        },
        error: (error) => {
          if (error.code === 1005 ){
            console.log("Data not found");
          } else {
            this.snackBar.open('Error fetching user details', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar'],
              horizontalPosition: 'right',
              verticalPosition: 'bottom',});
            console.error('Error fetching user details:', error);
          }
        }
      });
      this.orderService.getOrderHistoryByUser(userId).subscribe({
        next: (response) => {
          if (response.code === 1005){
            console.log("Data not found");
            this.dataExisted = false;
          } else {
            this.orders = response.data.data;
            this.dataExisted = true;
          }
        },
        error: (error) => {
          this.snackBar.open('Error fetching order history', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'bottom',});
          console.error('Error fetching order history:', error);
        }
      });
    }
  }
}
