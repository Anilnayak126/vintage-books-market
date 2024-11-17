import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-yellow-500 text-black text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Start Your Book Journey Today</h2>
        <p className="text-lg mb-6">Join the Vintage Book Market and explore the world of rare finds.</p>
        <Link
          to="/browse"
          className="px-6 py-3 bg-black text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition duration-300"
        >
          Browse the Collection
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
