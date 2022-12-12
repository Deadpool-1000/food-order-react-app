import React from "react";
import styles from './header.module.css';
import MealsImage from '../../assets/meals.jpg'
import HeaderCartButton from "./HeaderCartButton";

const Header = props =>{
    return (
        <React.Fragment>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton clickHandler={props.clickHandler}/>
            </header>
            <div className={styles['main-image']}>
                <img src={MealsImage} alt='Table full of food'/>
            </div>
        </React.Fragment>

    );
}


export default Header;