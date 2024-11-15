// HomePage.jsx
import React, { useEffect } from "react";
import "animate.css";

const HomePage = () => {
  useEffect(() => {
  }, []);

  return (
    <div className="bg-[#2D2D2D] "> {/* Use a dark charcoal for the main background */}
    <section
        className="hero bg-cover bg-center h-screen flex items-center justify-center text-center relative"
        style={{
            backgroundImage:
                'url(https://images.unsplash.com/photo-1506765515386-8b56cd4a1e93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg0OHwwfDF8c2VhY3JhfDJ8c2VhY3J8ZW58MHx8fHwxNjg1ODcwMzc&ixlib=rb-1.2.1&q=80&w=1080)',
        }}
    >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white px-8">
            <h1 className="text-5xl font-bold animate__animated animate__fadeIn animate__delay-1s">
                Find & Sell Vintage Books
            </h1>
            <p className="mt-4 text-lg animate__animated animate__fadeIn animate__delay-2s">
                Discover a world of timeless stories.
            </p>
            <button className="mt-6 bg-[#FF7F32] text-white py-2 px-6 rounded-full text-xl transition-all duration-300 transform hover:scale-105 hover:bg-orange-600 animate__animated animate__fadeIn animate__delay-3s">
                Explore Now
            </button>
        </div>
    </section>

    {/* Book Categories */}
    <section className="categories py-16 px-4 text-center">
        <h2 className="text-4xl font-semibold mb-8 text-[#F4F4F4]">Browse by Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {['Fiction', 'Non-Fiction', 'Mystery', 'Science', 'History'].map((category, index) => (
                <div
                    key={index}
                    className="category p-6 bg-white shadow-md rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                    <img
                        src={`https://source.unsplash.com/1600x900/?${category.toLowerCase()}-books`}
                        alt={category}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-2xl">{category}</h3>
                </div>
            ))}
        </div>
    </section>

    {/* Featured Books */}
    <section className="featured-books py-16 px-4 bg-gray-50">
        <h2 className="text-4xl font-semibold text-center mb-8">Featured Vintage Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((book, index) => (
                <div
                    key={index}
                    className="book p-6 bg-white shadow-md rounded-lg transform hover:scale-105 transition-all duration-300"
                >
                    <img
                        src={`https://source.unsplash.com/1600x900/?book-${book}`}
                        alt={`Book ${book}`}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl">Book Title</h3>
                    <p className="text-gray-600">Author Name</p>
                </div>
            ))}
        </div>
    </section>

    {/* How It Works */}
    <section className="how-it-works py-16 px-4 text-center text-[#F4F4F4]">
        <h2 className="text-4xl font-semibold mb-8">How It Works</h2>
        <div className="flex justify-center space-x-16">
            <div className="step">
                <div className="icon text-4xl">📚</div>
                <h3 className="text-xl font-medium">Buy Books</h3>
                <p className="mt-2">Browse the collection of vintage books and make your purchase.</p>
            </div>
            <div className="step">
                <div className="icon text-4xl">🛒</div>
                <h3 className="text-xl font-medium">Sell Books</h3>
                <p className="mt-2">List your vintage books for sale and connect with buyers.</p>
            </div>
            <div className="step">
                <div className="icon text-4xl">🔍</div>
                <h3 className="text-xl font-medium">Search & Discover</h3>
                <p className="mt-2">Use filters to find books that match your interests.</p>
            </div>
        </div>
    </section>

    {/* Call to Action */}
    <section className="cta bg-[#FF7F32] py-16 text-center text-white">
        <h2 className="text-3xl font-semibold mb-4">Start Your Vintage Book Journey Today!</h2>
        <button className="bg-white text-[#FF7F32] py-3 px-6 rounded-full text-lg mt-4 hover:bg-gray-100 transition-all duration-300">
            Join Now
        </button>
    </section>
</div>

   
  )

}

export default HomePage;
