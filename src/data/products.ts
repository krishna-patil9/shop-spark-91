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
  },
  // Fashion Category
  {
    id: 9,
    name: "Nike Air Max 270",
    price: 12999,
    originalPrice: 14999,
    image: phone1, // Using placeholder image
    rating: 4.3,
    reviews: 567,
    category: "Fashion",
    badge: "Popular"
  },
  {
    id: 10,
    name: "Levi's Classic Jeans",
    price: 3999,
    originalPrice: 4999,
    image: headphones1, // Using placeholder image
    rating: 4.4,
    reviews: 890,
    category: "Fashion"
  },
  {
    id: 11,
    name: "Adidas Hoodie",
    price: 2999,
    originalPrice: 3999,
    image: watch1, // Using placeholder image
    rating: 4.2,
    reviews: 456,
    category: "Fashion"
  },
  // Home & Kitchen Category
  {
    id: 12,
    name: "Instant Pot Duo 7-in-1",
    price: 8999,
    originalPrice: 10999,
    image: laptop1, // Using placeholder image
    rating: 4.6,
    reviews: 1200,
    category: "Home",
    badge: "Bestseller"
  },
  {
    id: 13,
    name: "KitchenAid Stand Mixer",
    price: 15999,
    originalPrice: 18999,
    image: phone1, // Using placeholder image
    rating: 4.8,
    reviews: 789,
    category: "Home"
  },
  {
    id: 14,
    name: "Dyson V11 Vacuum Cleaner",
    price: 45999,
    originalPrice: 49999,
    image: headphones1, // Using placeholder image
    rating: 4.7,
    reviews: 654,
    category: "Home"
  },
  // Sports Category
  {
    id: 15,
    name: "Yoga Mat Premium",
    price: 2499,
    originalPrice: 2999,
    image: watch1, // Using placeholder image
    rating: 4.4,
    reviews: 345,
    category: "Sports"
  },
  {
    id: 16,
    name: "Dumbbells Set 20kg",
    price: 4999,
    originalPrice: 5999,
    image: laptop1, // Using placeholder image
    rating: 4.5,
    reviews: 567,
    category: "Sports"
  },
  {
    id: 17,
    name: "Football Nike Official",
    price: 1999,
    originalPrice: 2499,
    image: phone1, // Using placeholder image
    rating: 4.3,
    reviews: 234,
    category: "Sports"
  },
  // Books Category
  {
    id: 18,
    name: "The Psychology of Money",
    price: 399,
    originalPrice: 499,
    image: headphones1, // Using placeholder image
    rating: 4.7,
    reviews: 1100,
    category: "Books",
    badge: "Bestseller"
  },
  {
    id: 19,
    name: "Atomic Habits",
    price: 349,
    originalPrice: 449,
    image: watch1, // Using placeholder image
    rating: 4.8,
    reviews: 2300,
    category: "Books"
  },
  {
    id: 20,
    name: "Rich Dad Poor Dad",
    price: 299,
    originalPrice: 399,
    image: laptop1, // Using placeholder image
    rating: 4.6,
    reviews: 1800,
    category: "Books"
  },
  // Beauty Category
  {
    id: 21,
    name: "Lakme Lipstick Set",
    price: 1299,
    originalPrice: 1599,
    image: phone1, // Using placeholder image
    rating: 4.2,
    reviews: 456,
    category: "Beauty"
  },
  {
    id: 22,
    name: "L'Oreal Face Cream",
    price: 899,
    originalPrice: 1199,
    image: headphones1, // Using placeholder image
    rating: 4.4,
    reviews: 678,
    category: "Beauty"
  },
  {
    id: 23,
    name: "Maybelline Mascara",
    price: 599,
    originalPrice: 799,
    image: watch1, // Using placeholder image
    rating: 4.3,
    reviews: 543,
    category: "Beauty"
  }
];

export const trendingProducts = sampleProducts.slice(0, 4);
export const dealProducts = sampleProducts.filter(p => p.originalPrice && p.originalPrice > p.price);