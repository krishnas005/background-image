
// import { motion } from 'framer-motion';
import Image from 'next/image';
import bg1 from '../Photos/Imgbg.webp'
import bg2 from '../Photos/removed_background.png';
import bg3 from '../Photos/removed_background-removebg-preview (1).jpg';

const Demo = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20" id="Demo">
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl text-center font-extrabold text-black mb-6"
        >
          <span className="text-yellow-400">Try</span> it Out
        </h2>
        <p
          className="text-[14px] sm:text-xl md:text-2xl text-gray-600 text-center mb-12"
        >
          See how easy it is to remove the background from your images.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-12 lg:gap-16 mx-auto max-w-6xl">
          <div className="relative">
            <div
              className="aspect-w-4 aspect-h-3"
            >
              <Image
                src={bg1}
                alt="Demo Image 1"
                className="object-cover rounded-lg"
                width={400}
                height={300}
              />
            </div>
          </div>
          <div className="relative">
            <div
              className="aspect-w-4 aspect-h-3"
            >
              <Image
                src={bg2}
                alt="Demo Image 2"
                className="object-cover rounded-lg"
                width={400}
                height={300}
              />
            </div>
          </div>
          <div className="relative">
            <div
              className="aspect-w-4 aspect-h-3"
            >
              <Image
                src={bg3}
                alt="Demo Image 3"
                className="object-cover rounded-lg"
                width={400}
                height={300}
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
          >
            View More Examples
          </a>
        </div>
      </div>
    </section>
  );
};

export default Demo;

