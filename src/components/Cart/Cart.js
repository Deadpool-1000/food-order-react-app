import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import cartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const Cart = useContext(cartContext);
  const [orderClicked, setOrderClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const totalAmount = `$${Cart.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    Cart.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    Cart.addItem({ ...item, amount: 1 });
  };

  async function confirmHandler(data) {
    try {
      const final = {
        ...data,
        items: Cart["items"],
        totalAmount: Cart["totalAmount"],
      };
      setIsSubmitting(true);
      console.log(process.env.REACT_APP_ORDER);
      const response = await fetch(process.env.REACT_APP_ORDER, {
        method: "POST",
        body: JSON.stringify(final),
        headers: {
          type: "application/json",
        },
      });
      if (!response.ok) {
        return;
      }
      setIsSubmitting(false);
      setSuccess(true);
      Cart.clear();
    } catch (error) {
      console.log(error + "hi");
      console.log("Problem with server response");
      return;
    }
  }

  const cartitems = (
    <ul className={styles["cart-items"]}>
      {" "}
      {Cart.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const hasItem = Cart.items.length;

  const cartModal = (
    <React.Fragment>
      {cartitems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {orderClicked && (
        <Checkout onClose={props.closeHandler} onConfirm={confirmHandler} />
      )}
      {!orderClicked && (
        <div className={styles.actions}>
          <button
            className={styles["button--alt"]}
            onClick={props.closeHandler}
          >
            Close
          </button>
          {hasItem ? (
            <button
              className={styles.button}
              onClick={() => setOrderClicked(true)}
            >
              Order
            </button>
          ) : null}
        </div>
      )}
    </React.Fragment>
  );

  const isSubmittingModal = <p>Placing your order!</p>;
  const successOrder = (
    <>
      <h2>Your order has been successfully submitted</h2>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.closeHandler}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal closeHandler={props.closeHandler}>
      {!success && !isSubmitting && cartModal}
      {success && !isSubmitting && successOrder}
      {isSubmitting && isSubmittingModal}
    </Modal>
  );
};

export default Cart;
