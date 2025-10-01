import { Component } from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {HeaderComponent} from '../../header/header.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ProductDto} from '../../dto/response/product-dto';
import {ProductServiceService} from '../../services/product-service.service';
import {CommonModule, CurrencyPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [
    RouterLink,
    NgForOf,
    CurrencyPipe,
    CommonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: ProductDto[] = [];
  productImages: Map<string, string[]> = new Map();

  constructor(
    private productService: ProductServiceService,
    private routerActive: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService.getAllProducts(100, 0).subscribe(response => {
      this.products = response.data.data;
      this.products.forEach(product => {
        const urls = Object.values(product.imageUrl) as string[];
        this.productImages.set(product.productId, urls);
      });
    });
  }

  getImage(productId: string): string[] {
    return this.productImages.get(productId) || [];
  }

}
