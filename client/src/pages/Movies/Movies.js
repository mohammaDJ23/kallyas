import React, { useContext, useEffect } from "react";

import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import MoviesList from "../../components/Movies-List/Movies-List";
import { useGetData } from "../../shared/hooks/getData/getData";
import { genres } from "../../shared/utils/genre/genre";
import { requests } from "../../shared/utils/requests/requests";
import { ErrorContext } from "../../shared/context/error/error";
import Error from "../../shared/ui/Error/Error";
import IsLoading from "../../shared/ui/IsLoading/IsLoading";
import IsEmptyResults from "../../components/IsEmptyResults/IsEmptyResults";

function Movies() {
  const {
    getMoviesHandler,
    data,
    isLoading,
    type,
    genre,
    page,
    getMoreResultsHandler,
    totalResultsFromServer
  } = useGetData();

  const { errorText } = useContext(ErrorContext);

  // make request

  useEffect(() => {
    (async () => {
      // these url are for different page

      const { topRatedMovieOrTv, getAllByGenre } = requests({ type, genre });
      let requestData;

      // if the url had a type means movie or tv requestData should equal to toRatedMovieOrTv url
      // otherwise should equal to getAllByGenre url to get data base on genre

      if (type) {
        requestData = { url: topRatedMovieOrTv, multipleRequests: false };
      } else if (genre) {
        requestData = {
          url: [...getAllByGenre],
          multipleRequests: true,
          implementationOnResults: true
        };
      }

      try {
        await getMoviesHandler(requestData);
      } catch (error) {}
    })();
  }, [getMoviesHandler, type, genre]);

  const { results, searchResults } = data;

  return !errorText ? (
    !isLoading && Array.isArray(results) && typeof data === "object" ? (
      results.length > 0 ? (
        <>
          <Navigation getMoreResultsHandler={getMoreResultsHandler} />

          <MoviesList
            movies={results}
            type={type}
            page={page}
            searchResults={searchResults}
            totalResultsFromServer={totalResultsFromServer}
            getMoreResultsHandler={getMoreResultsHandler}
          />

          <Footer genres={genres()} />
        </>
      ) : (
        <IsEmptyResults
          getMoreResultsHandler={getMoreResultsHandler}
          searchResults={searchResults}
        />
      )
    ) : (
      <IsLoading />
    )
  ) : (
    <Error />
  );
}

export default Movies;
