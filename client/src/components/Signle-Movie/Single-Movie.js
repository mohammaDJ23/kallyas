import React, { memo } from "react";
import { Parallax } from "react-parallax";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

import MovieItem from "../../shared/ui/Movie-Item/Movie-Item";
import Star from "../../shared/ui/Svg/Star";
import { random } from "../../shared/utils/random/random";
import Search from "../../shared/ui/Search/Search";

import "./Single-Movie.css";

function SingleMovie({ movieOrTv, suggestion, searchResults }) {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const type = query.get("type");

  const {
    backdrop_path,
    vote_average,
    runtime,
    genres,
    poster_path,
    overview,
    release_date,
    original_language,
    original_title,
    original_name,
    videos,
    first_air_date,
    number_of_seasons
  } = movieOrTv;

  const genre = genres.map(item => item.name).join("-");

  // get the random video

  const { results: videoResults } = videos;
  let keyForVidoe = null;

  if (videoResults.length > 0) {
    const videoIndex = random(videoResults.length);
    const { key } = videoResults[videoIndex];
    keyForVidoe = key;
  }

  // pick 5 item from suggestion randomly

  const { results: suggestionResults } = suggestion;
  const quantity = 5;
  const itemIndex = random(suggestionResults.length);
  let suggestionsArr = [];

  // check for two conditions
  // the length of sugesstion is 20 (per page)

  // 1 => if itemIndex < 15
  // 2 => if itemIndex > 15 should be suggestionResults.slice(15, quantity)

  if (itemIndex <= suggestionResults.length - quantity) {
    suggestionsArr = suggestionResults.splice(itemIndex, quantity);
  } else if (itemIndex > suggestionResults.length - quantity) {
    suggestionsArr = suggestionResults.splice(
      suggestionResults.length - quantity,
      quantity
    );
  }

  return (
    <Parallax
      className="min-w w-100 py-5"
      bgImage={`${process.env.REACT_APP_TMDB_IMAGE_URL}${backdrop_path || ""}`}
      blur={{ min: -20, max: 20 }}
      bgImageStyle={{ opacity: "0.2" }}
      strength={400}
    >
      <section className="w-100 max-min-w px-3 m-auto position-relative">
        <Search results={searchResults} />

        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-3 px-0">
              <div className="w-300 h-450 b-gray-dark">
                <img
                  src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${poster_path}`}
                  alt={original_title}
                  className="w-100 h-100 img img-shadow"
                />
              </div>
            </div>

            <div className="col-7 px-5">
              <h2 className="c-white fw-600 fs-36 mb-5">
                {original_title || original_name}
              </h2>

              {(release_date || first_air_date) && (
                <p className="c-gray fs-14 mb-1 fw-300">
                  Released: {release_date || first_air_date}
                </p>
              )}

              {(runtime || runtime === 0) && (
                <p className="c-gray fs-14 mb-1 fw-300">Runtime: {runtime}</p>
              )}

              {number_of_seasons && (
                <p className="c-gray fs-14 mb-1 fw-300">
                  Seasons: {number_of_seasons}
                </p>
              )}

              {genre && <p className="c-gray fs-14 mb-1 fw-300">Genre: {genre}</p>}

              {original_language && (
                <p className="c-gray fs-14 mb-4 fw-300">
                  Language: {original_language}
                </p>
              )}

              <p className="c-gray fs-14 fw-300">{overview}</p>
            </div>

            <div className="col-2 px-0">
              {!vote_average <= 0 && (
                <p className="d-flex align-items-center c-gray">
                  <Star />
                  <Star />
                  {vote_average >= 3 && <Star />}
                  {vote_average >= 5.5 && <Star />}
                  {vote_average >= 8.5 && <Star />}
                  {vote_average}
                </p>
              )}
            </div>
          </div>

          {keyForVidoe && (
            <div className="row mb-5">
              <div className="col-12 px-0">
                <ReactPlayer
                  style={{ boxShadow: "0 0 200px 10px black" }}
                  controls={true}
                  muted={false}
                  width="560px"
                  height="316px"
                  url={`${process.env.REACT_APP_YOUTUBE_URL}${keyForVidoe}`}
                />
              </div>
            </div>
          )}

          {suggestionsArr.length > 0 && (
            <>
              <div className="row">
                <h3 className="fs-14 fw-400 c-gray">SUGGESTIONS</h3>
              </div>

              <div className="row mt-5">
                <MovieItem items={suggestionsArr} type={type} />
              </div>
            </>
          )}
        </div>
      </section>
    </Parallax>
  );
}

export default memo(SingleMovie);
