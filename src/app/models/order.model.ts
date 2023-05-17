enum PaymentStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
  PENDING = 'pending',
  REFUNDED = 'refunded',
}

export default interface Order {
  id?: string;
  userId: string;
  productId: string;
  createdAt?: string;
  isFreeShipping?: boolean;
  paymentStatus?: PaymentStatus;
  quantity: number;
  total?: number;
}
