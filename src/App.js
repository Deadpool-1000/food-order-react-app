import React,{ useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from './components/Layout/Header';
import Meals from "./components/Meals/Meals";
import CartProvider from './store/CartProvider';


function App() {
  const [ cartOpen, setCartOpen ] = useState(0);
  return (
    <CartProvider>
        {cartOpen && <Cart closeHandler={() => setCartOpen(0) }/>}
      <Header clickHandler={() => setCartOpen(1)}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
