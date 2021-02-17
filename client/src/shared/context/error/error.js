import React, { createContext, useCallback, useState } from "react";

export const ErrorContext = createContext({
  errorText: "",
  errorHandler: () => {}
});

export default function ErrorContextProvider({ children }) {
  const [errorText, setErrorText] = useState("");
  const errorHandler = useCallback(err => setErrorText(err), []);

  return (
    <ErrorContext.Provider value={{ errorHandler, errorText }}>
      {children}
    </ErrorContext.Provider>
  );
}
