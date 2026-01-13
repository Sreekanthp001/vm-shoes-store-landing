import { useEffect, useState } from "react";

const CartModal = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const items = JSON.parse(localStorage.getItem('vm_shoes_cart')) || [];
      setCartItems(items);
    }
  }, [isOpen]);

  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
      <div className="w-full max-w-md bg-white h-full p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold font-palanquin">Your VentureMond Cart</h2>
          <button onClick={onClose} className="text-3xl">&times;</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-slate-gray font-montserrat">Cart empty ga undhi mawa!</p>
        ) : (
          <div className="flex flex-col gap-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-4">
                <img src={item.imgURL} alt={item.name} width={70} height={70} className="rounded-lg object-contain bg-card bg-center bg-cover" />
                <div className="flex-1">
                  <h3 className="font-bold font-palanquin">{item.name}</h3>
                  <p className="text-coral-red font-montserrat">{item.price}</p>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => {
                  alert("VentureMond: Order Placed Successfully!");
                  localStorage.removeItem('vm_shoes_cart');
                  onClose();
                  window.location.reload();
                }}
                className="w-full bg-coral-red text-white py-4 rounded-full font-bold hover:bg-red-600 transition"
              >
                Checkout Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;