export interface UpdateProductRequest {
  name: string;
  description: string;
  // images: File[];
  brand: string;
  price: number;
  discount: number;
  skuCode?: string;
  categoryId?: string | null;
  quantity?: number;
  updatedDate: string;
  updatedBy: string;
}
