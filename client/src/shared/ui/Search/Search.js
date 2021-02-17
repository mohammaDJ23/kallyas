import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { SearchValueContext } from "../../context/search-value/search-value";

import "./Search.css";

function Search({ results }) {
  const { value } = useContext(SearchValueContext);
  const { replace } = useHistory();

  return (
    value && (
      <div className="position-absolute top-right-0-17 w-380 h-400 z-3 b-charcoal search-shadow overflow-auto">
        <div className="container-fluid">
          {results?.length > 0 ? (
            results.map(item => {
              const { id, title, media_type, known_for, name, original_name } = item;

              return (
                <div
                  key={id}
                  className="row my-2 hover"
                  onClick={() =>
                    replace(
                      `/movie/${id}?type=${
                        ["tv", "movie"].includes(media_type)
                          ? media_type
                          : known_for?.[0]["media_type"]
                      }`
                    )
                  }
                >
                  <div className="col">
                    <p className="fs-14 fw-300 c-gray">
                      {title || known_for?.[0]["title"] || original_name || name}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center">
              <p className="fs-14 fw-300 c-gray">{results && "no results found"}</p>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default Search;
