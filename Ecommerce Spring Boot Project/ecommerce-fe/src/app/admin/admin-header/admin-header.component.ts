import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-header',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  isToggleMenu = false;
  isToggleNotifications = false;

  toggleMenu() {
    this.isToggleMenu = !this.isToggleMenu;
  }

  toggleNotifications() {
    this.isToggleNotifications = !this.isToggleNotifications;
  }
}
