import React from 'react';
import { Link } from 'react-router-dom';

const PaymentFailed = () => {
    return (
        <div>
            <h1>Payment Failed</h1>
            <p>Something went wrong with your payment. Please try again.</p>
            <Link to="/cart">Go back to Cart</Link>
        </div>
    );
};

export default PaymentFailed;
