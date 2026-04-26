import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
    return (
        <div className="glass-page-center text-white">
            <div className="glass-panel max-w-md p-8 text-center">
                <span className="eyebrow mx-auto mb-4">Payment issue</span>
                <h1 className="section-title text-3xl">Payment Failed</h1>
                <p className="muted-copy mt-4">Something went wrong with your payment. Please try again.</p>
                <Link to="/cart" className="glass-button mt-6 px-5 py-3 font-bold no-underline">Go back to Cart</Link>
            </div>
        </div>
    );
};

export default PaymentFailed;
