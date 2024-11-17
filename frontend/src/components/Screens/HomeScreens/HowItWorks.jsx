import React from 'react';
import { SearchIcon, ShoppingCartIcon, CashIcon } from '@heroicons/react/outline'; 

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
         
          <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg">
            <SearchIcon className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Browse</h3>
            <p className="text-gray-400">Explore our curated collection of vintage books.</p>
          </div>
          
          <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg">
            <ShoppingCartIcon className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Sell</h3>
            <p className="text-gray-400">Share your books with others by listing them for sale.</p>
          </div>
        
          <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg">
            <CashIcon className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Buy</h3>
            <p className="text-gray-400">Purchase rare and classic books from trusted sellers.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
