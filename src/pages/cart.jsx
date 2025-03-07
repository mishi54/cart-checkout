import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart,removeFromCart, clearCart } from '../features/cartSlice';

const Cart = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCheckout = (e) => {
    e.preventDefault();
    const { name, email, address } = form;

    if (!name || !email || !address) {
      alert('Please fill out all fields.');
      return;
    }
    alert(`Thank you for your purchase, ${name}!`);
    dispatch(clearCart());
    setForm({ name: '', email: '', address: '' });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span className="text-gray-700">
                  {item.title}
                </span>
                <span className="text-gray-700">
                 Rs{item.price} x Quantity:({item.quantity})
                </span>
                <div className="flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    -
                  </button>
                </div>
               
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-6">Total: Rs{totalAmount.toFixed(2)}</h3>

          <form onSubmit={handleCheckout} className="mt-8 space-y-4">
            <h3 className="text-xl font-bold">Checkout Form</h3>

            {['name', 'email', 'address'].map((field) => (
              <input
                key={field}
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            ))}

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
            >
              Complete Purchase
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Cart;
