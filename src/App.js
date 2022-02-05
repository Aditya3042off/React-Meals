import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Backdrop from "./components/UI/Backdrop";
import React from "react";
import MealOverlay from "./components/Meals/MealOverlay/MealOverlay";

export const MealInfoContext = React.createContext();

function App() {
  const [clickedMeal, setClickedMeal] = useState("");
  const [mealList, setMealList] = useState([]);

  const [cartIsShown, setCartIsShown] = useState(false);
  const [mealOverlayIsShown, setMealOverlayIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const showMealOverlayHandler = () => {
    setMealOverlayIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const hideMealOverlayHandler = () => {
    setMealOverlayIsShown(false);
  };

  return (
    <CartProvider>
      <MealInfoContext.Provider
        value={{
          clickedMeal,
          setClickedMeal,
          mealList,
          setMealList,
        }}
      >
        {cartIsShown && <Backdrop onClose={hideCartHandler} />}
        <Cart show={cartIsShown} onClose={hideCartHandler} />

        {mealOverlayIsShown && <Backdrop onClose={hideMealOverlayHandler} />}
        <MealOverlay
          show={mealOverlayIsShown}
          onClose={hideMealOverlayHandler}
        />

        <Header onShowCart={showCartHandler} />
        <main>
          <Meals showMealOverlayHandler={showMealOverlayHandler} />
        </main>
      </MealInfoContext.Provider>
    </CartProvider>
  );
}

export default App;
