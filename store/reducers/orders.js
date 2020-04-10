import React, { createContext, useReducer, useMemo, useContext } from "react";
import { ADD_ORDER } from "../actions/orders";
import Order from "../../models/order";

const OrderContext = createContext();

const initialState = {
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }

  return state;
};

const OrderProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return <OrderContext.Provider value={value} {...props} />;
};

const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within a OrderProvider");
  }

  const [state, dispatch] = context;

  return [state, dispatch];
};
export { OrderProvider as default, useOrder };
