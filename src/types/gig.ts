export interface GigDoc {
  userId: string;
  title: string;
  description: string;
  category: string;
  // packages: Package[];
  // extras: Extra[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  // TODO: Add the chains that the user want to receive payments (e.g. ETH, Polygon, etc.)
}

interface Package {
  name: string;
  description: string;
  price: number;
  deliveryTime: number;
}

interface Extra {
  name: string;
  description: string;
  price: number;
}
