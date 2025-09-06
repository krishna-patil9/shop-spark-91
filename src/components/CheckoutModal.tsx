import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/hooks/useProducts';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  quantity: number;
  onPurchaseComplete: () => void;
}

interface ShippingDetails {
  name: string;
  address: string;
  pincode: string;
  phone: string;
}

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  product, 
  quantity, 
  onPurchaseComplete 
}: CheckoutModalProps) {
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    name: '',
    address: '',
    pincode: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof ShippingDetails, value: string) => {
    setShippingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePurchase = async () => {
    // Validate form
    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.pincode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (shippingDetails.pincode.length !== 6) {
      toast({
        title: "Invalid Pincode",
        description: "Please enter a valid 6-digit pincode",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Process the purchase
      onPurchaseComplete();
      
      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your order for ${quantity} ${product.name}(s) will be delivered to your address`,
      });

      onClose();
      
      // Reset form
      setShippingDetails({
        name: '',
        address: '',
        pincode: '',
        phone: ''
      });
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const totalAmount = (product.current_price || product.price) * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-secondary/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">{product.name} × {quantity}</span>
              <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span className="text-primary">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping Details Form */}
          <div className="space-y-4">
            <h3 className="font-semibold">Shipping Details</h3>
            
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={shippingDetails.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={shippingDetails.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your complete address"
              />
            </div>

            <div>
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                value={shippingDetails.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                placeholder="Enter 6-digit pincode"
                maxLength={6}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={shippingDetails.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePurchase}
              className="flex-1"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}