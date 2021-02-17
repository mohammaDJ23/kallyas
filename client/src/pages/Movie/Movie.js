import React, { useContext, useEffect, useMemo } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import SingleMovie from "../../components/Signle-Movie/Single-Movie";
import { ErrorContext } from "../../shared/context/error/error";
import { useGetData } from "../../shared/hooks/getData/getData";
import Error from "../../shared/ui/Error/Error";
import IsLoading from "../../shared/ui/IsLoading/IsLoading";
import { genres } from "../../shared/utils/genre/genre";
import { requests } from "../../shared/utils/requests/requests";

function Movie() {
  const { getMoviesHandler, data, isLoading, getMoreResultsHandler } = useGetData();
  const { errorText } = useContext(ErrorContext);
  const { replace } = useHistory();

  // get the id and type of request (movie or tv) from the url

  const { id } = useParams();
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const type = query.get("type");

  useEffect(() => {
    (async () => {
      // check if there isn't an id

      if (!id || !type) {
        replace("/home");
        return;
      }

      // get all requests the we need

      const { singleMovieOrTv, similar } = requests({ id, type });

      // make requests in array

      const movieRequests = [singleMovieOrTv, similar];

      try {
        await getMoviesHandler({ url: movieRequests, multipleRequests: true });
      } catch (error) {}
    })();
  }, [id, getMoviesHandler, type, replace]);

  return !errorText ? (
    !isLoading && Array.isArray(data) && data.length > 0 ? (
      <>
        <Navigation getMoreResultsHandler={getMoreResultsHandler} />

        <SingleMovie
          movieOrTv={data[0]}
          suggestion={data[1]}
          searchResults={data[2]?.["searchResults"]}
        />

        <Footer genres={genres()} />
      </>
    ) : (
      <IsLoading />
    )
  ) : (
    <Error />
  );
}

export default Movie;
