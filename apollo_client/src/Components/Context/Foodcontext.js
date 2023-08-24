import React from "react";
import { func } from "prop-types";

const context = React.createContext({
  pres: [],
  addFood: () => {}
});

function FoodReducer(state, action) {
  switch (action.type) {
    case "Food":
      return {
        ...state,
        pres: action.payload
      };
  }
}

function FoodProvider(props) {
  const [state, dispatch] = React.useReducer(FoodReducer, { pres: null });
  const addFood = data => {
    dispatch({
      type: "Food",
      payload: data
    });
  };
  return (
    <context.Provider
      value={{
        pres: state.pres,
        addFood
      }}
      {...props}
    />
  );
}

export { FoodProvider, context };
