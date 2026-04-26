import React from 'react';

const featuredBooks = [
  {
    title: 'Clothbound Classics',
    description: 'Pressed pages, gilt details, and shelf presence with a little history in every corner.',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1774&auto=format&fit=crop',
  },
  {
    title: 'Reader-Loved Finds',
    description: 'Stories that already traveled through careful hands, ready for the next reader.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1798&auto=format&fit=crop',
  },
  {
    title: 'Rare Shelf Gems',
    description: 'Distinctive editions for collectors who notice paper, print, and provenance.',
    image: 'https://images.unsplash.com/photo-1588104377412-2cfa3c20674f?q=80&w=1770&auto=format&fit=crop',
  },
];

const FeaturedBooks = () => {
  return (
    <section className="section-band section-band-soft text-white">
      <div className="page-container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow mx-auto mb-4">Featured shelves</span>
          <h2 className="section-title text-3xl sm:text-4xl">Vintage books with a collector's glow</h2>
          <p className="muted-copy mt-4">
            Explore editions with texture, character, and the quiet thrill of finding the one that belongs on your shelf.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {featuredBooks.map((book) => (
            <article key={book.title} className="glass-card overflow-hidden p-3">
              <img src={book.image} alt={book.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-white">{book.title}</h3>
                <p className="muted-copy mt-2 text-sm">{book.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
