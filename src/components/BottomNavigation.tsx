import { Home, Search, ShoppingCart, User, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const BottomNavigation = () => {
  const { totalItems } = useCart();
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        <Link to="/" className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary/20 transition-colors">
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Link>

        <Link to="/search" className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary/20 transition-colors">
          <Search className="h-5 w-5" />
          <span className="text-xs">Search</span>
        </Link>

        <div className="flex flex-col items-center gap-1 p-2 relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="text-xs">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              {totalItems}
            </span>
          )}
        </div>

        {user && (
          <Link to="/orders" className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary/20 transition-colors">
            <Package className="h-5 w-5" />
            <span className="text-xs">Orders</span>
          </Link>
        )}

        <Link to="/auth" className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-secondary/20 transition-colors">
          <User className="h-5 w-5" />
          <span className="text-xs">{user ? 'Profile' : 'Login'}</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;