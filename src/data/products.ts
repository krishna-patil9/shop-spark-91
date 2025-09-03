import phone1 from "@/assets/phone-1.jpg";
import headphones1 from "@/assets/headphones-1.jpg";
import watch1 from "@/assets/watch-1.jpg";
import laptop1 from "@/assets/laptop-1.jpg";

export const sampleProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max - 256GB",
    price: 89999,
    originalPrice: 99999,
    image: phone1,
    rating: 4.5,
    reviews: 1250,
    category: "Mobiles",
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 24999,
    originalPrice: 29999,
    image: headphones1,
    rating: 4.7,
    reviews: 890,
    category: "Electronics",
    badge: "New"
  },
  {
    id: 3,
    name: "Apple Watch Series 9 GPS",
    price: 45999,
    originalPrice: 54999,
    image: watch1,
    rating: 4.4,
    reviews: 567,
    category: "Electronics",
    badge: "Limited"
  },
  {
    id: 4,
    name: "MacBook Air M2 - 256GB SSD",
    price: 114999,
    originalPrice: 124999,
    image: laptop1,
    rating: 4.8,
    reviews: 432,
    category: "Electronics",
    badge: "Featured"
  },
  {
    id: 5,
    name: "iPhone 14 - 128GB",
    price: 59999,
    originalPrice: 69999,
    image: phone1,
    rating: 4.3,
    reviews: 980,
    category: "Mobiles"
  },
  {
    id: 6,
    name: "Bose QuietComfort Earbuds",
    price: 18999,
    originalPrice: 22999,
    image: headphones1,
    rating: 4.6,
    reviews: 345,
    category: "Electronics"
  },
  {
    id: 7,
    name: "Samsung Galaxy Watch 6",
    price: 28999,
    originalPrice: 32999,
    image: watch1,
    rating: 4.2,
    reviews: 678,
    category: "Electronics"
  },
  {
    id: 8,
    name: "Dell XPS 13 Laptop",
    price: 89999,
    originalPrice: 99999,
    image: laptop1,
    rating: 4.5,
    reviews: 234,
    category: "Electronics"
  }
];

export const trendingProducts = sampleProducts.slice(0, 4);
export const dealProducts = sampleProducts.filter(p => p.originalPrice && p.originalPrice > p.price);