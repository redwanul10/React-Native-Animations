import React, {useContext, useState} from 'react';
const CartContext = React.createContext();

export const useCartStore = () => {
  return useContext(CartContext);
};

export default function CartProvider(props) {
  const [items, setItems] = useState([]);

  const addToCart = item => {
    const index = items.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) return;
    setItems([item, ...items]);
  };

  return (
    <CartContext.Provider
      value={{
        cartList: items,
        addToCart,
      }}>
      {props.children}
    </CartContext.Provider>
  );
}
