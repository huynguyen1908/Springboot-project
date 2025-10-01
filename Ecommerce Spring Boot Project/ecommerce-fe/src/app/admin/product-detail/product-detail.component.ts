import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ProductDto} from '../../dto/response/product-dto';
import {ProductServiceService} from '../../services/product-service.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UpdateProductRequest} from '../../dto/request/update-product-request';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import {CategoryServiceService} from '../../services/category-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-product-detail',
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    CarouselModule,
    KeyValuePipe,
    RouterLink
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent {
  product: ProductDto =
  {
    productId: '',
    name: '',
    description: '',
    brand: '',
    price: 0,
    discount: 0,
    skuCode: '',
    quantity: 0,
    imageUrl: {},
    categoryMap: {},
    createdBy: '',
    updatedBy: '',
    createdAt: '',
    updatedAt: '',
    importPrice: 0,
  }
  updateProductRequest: UpdateProductRequest = {
    name: '',
    description: '',
    brand: '',
    price: 0,
    discount: 0,
    skuCode: '',
    categoryId: null,
    quantity: 0,
    updatedDate: '',
    updatedBy: ''
  };
  isSubmitting = false;
  uploadProgress: {file: File, progress: number, isDone:boolean , path: string, name: string}[] = [];
  categories: any = {};
  categoryId: string = '';
  categoryName: string  = '';
  selectedImage : File[] = [];
  removedImageList : string[] = [];
  productImagePaths: { id: string, path: string }[] = [];

  carouselOptions = {
    loop: true,
    nav: true,
    dots: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    autoHeight: true,
  };


  constructor(private productService: ProductServiceService,
              private categoryService: CategoryServiceService,
              private router: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  updateProduct() {
    const productId = this.router.snapshot.paramMap.get('productId');
    if(productId && this.product) {
      this.updateProductRequest.name = this.product.name;
      this.updateProductRequest.description = this.product.description;
      this.updateProductRequest.brand = this.product.brand;
      this.updateProductRequest.price = this.product.price;
      this.updateProductRequest.discount = this.product.discount;
      this.updateProductRequest.skuCode = this.product.skuCode;
      this.updateProductRequest.quantity = this.product.quantity;
      this.updateProductRequest.updatedDate = '';
      this.updateProductRequest.updatedBy = '';
      this.isSubmitting = true;

      this.productService.updateProduct(productId, this.updateProductRequest).subscribe({
        next:(product) => {
          this.product = product;
          if(this.removedImageList.length > 0 ) {
            for (const imageId of this.removedImageList){
              this.productService.deleteProductImage(productId, imageId).subscribe({})
            }
          }
          if (this.selectedImage.length > 0) {
            const files = new FormData();
            this.selectedImage.forEach(file => files.append('files', file));
            this.productService.uploadProductImage(productId, files).subscribe();
          }

          if (this.updateProductRequest.categoryId) {
            this.categoryService.addProductToCategory(this.updateProductRequest.categoryId, productId).subscribe({});
          }
          this.isSubmitting = false;
          console.log('Product details fetched successfully:', this.product);
          this.snackBar.open('Product updated successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
          // window.location.reload();
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open('Error updating product', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
          console.error('Error updating product:', error);
        }
      });
    }
  }

  ngOnInit(){
    const productId = this.router.snapshot.paramMap.get('productId');
    if(productId){
      this.productService.getProductById(productId).subscribe({
        next: (product: ProductDto) => {
          this.product = product;
          this.productImagePaths = Object.entries(product.imageUrl).map(([id, path]) => ({
            id: id,
            path: path as string
          }));
          if (this.product?.categoryMap) {
            const entries = Object.entries(this.product.categoryMap);
            if (entries.length > 0) {
              this.categoryId = entries[0][0];
              this.categoryName = entries[0][1];
            }
          }
        },
        error: (error) => {
          // this.snackBar.open('Error fetching product details:', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
          console.error('Error fetching product details:', error);
        }
      });
    }

    this.categoryService.getCategoryIdAndCategoryName().subscribe({
      next: (res) => {
        if (res.code === 1000) {
          this.categories = res.data;
        }
      },
        error: (err) => {
        console.error(err);
      }
    });
  }

  onFileSelected(event: any) {
    this.handleFileUpload(event.target.files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.handleFileUpload(event.dataTransfer.files);
    }
  }

  handleFileUpload(listFile: FileList) {
    const files = Array.from(listFile);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e:any) => {

        this.uploadProgress.push({
          file: file,
          progress: 0,
          isDone: false,
          path: e.target.result,
          name: file.name
        });

        this.selectedImage.push(file);

        let interval = setInterval(() => {
          let item = this.uploadProgress.find(f => f.file === file)
          if (item) {
            item.progress += 10;
            if (item.progress >= 100) {
              item.isDone = true;
              clearInterval(interval);
            }
          }
        }, 200);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    this.uploadProgress.splice(index, 1);
  }

  removeExistingImage(imageId: string, index: number) {
    this.removedImageList.push(imageId);
    this.productImagePaths.splice(index, 1);
  }

}
