import {OrderDetailDto} from './order-detail-dto';

export interface OrderDto {
  orderId: string;
  userId: string;
  username: string;
  status: string;
  orderDate: string;
  shippingMethod: string;
  paymentMethod: string;
  address: string;
  shippedAt: string | null;
  totalAmount: number;
  createdAt: string;
  orderDetailList: OrderDetailDto[];
}
