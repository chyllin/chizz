export interface Product {
  id: number;
  name: string;
  price: number; // ✅ number only
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 17 Pro",
    price: 1600,
    description: "Latest Apple flagship smartphone with advanced performance.",
    image: "/images/iphone.jpg",
  },
  {
    id: 2,
    name: "Smart TV 55 inch",
    price: 200,
    description: "Ultra HD Smart TV with streaming capabilities.",
    image: "/images/tv.jpg",
  },
];

export default products;
