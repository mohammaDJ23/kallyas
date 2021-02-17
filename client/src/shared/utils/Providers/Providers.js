import ErrorContextProvider from "../../context/error/error";
import SearchValueProvider from "../../context/search-value/search-value";

export default function Providers({ children }) {
  return (
    <ErrorContextProvider>
      <SearchValueProvider>{children}</SearchValueProvider>
    </ErrorContextProvider>
  );
}
