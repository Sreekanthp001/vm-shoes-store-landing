import { useEffect, useState } from "react";

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const items = JSON.parse(localStorage.getItem('vm_shoes_cart')) || [];
      setCartItems(items);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    /* Force high z-index and fixed position */
    <div className="fixed inset-0 flex justify-end" style={{ zIndex: 9999 }}>
      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
        style={{ zIndex: 10000 }}
      ></div>
      
      {/* Side Panel */}
      <div 
        className="relative w-full max-w-md bg-white h-full p-8 shadow-2xl flex flex-col" 
        style={{ zIndex: 10001 }}
      >
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold font-palanquin">VentureMond Cart</h2>
          <button onClick={onClose} className="text-4xl text-slate-gray">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center mt-10">Empty mawa!</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-4 mb-4">
                <img src={item.imgURL} alt={item.name} width={60} className="object-contain" />
                <div>
                  <h3 className="font-bold text-sm">{item.name}</h3>
                  <p className="text-coral-red font-bold">{item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <button 
          onClick={() => {
            alert("VentureMond: Order Placed!");
            localStorage.removeItem('vm_shoes_cart');
            onClose();
            window.location.reload();
          }}
          className="w-full bg-coral-red text-white py-4 rounded-full font-bold mt-6"
        >
          Checkout Now
        </button>
      </div>
    </div>
  );
};

export default CartModal;