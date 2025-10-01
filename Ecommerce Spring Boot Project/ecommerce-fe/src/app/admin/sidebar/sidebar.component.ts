import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {CategoryDto} from '../../dto/response/category-dto';
import {CategoryServiceService} from '../../services/category-service.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgIf,
    RouterLink,
    NgForOf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isClosed = false;
  isSubMenu = false;
  categories: CategoryDto[] = [];

  constructor(
    private categoryService: CategoryServiceService
  ) {}

  clickClosed(): any {
    this.isClosed = !this.isClosed;
  }

  toggleSubMenu(): void {
    this.isSubMenu = !this.isSubMenu;
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories(0,10).subscribe(categories=> {
      this.categories = categories.data.data;
    });
  }
}
