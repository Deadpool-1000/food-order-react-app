import React from "react";
// import styles from './Meals.module.css';
import MealsSummary from './MealsSummary';
import AvailableMeals from "./AvailableMeals";


const Meals = props =>{
    return (
        <React.Fragment>
            <MealsSummary />
            <AvailableMeals />
        </React.Fragment>
    );
}
export default Meals;