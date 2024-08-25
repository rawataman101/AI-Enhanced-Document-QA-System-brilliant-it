import React, { createContext, useState } from "react";

export const MainContext = createContext();

const MainProvider = ({ children }) => {
  const [file, setFile] = useState(null);

  return (
    <MainContext.Provider value={{ file, setFile }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
