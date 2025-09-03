import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-primary font-bold text-lg">
                E
              </div>
            </div>
            <span className="text-xl font-bold text-primary hidden sm:block">EcommercePro</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for products, brands and more..."
                className="pl-4 pr-12 py-2 rounded-lg border-border focus:ring-2 focus:ring-primary/20"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1 bg-gradient-primary hover:opacity-90"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Register
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                0
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-4 pr-12 py-2 rounded-lg"
            />
            <Button size="sm" className="absolute right-1 top-1 bg-gradient-primary">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Categories Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 py-2 border-t border-border">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Electronics</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Fashion</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home & Kitchen</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Sports</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Books</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Beauty</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Mobiles</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;