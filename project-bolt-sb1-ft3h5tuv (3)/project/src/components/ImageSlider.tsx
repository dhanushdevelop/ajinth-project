import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    title: 'Modern Living Room Sets',
    description: 'Transform your space with our elegant furniture collections'
  },
  {
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
    title: 'Exclusive Designs',
    description: 'Discover unique pieces that make your home special'
  },
  {
    url: 'https://images.unsplash.com/photo-1505693314120-0d443867891c',
    title: 'Quality Craftsmanship',
    description: 'Built to last with premium materials and attention to detail'
  }
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative h-[500px] w-full group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500 relative"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {slides[currentIndex].title}
          </h2>
          <p className="text-xl md:text-2xl text-center max-w-2xl">
            {slides[currentIndex].description}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRight onClick={nextSlide} size={30} />
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => setCurrentIndex(slideIndex)}
              className={`
                transition-all w-3 h-3 rounded-full cursor-pointer
                ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/50'}
              `}
            >
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}