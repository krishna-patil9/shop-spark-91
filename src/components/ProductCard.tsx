import { Star, ShoppingCart, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    discount?: number;
    badge?: string;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    // In a real app, this would redirect to checkout
    console.log('Redirecting to checkout...');
  };

  return (
    <Card className="product-card group cursor-pointer">
      <CardContent className="p-4">
        {/* Product Image */}
        <div className="relative mb-3 overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badge && (
              <Badge className="bg-success text-success-foreground text-xs">
                {product.badge}
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-accent text-accent-foreground text-xs font-semibold">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          {/* Wishlist button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.category}
          </p>
          
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 ${
                    star <= product.rating
                      ? 'fill-warning text-warning'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="flex-1"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button 
            className="flex-1 bg-gradient-primary hover:opacity-90"
            size="sm"
            onClick={handleBuyNow}
          >
            <Zap className="h-4 w-4 mr-2" />
            Buy Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;