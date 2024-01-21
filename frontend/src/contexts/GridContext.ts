import React, { createContext, useState, useContext } from 'react';

const GridContext = createContext([]);

export const useGridContext = () => useContext(GridContext);

export const GridProvider = ({ children }) => {
  // Add all the state and logic here that you want to provide to your components
  const [gridData, setGridData] = useState(/* initial grid data */);

  // Methods to manipulate the grid data
  const updateGridData = (newData) => {
    setGridData(newData);
  };

  return (
    <GridContext.Provider value={{ gridData, updateGridData }}>
      {children}
    </GridContext.Provider>
  );
};