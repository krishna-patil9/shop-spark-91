import React, { useState } from 'react';
import { X, MapPin, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, totalPrice } = useCart();
  const { createOrder } = useOrders();

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const savedLocation = localStorage.getItem('userLocation');
    const finalAddress = address.trim() || savedLocation || 'No address provided';
    
    createOrder(finalAddress);
    setIsProcessing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Complete Your Order</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="bg-background/50 rounded-lg p-3 space-y-2">
              {items.slice(0, 2).map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {items.length > 2 && (
                <div className="text-sm text-muted-foreground">
                  +{items.length - 2} more items
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Delivery Address
            </h3>
            <Input
              placeholder="Enter your complete delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border-border/50"
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Method
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-primary"
                />
                <span className="text-sm">Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-primary"
                />
                <span className="text-sm">Online Payment</span>
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <Button
            onClick={handlePlaceOrder}
            disabled={!address.trim() || isProcessing}
            className="w-full bg-gradient-primary hover:opacity-90 py-3"
            size="lg"
          >
            {isProcessing ? 'Processing...' : `Place Order - ₹${totalPrice.toFixed(2)}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutModal;