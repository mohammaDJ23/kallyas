import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

import { useHttp } from "../http/http";
import { shuffle } from "../../utils/shuffle/shuffle";
import { requests } from "../../utils/requests/requests";

export function useGetData() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(2);
  const [totalResultsFromServer, setTotalResultsFromServer] = useState(0);

  // http request handler

  const { fetchData, isLoading } = useHttp();

  // get queries from url

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const type = query.get("type");
  const genre = query.get("genre");

  // add new key & value to object

  const addProperty = useCallback((arr, newValue, newKey = "media_type") => {
    arr.forEach(item => (item[newKey] = newValue));
    return arr;
  }, []);

  // concat new results to prior results

  const concatNewResultsToPriorResults = useCallback(
    ({ prevState, getData: newData, search }) => {
      const { results: newResults } = newData;

      // this check is for if the request was from home get the second item prior data (item is in array)
      // and if it was not form home just get results from getData object

      switch (Array.isArray(prevState)) {
        case true: {
          const data = [...prevState];

          // the second result in the prior data is trending (based on request)
          // and the tmdb api does not specify that is trending results

          if (!search) {
            const { results: priorResults } = data[2];
            data[2] = { results: [...priorResults, ...newResults] };
          } else {
            if (data[data.length - 1]["searchResults"]) {
              data.pop();
            }

            data.push({ searchResults: [...newResults] });
          }

          return data;
        }

        case false: {
          let data = { ...prevState };
          const { results: priorResults } = data;

          if (!search) {
            data = { results: [...priorResults, ...newResults] };
          } else {
            data = { results: [...priorResults], searchResults: [...newResults] };
          }

          return data;
        }

        default: {
          throw new Error("Invalid case.");
        }
      }
    },
    []
  );

  // add property to the new results

  const addMorePropertyHandler = useCallback(
    ({ getData: newData }) => {
      // first results is movie and second is tv

      const [movies, tv] = newData;
      const { results: moviesArr, total_results: allMoviesResults } = movies;
      const { results: tvArr, total_results: allTvResults } = tv;

      // concat two array in one array

      const results = [
        ...addProperty(moviesArr, "movie"),
        ...addProperty(tvArr, "tv")
      ];

      return { results, total_results: allMoviesResults + allTvResults };
    },
    [addProperty]
  );

  // get data from server

  const getMoviesHandler = useCallback(
    async ({ url, multipleRequests, implementationOnResults, isMore, search }) => {
      try {
        if (!isMore) {
          setData({});
        }

        let getData = await fetchData({ url, multipleRequests, isMore });

        // the tmdb api can't tell us in response whether is movie or tv,
        // so we have to define items in array as movie or tv (base on url request)

        if (implementationOnResults) {
          const { results, total_results } = addMorePropertyHandler({ getData });
          getData = { results: shuffle(results), total_results };
        }

        // if data from the server was object, get the total_results property
        // i explain what is this in getMoreResultsHandler function

        if (!Array.isArray(getData) && !search) {
          const { total_results } = getData;
          setTotalResultsFromServer(total_results);
        }

        setData(prevState => {
          // if we want more results form server
          // this check should work for us
          // for example more trending, movies and serials.

          if (isMore) {
            const data = concatNewResultsToPriorResults({
              prevState,
              getData,
              search
            });

            return data;
          }

          return getData;
        });

        return getData;
      } catch (error) {}
    },
    [fetchData, addMorePropertyHandler, concatNewResultsToPriorResults]
  );

  // make request to get more results

  const getMoreResultsHandler = useCallback(
    async ({ allItem, search, value }) => {
      // if the all results (totalResultsFromServer) was equal page * results that i showed to the user
      // so then don't send request to the server

      if (allItem?.length === totalResultsFromServer && !search) {
        return;
      }

      // get requests

      const {
        trending,
        getAllByGenre,
        topRatedMovieOrTv,
        search: searchUrl
      } = requests({
        page,
        type,
        genre,
        query: value
      });

      // default request (this is for home (trending request))

      let request = {
        url: trending,
        multipleRequests: false,
        isMore: true,
        implementationOnResults: false
      };

      // check which page the user make a request and change the options of request

      if (!search) {
        if (genre) {
          request["url"] = [...getAllByGenre];
          request["multipleRequests"] = true;
          request["implementationOnResults"] = true;
        } else if (type) {
          request["url"] = topRatedMovieOrTv;
        }
      } else {
        request["url"] = searchUrl;
        request["search"] = true;
      }

      try {
        await getMoviesHandler(request);
      } catch (error) {
        return;
      }

      setPage(prevState => prevState + 1);
    },
    [page, getMoviesHandler, genre, type, totalResultsFromServer]
  );

  // remove value in search input

  return {
    data,
    isLoading,
    getMoviesHandler,
    getMoreResultsHandler,
    type,
    genre,
    page,
    totalResultsFromServer
  };
}
