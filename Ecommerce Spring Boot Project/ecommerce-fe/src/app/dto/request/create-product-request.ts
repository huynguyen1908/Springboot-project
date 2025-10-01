export interface CreateProductRequest {
  name: string;
  description?: string;
  brand: string;
  price:  number | null;
  discount:  number | null;
  skuCode?: string;
  categoryId?: string;
  quantity: number | null;
  files?: File[];
}
