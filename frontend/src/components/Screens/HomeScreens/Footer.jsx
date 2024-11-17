import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto text-center">
        <p className="text-sm sm:text-base">© 2024 Vintage Book Market. All Rights Reserved.</p>
        <div className="mt-4">
          <Link to="/privacy" className="text-gray-400 hover:text-white mx-3">Privacy Policy</Link>
          <Link to="/term&C" className="text-gray-400 hover:text-white mx-3">Terms of Service</Link>
        </div>
        <div className="mt-4">
          <p className="text-sm sm:text-base">Developed by ❤️ <span className="font-semibold text-white">Anil Kumar Nayak</span></p>
          <div className="mt-2">
            <a 
              href="https://github.com/Anilnayak126" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white mx-3"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/anil-kumar-nayak" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white mx-3"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
