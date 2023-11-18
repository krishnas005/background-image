'use client';

import { useEffect, useState } from "react";

const links = [
  { to: '/', text: 'BGSTYLE', className: "mr-4 text-[16px] cursor-pointer hover:text-yellow-300 text-blue-600 font-extrabold text-xl ml-14 pl-8" },
  { to: '#howToUse', text: 'How to Use', className: "mr-4 text-[16px] cursor-pointer hidden hover:text-yellow-300 sm:inline-block md:inline-block lg:inline-block" },
  { to: '#Demo', text: 'Demo', className: "mr-4 text-[16px] cursor-pointer hover:text-yellow-300 hidden sm:inline-block md:inline-block lg:inline-block" },
  { to: '#GetStarted', text: 'Get Started', className: "mr-4 text-[16px] cursor-pointer hidden hover:text-yellow-300 sm:inline-block md:inline-block lg:inline-block" }
];

const Navbar = () => {
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-8 sm:px-6 py-3">
        <div>
          <ul className="flex items-center gap-8 justify-center py-4">
            {links.map((l, index) => (
              <li key={index}>
                  <a href={l.to} className={l.className}>
                    {l.text}
                  </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




