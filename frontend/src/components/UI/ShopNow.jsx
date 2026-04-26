import React from 'react';

const Button = () => {
  return (
    <button className="glass-button px-6 py-3 text-base font-extrabold">
      <span>Explore Now</span>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" aria-hidden="true">
        <path
          fill="currentColor"
          d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
        />
      </svg>
    </button>
  );
}

export default Button;
