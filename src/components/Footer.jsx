'use client'

import { FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Footer = () => {

  const router = useRouter();

  const scrollToSection = (id) => {

    const element = document.getElementById(id.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#f6f6f6] text-gray-800 px-4 py-6 md:px-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 " >
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">About Us</h3>
            <p className="text-gray-600">
              We are a cutting-edge background remover web application that allows you to easily remove backgrounds from your images. Try it out now!
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Contact Us</h3>
            <ul className="text-gray-600">
              <li>Email: krishnakannu05@gmail.com</li>
              <li>Phone: 123-456-7890</li>
              <li>Address: 123 Main St, City, State, ZIP</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Links</h3>
            <ul className="flex flex-col text-gray-600">
              <li>
                <div>
                  <a onClick={() => scrollToSection('#howToUse')} className="mr-4 text-[16px] cursor-pointer" >How to Use</a>
                </div>
              </li>
              <li>
                <div>
                  <a onClick={() => scrollToSection('#Demo')} className="mr-4 text-[16px] cursor-pointer" >Demo</a>
                </div>
              </li>
              <li>
                <div>
                  <a onClick={() => scrollToSection('#GetStarted')} className="mr-4 text-[16px] cursor-pointer" >Get Started</a>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/krishnas05/" className="text-gray-400 hover:text-gray-900 transition-colors duration-300" >
                <FaInstagram />
              </a>
              <a href="https://github.com/krishnas005" className="text-gray-400 hover:text-gray-900 transition-colors duration-300" >
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/krishna-sharma-8665a024b" className="text-gray-400 hover:text-gray-900 transition-colors duration-300" >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <hr className="border-gray-800 my-8" />
        <p className="text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
