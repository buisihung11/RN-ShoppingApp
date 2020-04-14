import React, { createContext, useReducer, useMemo, useContext } from 'react';

const UserContext = createContext();

const initialState = {
  user: null,
  userId: null,
  token: null,
  expireDate: null,
};

const reducer = (
  state = initialState,
  { type, user, userId, token, expireDate }
) => {
  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        user,
      };
  }

  return state;
};

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return <UserContext.Provider value={value} {...props} />;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContext');
  }

  const [state, dispatch] = context;

  return [state, dispatch];
};
export { UserProvider as default, useUser };
