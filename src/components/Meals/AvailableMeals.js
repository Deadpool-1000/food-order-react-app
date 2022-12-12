import React, { useEffect, useState, useCallback } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealsItem from "./MealsItem/MealsItem";

const AvailableMeals = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [Meals, setMeals] = useState([]);

  const fetchMeals = useCallback(async () => {
    try {
      const response = await fetch(process.env.REACT_APP_MEALS);
      if (!response.ok) {
        throw new Error("Failed");
      }
      const data = await response.json();
      setMeals(data);
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchMeals();
    setIsLoading(false);
  }, [fetchMeals]);
  let content = <p>Loading...</p>;
  if (!isLoading && Meals && Meals.length > 0) {
    content = Meals.map((meal) => (
      <MealsItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        price={meal.price}
        description={meal.description}
      />
    ));
  }
  if (error) {
    content = <p>There was an error please try again later</p>;
  }
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
