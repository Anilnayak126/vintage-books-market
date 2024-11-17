import React from 'react';
import Footer from './HomeScreens/Footer';
import HeroSection from './HomeScreens/HeroSection';
import FeaturedBooks from './HomeScreens/FeaturedBooks';
import HowItWorks from './HomeScreens/HowItWorks';
import Testimonials from './HomeScreens/Testimonials';
import CallToAction from './HomeScreens/CallToAction';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedBooks />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;
