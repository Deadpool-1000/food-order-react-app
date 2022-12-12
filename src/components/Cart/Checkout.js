import classes from "./Checkout.module.css";
import { useRef, useState } from "react";
const isSixChar = (val) => val.length === 6;
const isEmpty = (val) => val === "";

const Checkout = (props) => {
  const [inputValidity, setInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredStreet = strRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCity = cityRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalIsValid = !isEmpty(enteredPostal) && isSixChar(enteredPostal);
    const cityIsValid = !isEmpty(enteredCity);

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid;

    setInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };
  const nameRef = useRef("");
  const strRef = useRef("");
  const postalRef = useRef("");
  const cityRef = useRef("");

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !inputValidity.name ? classes.invalid : ""
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!inputValidity.name && <p>Name is required</p>}
      </div>
      <div
        className={`${classes.control} ${
          !inputValidity.street ? classes.invalid : ""
        }`}
      >
        <label htmlFor="street">Street</label>
        <input ref={strRef} type="text" id="street" />
        {!inputValidity.street && <p>Street is required</p>}
      </div>
      <div
        className={`${classes.control} ${
          !inputValidity.postal ? classes.invalid : ""
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalRef} type="text" id="postal" />
        {!inputValidity.postal && <p>Postal is required</p>}
      </div>
      <div
        className={`${classes.control} ${
          !inputValidity.city ? classes.invalid : ""
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!inputValidity.city && <p>City is required</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
