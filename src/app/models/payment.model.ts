export enum PaymentCurrency {
  // US Dollar
  USD = 'USD',
  // Euro
  EUR = 'EUR',
  // British Pound
  GBP = 'GBP',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  PAYPAL = 'paypal',
  BANK = 'bank',
  CARRIER = 'carrier',
  ALTERNATE_PAYMENT = 'alternate_payment',
  PAY_UPON_INVOICE = 'pay_upon_invoice',
}

export enum PaymentIntent {
  sale = 'sale',
  AUTHORIZE = 'authorize',
  ORDER = 'order',
  NONE = 'none',
}

// {
// "id": "",
// "userid": "",
// "total": 19.99,
// "currency": "USD",
// "method": "PAYPAL",
// "intent": "sale",
// "description": "Purchase of XYZ Product"
// }

export interface Payment {
  id: string | null;
  userId: string | null;
  total: number;
  currency: PaymentCurrency;
  method: PaymentMethod;
  intent: PaymentIntent;
  description: string;
}
