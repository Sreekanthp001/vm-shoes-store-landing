import { useEffect, useState } from "react";

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const items = JSON.parse(localStorage.getItem('vm_shoes_cart')) || [];
      setCartItems(items);
    }
  }, [isOpen]);

  const total = cartItems.reduce((acc, item) => {
    const price = typeof item.price === 'string' 
      ? parseFloat(item.price.replace('$', '')) 
      : item.price;
    return acc + price;
  }, 0);

  if (!isOpen) return null;

  return (
    // VentureMond Fix: High Z-index to prevent image overlap
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      {/* Side Panel */}
      <div className="relative w-full max-w-md bg-white h-full p-8 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold font-palanquin text-black">Your VentureMond Cart</h2>
          <button onClick={onClose} className="text-3xl text-slate-gray hover:text-black">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-slate-gray font-montserrat text-center mt-10">Cart empty ga undhi mawa!</p>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border-b pb-4">
                  <img src={item.imgURL} alt={item.name} width={80} height={80} className="rounded-lg object-contain bg-slate-100 p-2" />
                  <div className="flex-1">
                    <h3 className="font-bold font-palanquin text-sm">{item.name}</h3>
                    <p className="text-coral-red font-montserrat font-semibold">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total:</span>
              <span className="text-coral-red">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                alert("VentureMond: Shoes Order Placed Successfully!");
                localStorage.removeItem('vm_shoes_cart');
                onClose();
                window.location.reload();
              }}
              className="w-full bg-coral-red text-white py-4 rounded-full font-bold hover:bg-black transition duration-300 shadow-lg"
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;