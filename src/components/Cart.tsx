import { Button } from "./ui/button";
import { X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

export function Cart() {
  const { isOpen, toggleCart, items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    setShowCustomerForm(true);
  };

  const handleBackToCart = () => {
    setShowCustomerForm(false);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      alert('Please fill in all required fields');
      return;
    }

    // WhatsApp number with country code (no + or 0)
    const phoneNumber = "919211549170";
    
    // Format the order details with proper spacing
    const orderDetails = items.map(item => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity;
      return `*${item.name}*\n` +
             `Quantity: ${item.quantity}\n` +
             `Price: ${item.price} × ${item.quantity} = ₹${price.toFixed(2)}`;
    }).join("\n\n");
    
    // Format the message with proper line breaks and encoding
    const message = [
      '*🌿 NEW PLANT ORDER 🌿*',
      '',
      '*ORDER DETAILS*',
      '════════════════════',
      orderDetails,
      '',
      `*TOTAL: ${totalPrice}*`,
      '',
      '*CUSTOMER INFORMATION*',
      '════════════════════',
      `👤 *Name:* ${customerDetails.name}`,
      `📱 *Phone:* ${customerDetails.phone}`,
      `🏠 *Address:* ${customerDetails.address}`,
      '',
      '*NOTES*',
      '════════════════════',
      customerDetails.notes || 'No special instructions'
    ].join('\n');
    
    // Encode the message for URL and replace spaces with %20
    const encodedMessage = message
      .split('\n')
      .map(line => encodeURIComponent(line.trim()))
      .join('%0A')
      .replace(/%20/g, ' ');
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    
    // Reset form and close cart after successful submission
    setShowCustomerForm(false);
    setCustomerDetails({
      name: '',
      phone: '',
      address: '',
      notes: ''
    });
    toggleCart();
  };

  return (
    <>
      <button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-lg z-50 hover:bg-primary/90 transition-colors"
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleCart}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed top-0 right-0 w-full max-w-md h-full bg-white z-50 shadow-xl flex flex-col"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button onClick={toggleCart} className="p-1 hover:bg-gray-100 rounded">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart size={48} className="mx-auto mb-4 text-gray-200" />
                    <p>Your cart is empty</p>
                  </div>
                ) : showCustomerForm ? (
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={customerDetails.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={customerDetails.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Shipping Address *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={customerDetails.address}
                        onChange={handleInputChange}
                        placeholder="Full address with pincode"
                        rows={3}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={customerDetails.notes}
                        onChange={handleInputChange}
                        placeholder="Any special instructions or notes for your order"
                        rows={2}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBackToCart}
                        className="flex-1"
                      >
                        Back to Cart
                      </Button>
                      <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                        Complete Order on WhatsApp
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <ul className="space-y-4">
                      {items.map((item) => (
                        <li key={item.id} className="flex justify-between items-center border-b pb-4">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 flex items-center justify-center border rounded"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border rounded"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="border-t mt-4 pt-4">
                      <div className="flex justify-between font-bold mb-4">
                        <span>Total</span>
                        <span>{totalPrice}</span>
                      </div>
                      <Button
                        onClick={handleProceedToCheckout}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
