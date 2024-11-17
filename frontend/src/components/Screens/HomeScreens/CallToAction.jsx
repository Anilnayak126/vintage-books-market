import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/RegisterNow";

const CallToAction = () => {
  return (
    <section className="py-16 bg-yellow-500 text-black text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Start Your Book Journey Today
        </h2>
        <p className="text-lg mb-6">
          Join the Vintage Book Market and explore the world of rare finds.
        </p>
        <Link to="/register">
          <div>
            <Button />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
