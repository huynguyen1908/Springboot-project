import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {AdminHeaderComponent} from '../admin-header/admin-header.component';
import {UserDto} from '../../dto/response/user-dto';
import {UserServiceService} from '../../services/user-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  imports: [
    NgClass,
    NgForOf,
    FormsModule,
    RouterLink,
    MatPaginatorModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userList : UserDto [] = [];
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private userService: UserServiceService,
    private snackBar: MatSnackBar,
  ) {}

  toggleActive(user: UserDto) {
    user.active = !user.active;
  }

  ngOnInit() {
    this.loadUserList(this.pageSize, this.pageIndex);
  }

  loadUserList(pageSize: number, pageIndex: number) {
    this.userService.getUserList(pageSize, pageIndex).subscribe({
      next: (response) => {
        this.userList = response.data.data;
        this.totalElements = response.data.totalElements;
        this.pageSize = pageSize;
        this.pageIndex = pageIndex;
      },
      error: (error) => {
        this.snackBar.open('Error updating product', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',});
        console.log(error);
      }
    });
  }
  onPageChange(event: any) {
    this.loadUserList(event.pageSize, event.pageIndex);
  }
}
