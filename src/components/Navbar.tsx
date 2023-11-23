'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserAuth, userAuth } from '../context/AuthContext';
import { FaRegUserCircle } from "react-icons/fa";

const links = [
  { to: '/', text: 'BGSTYLE', className: "mr-4 text-[16px] cursor-pointer hover:text-yellow-300 text-blue-600 font-extrabold text-xl " },
  { to: '#howToUse', text: 'How to Use', className: "mr-4 text-[16px] hover:text-yellow-300 cursor-pointer hidden sm:inline-block md:inline-block lg:inline-block" },
  { to: '#Demo', text: 'Demo', className: "mr-4 text-[16px] cursor-pointer hover:text-yellow-300 hidden sm:inline-block md:inline-block lg:inline-block" },
  { to: '#GetStarted', text: 'Get Started', className: "mr-4 text-[16px] hover:text-yellow-300 cursor-pointer hidden sm:inline-block md:inline-block lg:inline-block" },
];

const Navbar = () => {

  const {user,googleSignIn, logout} = UserAuth();

  const path = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleSignIN = async () => {
    try {
      await googleSignIn();
    } catch(error) {
      console.log(error)
    }
  }

  const handleSignOut = async () => {
    try {
      await logout();
    } catch(error) {
      console.log(error)
    }
  }

  const [showDropdown, setShowDropdown] = useState(false);

  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-8 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <ul className="flex items-center gap-8 py-4">
            {links.map((l, index) => (
              <li key={index}>
                <a href={l.to} className={l.className}>
                  {l.text}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            {/* <a href="/signup" className="text-[16px] cursor-pointer hover:text-yellow-300">Register</a> */}
            {/* <a href="/login" className={`${path === '/login' || path === '/signup' ? 'hidden' : 'text-[16px] cursor-pointer px-4 py-2 border-2 border-yellow-400 rounded-lg hover:text-yellow-600'}`}>Login</a> */}

            <>
            {!user ? (
        <button onClick={handleSignIN} className={`${path === '/login' || path === '/signup' ? 'hidden' : 'text-[16px] cursor-pointer px-4 py-2 border-2 border-yellow-400 rounded-lg hover:text-yellow-600'}`}>Login</button>
      ) : (
        <div className="relative">
          <FaRegUserCircle size='30px' onClick={handleIconClick} className="cursor-pointer" />
          {showDropdown && (
            <div className="absolute top-10 -right-5 bg-white border border-gray-300 rounded shadow">
              <button onClick={handleSignOut} className="text-[16px] cursor-pointer  w-[98px] bg-gray-100 p-2">Sign Out</button>
            </div>
          )}
        </div>
      )}
            </>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
