import { useCallback, useState, useContext, useRef, useEffect } from "react";

import { ErrorContext } from "../../context/error/error";

export function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const { errorHandler } = useContext(ErrorContext);
  const abortHttpRequest = useRef([]);

  const defineTypeOfFetch = useCallback(
    async ({ url, multipleRequests, abortController }) => {
      const defaultError = "Invalid url.";
      let responseData = null;

      // there are two kind of requests
      // 1 => multiple requests with array
      // 2 => single request

      switch (multipleRequests) {
        // this is for multiple request

        case true: {
          // make request with all url in array

          const requestsArr = url.map(item =>
            fetch(item, { signal: abortController.signal })
          );

          const responses = await Promise.all(requestsArr);

          // parse all data

          const responseArr = responses.map(item => item.json());
          const parsedResponses = await Promise.all(responseArr);

          // check if there is an error in one of the responses
          // if there was an error don't show any of data to the user
          // just show error.

          if (responses.findIndex(item => !item.ok) > -1) {
            const response = parsedResponses.find(item => item.status_message);
            throw new Error(response?.status_message || defaultError);
          }

          responseData = parsedResponses;
          break;
        }

        // this is for single request

        case false: {
          const response = await fetch(url, { signal: abortController.signal });
          const parsedResponse = await response.json();

          if (!response.ok) {
            throw new Error(parsedResponse.status_message || defaultError);
          }

          responseData = parsedResponse;
          break;
        }

        default: {
          throw new Error("Invalid case.");
        }
      }

      return responseData;
    },
    []
  );

  // request to the server

  const fetchData = useCallback(
    async ({ url, multipleRequests, isMore }) => {
      let { current: abortRequest } = abortHttpRequest;

      // create AbortController api to abort the request

      const abortController = new AbortController();
      abortRequest.push(abortController);

      // try to connect to the server

      try {
        if (!isMore) {
          setIsLoading(true);
        }

        const responseData = await defineTypeOfFetch({
          url,
          multipleRequests,
          abortController
        });

        // after receive the response doesn't need to abort request

        abortRequest = abortRequest.filter(reqCtrl => reqCtrl !== abortController);
        return responseData;
      } catch (error) {
        errorHandler(error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [errorHandler, defineTypeOfFetch]
  );

  // abort the request

  useEffect(() => {
    let { current: abortRequest } = abortHttpRequest;
    return () => abortRequest.forEach(abortCtrl => abortCtrl.abort());
  }, []);

  return { fetchData, isLoading };
}
