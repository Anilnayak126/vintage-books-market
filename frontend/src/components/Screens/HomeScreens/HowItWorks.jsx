import React from 'react';
import { SearchIcon, ShoppingCartIcon, CashIcon } from '@heroicons/react/outline'; 

const steps = [
  {
    title: 'Browse',
    description: 'Move through curated shelves and find editions with a story already inside them.',
    Icon: SearchIcon,
  },
  {
    title: 'Sell',
    description: 'List the books you are ready to pass on with clear details and beautiful covers.',
    Icon: ShoppingCartIcon,
  },
  {
    title: 'Buy',
    description: 'Bring home rare, classic, and reader-loved books from trusted sellers.',
    Icon: CashIcon,
  },
];

const HowItWorks = () => {
  return (
    <section className="section-band text-white">
      <div className="page-container text-center">
        <span className="eyebrow mx-auto mb-4">Simple flow</span>
        <h2 className="section-title mb-10 text-3xl sm:text-4xl">How it works</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {steps.map(({ title, description, Icon }) => (
            <article key={title} className="glass-card p-6 text-left">
              <Icon className="mb-5 h-12 w-12 text-[color:var(--gold)]" />
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="muted-copy mt-3">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
