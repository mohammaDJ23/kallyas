import React, { memo } from "react";
import Button from "../../shared/ui/Button/Button";

import MoviesItem from "../../shared/ui/Movie-Item/Movie-Item";
import { lists } from "../../shared/utils/make-list/make-list";
import Search from "../../shared/ui/Search/Search";

function MoviesList({
  movies,
  type,
  totalResultsFromServer,
  getMoreResultsHandler,
  searchResults
}) {
  return (
    <section className="w-100 max-min-w px-3 m-auto pt-5 pb-4 position-relative">
      <Search results={searchResults} />

      <div className="container-fluid">
        {[...lists(movies, 5)].map((movie, index) => (
          <div key={index} className="row mb-5">
            <MoviesItem items={movie} type={type} />
          </div>
        ))}

        {movies.length !== totalResultsFromServer && (
          <div className="row">
            <div className="col px-0 text-center">
              <Button
                onClick={() => getMoreResultsHandler({ allItem: movies })}
                label="LOAD MORE"
                isPlain={true}
                isStar={true}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(MoviesList);
