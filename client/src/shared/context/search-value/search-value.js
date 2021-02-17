import React, { createContext, useState } from "react";

export const SearchValueContext = createContext({
  value: "",
  setValueHandler: () => {}
});

const SearchValueProvider = ({ children }) => {
  const [value, setValue] = useState("");
  const setValueHandler = val => setValue(val);

  return (
    <SearchValueContext.Provider value={{ value, setValueHandler }}>
      {children}
    </SearchValueContext.Provider>
  );
};

export default SearchValueProvider;
