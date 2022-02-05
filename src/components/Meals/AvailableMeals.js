import { useEffect, useState, useContext } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { MealInfoContext } from "../../App";

const AvailableMeals = ({ showMealOverlayHandler }) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const { setMealList } = useContext(MealInfoContext);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://civil-clarity-314704-default-rtdb.firebaseio.com//meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          Url: responseData[key].Url,
          content: responseData[key].content,
        });
      }

      setMeals(loadedMeals);
      setMealList(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [setMealList]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      showMealOverlayHandler={showMealOverlayHandler}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <div>{mealsList}</div>
      </Card>
    </section>
  );
};

export default AvailableMeals;
