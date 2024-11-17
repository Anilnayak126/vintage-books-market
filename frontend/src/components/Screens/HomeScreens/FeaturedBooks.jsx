import React from 'react';

const FeaturedBooks = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Featured Vintage Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition duration-300">
            <img src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Book 1" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">Classic Novel 1</h3>
            <p className="text-sm text-gray-400">A timeless piece from the 1800s...</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition duration-300">
            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1798&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Book 1" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">Classic Novel 1</h3>
            <p className="text-sm text-gray-400">A timeless piece from the 1800s...</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition duration-300">
            <img src="https://images.unsplash.com/photo-1588104377412-2cfa3c20674f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Book 1" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">Classic Novel 1</h3>
            <p className="text-sm text-gray-400">A timeless piece from the 1800s...</p>
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
