import React, { memo } from "react";
import Slider from "react-slick";
import { Parallax } from "react-parallax";
import { useHistory } from "react-router-dom";

import headBackground from "../../../images/Netflix-Streaming.png";
import Navigation from "../../Navigation/Navigation";
import Button from "../../../shared/ui/Button/Button";
import Genre from "../../../shared/ui/Genre/Genre";
import { tmdbGenre } from "../../../shared/utils/tmdb-genre/tmdb-genre";
import Search from "../../../shared/ui/Search/Search";

import "./Head.css";

function Head({ popularTv, nowPlaying, getMoreResultsHandler, searchResults }) {
  const { replace } = useHistory();

  // setup slider settings

  const settings = {
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    infinite: true,
    slidesToShow: 5,
    speed: 800,
    draggable: false,
    focusOnSelect: true,
    pauseOnDotsHover: true,
    slide: "div",
    slidesToScroll: 1,
    className: "slick-slider"
  };

  // pick random now playing movies

  const { results } = nowPlaying;

  // get all date that we need

  const {
    genre_ids,
    release_date,
    overview,
    original_title,
    poster_path,
    id
  } = results[0];

  const allTmdbGenre = tmdbGenre();
  const year = release_date.split("-")[0];
  const genreNames = genre_ids.map(item => allTmdbGenre[item]);

  // redirect to movie page

  const redirectHandler = ({ id, type }) => replace(`/movie/${id}?type=${type}`);

  return (
    <Parallax
      className="min-w pb-5"
      bgImage={headBackground}
      blur={{ min: -20, max: 20 }}
      strength={400}
    >
      <header>
        <Navigation getMoreResultsHandler={getMoreResultsHandler} />

        <div className="w-100 pt-5 max-min-w m-auto px-3 position-relative">
          <Search results={searchResults} />

          <div className="container-fluid">
            <div className="row">
              <div className="col-6 py-130-100 pr-100">
                <Genre
                  year={year}
                  firstGenre={genreNames[0]}
                  secondGenre={genreNames[1]}
                />

                <h1
                  className={`fw-600 ${
                    original_title.split(" ").length >= 3 ? "fs-32" : "fs-58"
                  } c-white mb-3`}
                >
                  <b>{original_title}</b>
                </h1>

                <p className="fw-400 fs-12 c-gray py-3">{overview}</p>

                <div className="mt-4">
                  <Button
                    onClick={() => redirectHandler({ id, type: "movie" })}
                    className="mr-4"
                    isRedShadow={true}
                    isRed={true}
                  />
                </div>
              </div>

              <div className="col-6 pl-90">
                <div className="w-370">
                  <img
                    className="w-100 img img-shadow hover"
                    src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${poster_path}`}
                    alt={original_title}
                    onClick={() => redirectHandler({ id, type: "movie" })}
                  />
                </div>
              </div>
            </div>

            <div className="row pt-4">
              <div className="col-12 p-0">
                <div className="mb-4">
                  <h3 className="c-gray fw-300 fs-14">POPULAR SERIALS</h3>
                </div>

                <Slider {...settings}>
                  {popularTv.results.map(({ poster_path, id }) => (
                    <div key={id} className="wh-180 hover t-02 px-1 br-80">
                      <div onClick={() => redirectHandler({ id, type: "tv" })}>
                        <img
                          src={`${process.env.REACT_APP_TMDB_IMAGE_URL}${poster_path}`}
                          alt={id}
                          className="img w-100 h-100"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Parallax>
  );
}

export default memo(Head);
