import React, { useContext } from "react";
import { MealInfoContext } from "../../../App";
import Overlay from "../../UI/Overlay";
import "./MealOverlay.css";

const MealOverlay = (props) => {
  const { clickedMeal, mealList } = useContext(MealInfoContext);

  const mealInfo = mealList && mealList.find((meal) => meal.id === clickedMeal);

  const infoShown = mealInfo && (
    <div className="mealOverlay">
      <div className="image">
        <img
          src={mealInfo.Url}
          alt={mealInfo.name}
          height="230px"
          width="inherit"
        ></img>
      </div>
      <div className="content">
        <p>{mealInfo.content}</p>
      </div>
      <div className="button">
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  );

  console.log(mealInfo);

  return (
    <Overlay show={props.show} onClose={props.onClose}>
      {infoShown}
    </Overlay>
  );
};

export default MealOverlay;
