import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import {ProductServiceService} from '../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-product-component',
  imports: [HeaderComponent, FooterComponent, NgForOf],
  templateUrl: './product-component.component.html',
  styleUrl: './product-component.component.css'
})
export class ProductComponentComponent {

  product: any;
  images: string[] = [];
  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(product => {
        this.product = product;
        this.productService.getProductImage(this.product.id).subscribe(images => {
          this.product.image = images;
        })
      });
    }
  }

}
