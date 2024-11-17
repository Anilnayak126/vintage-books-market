import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/ShopNow';

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        onError={(e) => console.error("Error loading video:", e)}
      >
        <source
          src="https://videos.pexels.com/video-files/6981526/6981526-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
        
        Your browser does not support the video tag.
      </video>

      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-70">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          Unearth the Legacy of Literature
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-center max-w-3xl">
          Step into a world of timeless classics and rare finds. Buy, sell, or trade vintage books that carry stories through generations. Discover the joy of preserving history and sharing literary treasures.
        </p>
        <Link
          to="/browse"
          
        >
          <div className='mt-8 '>
            <Button/>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
