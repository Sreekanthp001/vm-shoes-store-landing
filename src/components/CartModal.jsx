import { useEffect, useState } from "react";

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const items = JSON.parse(localStorage.getItem('vm_shoes_cart')) || [];
      setCartItems(items);
      // Background scroll avvakunda stop chestunnam
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
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
    /* VentureMond Fix: Z-index 100 ensures cart stays ABOVE the shoe image */
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Background Dim Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Cart Side Panel */}
      <div className="relative w-full max-w-md bg-white h-full p-8 shadow-2xl flex flex-col z-[101]">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold font-palanquin text-black">VentureMond Cart</h2>
          <button 
            onClick={onClose} 
            className="text-4xl text-slate-gray hover:text-coral-red transition-all"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          {cartItems.length === 0 ? (
            <div className="text-center mt-20">
              <p className="text-slate-gray font-montserrat italic">Cart empty ga undi mawa!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border-b pb-4 group">
                  <div className="bg-card bg-center bg-cover rounded-xl p-2 bg-slate-100">
                    <img src={item.imgURL} alt={item.name} width={70} height={70} className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold font-palanquin text-sm leading-tight">{item.name}</h3>
                    <p className="text-coral-red font-montserrat font-bold mt-1">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-6 pt-6 border-t space-y-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-coral-red">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                alert("VentureMond: Shoes Order Success!");
                localStorage.removeItem('vm_shoes_cart');
                onClose();
                window.location.reload();
              }}
              className="w-full bg-coral-red text-white py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all"
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