import { Component } from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';
import {AdminHeaderComponent} from './admin-header/admin-header.component';

@Component({
  selector: 'app-admin',
  imports: [
    SidebarComponent,
    RouterOutlet,
    AdminHeaderComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
