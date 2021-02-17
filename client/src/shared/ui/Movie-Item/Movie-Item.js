import React from "react";
import { useHistory } from "react-router-dom";

import Star from "../Svg/Star";

import "./Movie-Item.css";

function Movie({ items, type }) {
  const { replace } = useHistory();

  return items.map(
    ({
      original_title,
      id,
      poster_path,
      release_date,
      vote_average,
      original_name,
      first_air_date,
      media_type
    }) => {
      const redirectHandler = () => {
        replace(`/movie/${id}?type=${type || media_type}`);
      };

      const year = (release_date || first_air_date || "-").split("-")[0];

      return (
        <div
          onClick={redirectHandler}
          key={id}
          className="col px-0 mr-1 hover t-02 br-80"
        >
          <div className="mb-3 h-335 b-gray-dark">
            <img
              className="img w-100 h-100"
              src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${poster_path}`}
              alt={original_title}
            />
          </div>

          <div className="px-1">
            <h4 className="fs-12 fw-400 c-white">
              {original_title || original_name}
            </h4>

            <div className="mt-3 d-flex justify-content-between">
              <p className="fs-12 c-gray-dark">{year || ""}</p>

              <div className="d-flex align-items-center">
                <Star />
                <p className="c-yellow fs-12">{vote_average}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  );
}

export default Movie;
