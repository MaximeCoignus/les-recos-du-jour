import React, { useContext, useState } from "react";
import { navlinks, odds } from "./sports";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [sportsList] = useState(navlinks);
  const [oddsList] = useState(odds);
  const [oddSelected, setOddSelected] = useState(0);
  const [navSelected, setNavSelected] = useState("football");

  return (
    <AppContext.Provider
      value={{
        sportsList,
        oddsList,
        oddSelected,
        navSelected,
        setOddSelected,
        setNavSelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
