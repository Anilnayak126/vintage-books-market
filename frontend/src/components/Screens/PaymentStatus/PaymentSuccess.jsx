import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div>
            <h1>Payment Successful</h1>
            <p>Your payment has been processed successfully!</p>
            <Link to="/cart">Go back to Cart</Link>
        </div>
    );
};

export default PaymentSuccess;
