import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">What Our Customers Say</h2>
        <div className="flex flex-wrap justify-center">
       
          <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg max-w-sm mx-4 mb-8">
            <p className="text-lg text-gray-300">"A fantastic place to find rare and vintage books! Highly recommend."</p>
            <h4 className="mt-4 font-semibold text-lg">Anil Nayak</h4>
            <p className="text-gray-400">Book Collector</p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
