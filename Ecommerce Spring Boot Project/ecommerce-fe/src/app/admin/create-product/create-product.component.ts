import {Component, ViewChild} from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';
import createPlugin from 'tailwindcss/plugin';
import {ProductServiceService} from '../../services/product-service.service';
import {CreateProductRequest} from '../../dto/request/create-product-request';
import {FormsModule} from '@angular/forms';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {CategoryServiceService} from '../../services/category-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-product',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    RouterLink,
    KeyValuePipe
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  request: CreateProductRequest = {
    name: '',
    description: '',
    brand: '',
    price: null,
    discount: null,
    categoryId: '',
    skuCode: '',
    quantity: null,
    files: [],
  };

  categories: any = {};
  categoryName: string  = '';
  selectedImage : File[] = [];
  uploadProgress: {file: File, progress: number, isDone:boolean , path: string, name: string}[] = [];
  isSubmitting = false;
  constructor(
    private productService: ProductServiceService,
    private categoryService: CategoryServiceService,
    private snackBar: MatSnackBar
  ) {}

  createProduct() {

    const formData = new FormData();

    formData.append('name', this.request.name);
    formData.append('description', this.request.description || '');
    formData.append('brand', this.request.brand);
    formData.append('price', (this.request.price ?? 0).toString());
    formData.append('discount', (this.request.discount ?? 0).toString());
    formData.append('skuCode', this.request.skuCode || '');
    formData.append('categoryId', this.request.categoryId || '');
    formData.append('quantity', (this.request.quantity ?? 0).toString());

    if (this.selectedImage && this.selectedImage.length > 0) {
      this.selectedImage.forEach(file => formData.append('files', file));
    }

    this.isSubmitting = true;
    this.productService.createProduct(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.snackBar.open('Product updated successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        console.log(response);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.snackBar.open('Error updating product', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'bottom',});
        console.error('Error creating product:', error);
      }
    });
  }

  ngOnInit() {
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
    // Handle the dropped files
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
            item.progress += 10; // Simulate progress
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

}
