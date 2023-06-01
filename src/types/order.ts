export interface Order {
  orderId: string;
  buyerId: string;
  sellerId: string;
  gigId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deliveryDeadline: string;
  price: number;
  extras: Extra[];
  quantity: number;
  totalAmount: number;
  paymentStatus: string;
  deliveryStatus: string;
  buyerReview?: Review;
  sellerReview?: Review;
}

interface Extra {
  name: string;
  price: number;
}

interface Review {
  rating: number;
  comment: string;
}
