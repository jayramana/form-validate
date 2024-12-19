import React, { createContext, useContext, useState } from "react";

export const IDContext  = createContext<{
  idValue: string;
  setIDValue: (value: string) => void;
}>({
  idValue: "",
  setIDValue: () => {},
});

export const useIDContext = () => useContext(IDContext);

const IDProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [idValue, setIDValue] = useState("");

  return (
    <IDContext.Provider value={{ idValue, setIDValue}}>
      {children}
    </IDContext.Provider>
  );
};

export default IDProvider;
