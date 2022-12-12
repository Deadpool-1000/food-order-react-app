import React,{ useRef,useState } from "react";
import styles from './MealsItemForm.module.css';
import Input from '../../UI/Input';


const MealsItemForm = props => {
    const inputRef = useRef();
    const [ formIsInValid, setFormIsInValid ] = useState(false);
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = inputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if ( enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5 ) {
            setFormIsInValid(true);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    }
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input ref={inputRef}
                 label="Amount" input={{
                id :  'amount_' + props.id,
                type : 'number',
                min : '1',
                max : '5',
                step : '1',
                defaultValue : '1'
            }} />
            <button>+ Add</button>
            {formIsInValid && <p>Please Enter a valid amount! </p>}
        </form>
    )
}

export default MealsItemForm;