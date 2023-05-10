export default interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  quantity: number;
  imageUrl: string;
  product_images?: [url: { url: String }];
  moneyType: string;
}
