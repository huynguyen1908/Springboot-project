export interface CategoryDto {
  categoryId: string;
  name: string | null;
  description: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  productId: string[] | [];
}
