import React, { createContext, useReducer } from 'react';

export const DataContext = createContext();

const INITIAL_STATE = {
  projects: [],
};

function dataReducer(state, action) {
  console.log(action);
  switch (action.type) {
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    default:
      return state;
  }
}

function AppDataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export default AppDataProvider;
