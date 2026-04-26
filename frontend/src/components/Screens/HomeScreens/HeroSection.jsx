import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/ShopNow';

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-120px)] overflow-hidden">
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

      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(3,6,4,0.86),rgba(3,6,4,0.62)_46%,rgba(39,9,10,0.62))]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,8,6,0.98),transparent_28%,transparent_76%,rgba(6,8,6,0.76))]" />

      <div className="relative z-10 page-container flex min-h-[calc(100vh-120px)] flex-col justify-center px-4 py-20 text-white">
        <div className="max-w-4xl">
          <span className="eyebrow mb-5">Rare finds. Real readers. New stories.</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black">
            Unearth the legacy of literature.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl muted-copy">
            Buy, sell, and collect vintage books with the kind of atmosphere that makes every shelf feel alive.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link to="/browse" className="w-fit no-underline">
              <Button />
            </Link>
            <Link to="/sell" className="glass-button w-fit px-5 py-3 text-sm font-bold no-underline">
              Sell a Book
            </Link>
          </div>
        </div>

        <div className="mt-14 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {['Collector picks', 'Trusted sellers', 'Curated classics'].map((item) => (
            <div key={item} className="glass-panel px-4 py-3 text-sm font-semibold text-white/90">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-center text-xs font-semibold text-white/70 sm:block">
        <Link to="/browse" className="text-link">
          Browse the shelves
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
