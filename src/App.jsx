import React from 'react';
import Products from './pages/product';
import Cart from './pages/cart';

const App = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Fake Store</h1>
      <div className="grid grid-cols-2 gap-8">
        <Products />
        <Cart />
      </div>
    </div>
  );
};

export default App;
