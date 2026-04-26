import React from 'react';

const Testimonials = () => {
  return (
    <section className="section-band section-band-soft text-white">
      <div className="page-container text-center">
        <span className="eyebrow mx-auto mb-4">Reader notes</span>
        <h2 className="section-title text-3xl sm:text-4xl">What collectors say</h2>
        <div className="mt-10 flex flex-wrap justify-center">
          <article className="glass-card max-w-xl p-8 text-left">
            <p className="text-xl text-white">
              "A fantastic place to find rare and vintage books. Every visit feels like discovering a quiet corner of an old library."
            </p>
            <h4 className="mt-6 text-lg font-bold">Anil Nayak</h4>
            <p className="muted-copy">Book Collector</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
