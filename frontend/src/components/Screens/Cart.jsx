import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import {
    fetchCartItems,
    removeFromCart,
    processPayment,
    clearPaymentStatus,
} from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { mediaUrl } from '../../config/api';

// Product Component
const ProductItem = ({ item, onRemove }) => {
    const { bookdetails, quantity } = item;
    const { id, title, author, price, image, user } = bookdetails;

    return (
        <div className="glass-list-item mb-4 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <img
                src={image ? mediaUrl('/manage_p', image) : '/placeholder.png'}
                alt={title}
                className="h-20 w-20 object-cover"
            />
            <div className="flex-1">
                <h2 className="text-sm font-bold text-white">{title}</h2>
                <p className="muted-copy text-sm">Author: {author}</p>
                <p className="text-sm font-semibold text-white">Price: ${price}</p>
                <p className="muted-copy text-xs">Seller: {user?.first_name} {user?.last_name}</p>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-gray-200 font-semibold">Qty: {quantity}</span>
                <button
                    onClick={() => onRemove(id)}
                    className="danger-button p-3"
                    aria-label={`Remove ${title}`}
                >
                    <BsTrash size={20} />
                </button>
            </div>
        </div>
    );
};

// Billing Summary Component
const BillingSummary = ({ items }) => {
    const totalPrice = items.reduce((total, item) => {
        return total + parseFloat(item.bookdetails.price || 0) * (item.quantity || 1);
    }, 0);

    return (
        <div className="glass-panel mt-8 p-5">
            <h2 className="text-xl font-bold text-white mb-4">Billing Summary</h2>
            <div className="space-y-2">
                {items.map(({ bookdetails, quantity }) => (
                    <div key={bookdetails.id} className="flex justify-between">
                        <span className="muted-copy">{bookdetails.title}</span>
                        <span className="text-gray-200">${(bookdetails.price * quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <hr className="my-4 border-gray-500" />
            <div className="flex justify-between text-lg font-bold text-gray-200">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
        </div>
    );
};

// Main Cart Component
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, status, error, paymentStatus, paymentUrl } = useSelector((state) => state.cart);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCartItems());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (paymentStatus === 'redirect' && paymentUrl) {

            window.location.href = paymentUrl;
        } else if (paymentStatus === 'failed') {

            navigate('/payment-failed');
        } else if (paymentStatus === 'succeeded') {

            navigate('/payment-success');
        }


        return () => {
            dispatch(clearPaymentStatus());
        };
    }, [paymentStatus, paymentUrl, navigate, dispatch]);

    const handleRemove = (bookId) => {
        dispatch(removeFromCart(bookId));


    };

    const handleCheckout = () => {
        dispatch(processPayment({ paymentMethod: 'PayPal' }));
    };

    return (
        <div className="glass-page">
            <div className="page-container">
                <h1 className="section-title mb-8 text-center text-3xl">Your Shopping Cart</h1>

                {status === 'loading' && items.length === 0 && (
                    <p className="status-panel text-center muted-copy">Loading your cart items...</p>
                )}
                {error && <p className="status-panel text-center text-[color:var(--rose)]">{error}</p>}

                {items.length === 0 && status === 'succeeded' && (
                    <p className="status-panel text-center muted-copy">Your cart is empty.</p>
                )}

                {items.map((item) => (
                    <ProductItem
                        key={item.bookdetails.id}
                        item={item}
                        onRemove={handleRemove}
                    />
                ))}

                {items.length > 0 && (
                    <div className="mt-8">
                        <BillingSummary items={items} />
                        <button
                            onClick={handleCheckout}
                            className="mt-5 w-full px-6 py-3 font-bold"
                        >
                            Checkout with PayPal
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
