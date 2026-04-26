import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/RegisterNow";

const CallToAction = () => {
  return (
    <section className="section-band text-center text-white">
      <div className="page-container">
        <div className="glass-panel mx-auto max-w-4xl p-8 sm:p-10">
          <span className="eyebrow mx-auto mb-4">Your next shelf starts here</span>
          <h2 className="section-title text-3xl sm:text-4xl">
            Start your book journey today
          </h2>
          <p className="muted-copy mx-auto mt-4 max-w-2xl text-lg">
            Join Vintage Book Market and step into a calmer, richer way to find rare books.
          </p>
          <Link to="/register" className="mt-7 inline-flex no-underline">
            <Button />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
