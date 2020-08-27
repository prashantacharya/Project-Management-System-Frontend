// * Store all the application root level data

import React, { createContext, useReducer, useEffect } from 'react';

export const AppContext = createContext();

const INITIAL_STATE = {
  accessToken: '',
  userInfo: {},
  isLoggedIn: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        accessToken: action.payload.accessToken,
        userInfo: action.payload.userInfo,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return INITIAL_STATE;
    default:
      return state;
  }
}

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.isLoggedIn) {
      localStorage.setItem(
        'data',
        JSON.stringify({
          accessToken: state.accessToken,
          userInfo: state.userInfo,
        })
      );
    } else {
      const data = localStorage.getItem('data');
      if (data) {
        const { accessToken, userInfo } = JSON.parse(data);
        dispatch({ type: 'LOGIN', payload: { accessToken, userInfo } });
      }
    }
  }, [state.isLoggedIn, state.accessToken, state.userInfo]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
