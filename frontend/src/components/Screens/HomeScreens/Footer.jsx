import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/30 py-8 text-white backdrop-blur-xl">
      <div className="page-container px-4 text-center">
        <p className="text-sm sm:text-base">Copyright 2026 Vintage Book Market. All rights reserved.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link to="/privacy" className="text-link">Privacy Policy</Link>
          <Link to="/term&C" className="text-link">Terms of Service</Link>
        </div>
        <div className="mt-4">
          <p className="muted-copy text-sm sm:text-base">
            Developed with care by <span className="font-semibold text-white">Anil Kumar Nayak</span>
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/Anilnayak126"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anil-kumar-nayak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
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
