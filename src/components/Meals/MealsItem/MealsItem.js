import React, { useContext, useRef } from "react";
import styles from './MealsItem.module.css';
import MealsItemForm from "./MealsItemForm";
import CartContext from "../../../store/cart-context";


const MealsItem = props =>{
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;
    const addToCartHandler = enterAmountNumber => {
        cartCtx.addItem({
            id : props.id,
            name : props.name,
            amount : enterAmountNumber,
            price : props.price
        });
    }
    return (
        <li className={styles.meal}>
            <div>
                <h3> {props.name} </h3>
                <div className={styles.description}> {props.description} </div>
                <div className={styles.price}> {price} </div>
            </div>
            <div>
                <MealsItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
}
export default MealsItem;