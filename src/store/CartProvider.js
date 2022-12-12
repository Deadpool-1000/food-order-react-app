import React, { useReducer } from "react";
import CartContext from "./cart-context";
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingIndex];
    let updatedItems;

    if (existingItem) {
      let updatedItem;
      updatedItem = {
        ...existingItem,
        amount: action.item.amount + existingItem.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "CLEAR") {
    return defaultCartState;
  } else if (action.type === "REMOVE") {
    const index = state.items.findIndex((item) => action.id === item.id);
    const existingItem = state.items[index];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem) {
      if (existingItem.amount === 1) {
        updatedItems = [...state.items];
        updatedItems.splice(index, 1);
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      } else if (existingItem.amount > 1) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[index] = updatedItem;
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }
    } else {
      //why delete no items
    }
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);
  const addItemToCartHandler = (item) => {
    dispatch({
      type: "ADD",
      item,
    });
  };
  const removeItemFromCartHandler = (id) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  };
  const clearCartHandler = () => {
    dispatch({
      type: "CLEAR",
    });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clear: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
