import { Fragment } from "react";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = ({ showMealOverlayHandler }) => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals showMealOverlayHandler={showMealOverlayHandler} />
    </Fragment>
  );
};

export default Meals;
