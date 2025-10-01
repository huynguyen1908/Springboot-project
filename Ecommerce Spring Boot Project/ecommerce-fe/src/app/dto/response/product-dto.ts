export interface ProductDto {
  productId: string;
  name: string;
  description: string;
  imageUrl: { [key: number]: string };
  brand: string;
  importPrice: number;
  price: number;
  discount: number;
  skuCode: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  categoryMap: Record<string, string>;
  quantity: number;
}
