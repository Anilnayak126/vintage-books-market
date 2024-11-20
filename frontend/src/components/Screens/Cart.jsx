import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { fetchCartItems, removeFromCart } from '../../redux/cartSlice';

// Product Component
const ProductItem = ({ item, onRemove }) => {
    const { bookdetails, quantity } = item;
    const { id, title, author, price, image, user } = bookdetails;

    return (
        <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md mb-4">
            <img
                src={image ? `http://localhost:8000/manage_p${image}` : '/placeholder.png'}
                alt={title}
                className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1 mx-4">
                <h2 className="text-sm font-bold text-white">{title}</h2>
                <p className="text-gray-300 text-sm">Author: {author}</p>
                <p className="text-gray-300 text-sm font-semibold">Price: ₹{price}</p>
                <p className="text-gray-400 text-xs">Seller: {user?.first_name} {user?.last_name}</p>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-gray-200 font-semibold">Qty: {quantity}</span>
                <button
                    onClick={() => onRemove(id)}
                    className="text-red-400 hover:text-red-500"
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
        <div className="bg-gray-700 p-4 rounded-lg shadow-md mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Billing Summary</h2>
            <div className="space-y-2">
                {items.map(({ bookdetails, quantity }) => (
                    <div key={bookdetails.id} className="flex justify-between">
                        <span className="text-gray-300">{bookdetails.title}</span>
                        <span className="text-gray-200">₹{(bookdetails.price * quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <hr className="my-4 border-gray-500" />
            <div className="flex justify-between text-lg font-bold text-gray-200">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
            </div>
        </div>
    );
};

// Main Cart Component
const Cart = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.cart);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCartItems());
        }
    }, [dispatch, status]);

    const handleRemove = (bookId) => {
        dispatch(removeFromCart(bookId));
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen ">
            <h1 className="text-3xl font-bold text-center mb-8 text-white">Your Shopping Cart</h1>

            {status === 'loading' && items.length === 0 && (
                <p className="text-center text-gray-300">Loading your cart items...</p>
            )}
            {error && <p className="text-center text-red-400">Error: {error}</p>}
            {items.length === 0 && status === 'succeeded' && (
                <p className="text-center text-gray-300">Your cart is empty.</p>
            )}

            {items.length > 0 && (
                <div>
                    <div className="flex flex-col space-y-4">
                        {items.map((item) => (
                            <ProductItem key={item.bookdetails.id} item={item} onRemove={handleRemove} />
                        ))}
                    </div>
                    <BillingSummary items={items} />
                </div>
            )}
        </div>
    );
};

export default Cart;
