import { useEffect, useState } from "react";
import { hamburger } from "../assets/icons";
import { headerLogo } from "../assets/images";
import { navLinks } from "../constants";
import CartModal from "./CartModal"; // Modal import cheyali

const Nav = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem('vm_shoes_cart')) || [];
    setCartCount(cart.length);
  };

  useEffect(() => {
    updateCount();
    // VentureMond Fix: Custom storage event listener
    window.addEventListener("storage", updateCount);
    window.addEventListener("cartUpdated", updateCount); 
    
    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  return (
    <header className='padding-x py-8 absolute z-10 w-full'>
      <nav className='flex justify-between items-center max-container'>
        <a href='/'>
          <img src={headerLogo} alt='logo' width={129} height={29} className='m-0 w-[129px] h-[29px]' />
        </a>
        
        <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
          {navLinks.map((item) => (
            <li key={item.label}>
              <a href={item.href} className='font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition'>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className='flex gap-4 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24 items-center'>
          {/* Cart Trigger Button */}
          <div 
            className="relative cursor-pointer group flex items-center gap-2"
            onClick={() => setIsCartOpen(true)}
          >
            <span className="text-slate-gray group-hover:text-coral-red transition">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-4 bg-coral-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
          
          <span className="text-slate-gray">/</span>
          <a href='/' className="hover:text-coral-red transition">Sign in</a>
        </div>

        <div className='hidden max-lg:block cursor-pointer'>
          <img src={hamburger} alt='hamburger icon' width={25} height={25} />
        </div>
      </nav>

      {/* Slide-out Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Nav;