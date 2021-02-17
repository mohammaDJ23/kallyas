import React, { useContext, useEffect } from "react";

import Head from "../../components/Home/Head/Head";
import Trailer from "../../components/Home/Trailer/Trailer";
import Trends from "../../components/Home/Trends/Trends";
import TrailerBackground from "../../components/Home/Trailer-Background/Trailer-Background";
import Footer from "../../components/Footer/Footer";
import IsLoading from "../../shared/ui/IsLoading/IsLoading";
import Error from "../../shared/ui/Error/Error";
import { useGetData } from "../../shared/hooks/getData/getData";
import { genres } from "../../shared/utils/genre/genre";
import { ErrorContext } from "../../shared/context/error/error";
import { requests } from "../../shared/utils/requests/requests";

function Home() {
  const {
    data,
    isLoading,
    getMoviesHandler,
    getMoreResultsHandler,
    page,
    totalResultsFromServer
  } = useGetData();

  const { errorText } = useContext(ErrorContext);

  // make request to tmdb api

  useEffect(() => {
    (async () => {
      // the movie db api (tmdb) doesn't support multiple request inside on request
      // so here we have to make multiple url to get all data.

      const { nowPlaying, trailers, popularTv, trending } = requests({});
      const homeRequests = [nowPlaying, popularTv, trending, ...trailers];

      try {
        await getMoviesHandler({ multipleRequests: true, url: homeRequests });
      } catch (error) {}
    })();
  }, [getMoviesHandler]);

  return !errorText ? (
    !isLoading && Array.isArray(data) && data.length > 0 ? (
      <>
        <Head
          nowPlaying={data[0]}
          popularTv={data[1]}
          searchResults={data[6]?.["searchResults"]}
          getMoreResultsHandler={getMoreResultsHandler}
        />

        <Trailer trailer={data[3]} />

        <Trends
          genres={genres()}
          trends={data[2]}
          page={page}
          getMoreResultsHandler={getMoreResultsHandler}
          totalResultsFromServer={totalResultsFromServer}
        />

        <TrailerBackground trailer={data[4]} />
        <Trailer trailer={data[5]} />
        <Footer genres={genres()} />
      </>
    ) : (
      <IsLoading />
    )
  ) : (
    <Error />
  );
}

export default Home;
