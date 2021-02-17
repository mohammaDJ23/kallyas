import React, { memo, useState } from "react";
import Slider from "react-slick";

import Button from "../../../shared/ui/Button/Button";
import MovieItem from "../../../shared/ui/Movie-Item/Movie-Item";
import { lists } from "../../../shared/utils/make-list/make-list";
import NextArrow from "../../../shared/ui/Svg/NextArrow";
import PrevArrow from "../../../shared/ui/Svg/PrevArrow";
import { tmdbGenre } from "../../../shared/utils/tmdb-genre/tmdb-genre";

import "./Trends.css";

function Trends({ trends, genres, getMoreResultsHandler, totalResultsFromServer }) {
  const [trendingFilterd, setTrendingFilterd] = useState(null);
  const [genreButton, setGenreButton] = useState("");

  // setup slider setting

  const settings = {
    arrows: true,
    centerMode: true,
    infinite: true,
    draggable: false,
    speed: 500,
    slide: "div",
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const { results } = trends;

  // filter trending by genre

  const filterTrendsHandler = ({ genre }) => {
    const trends = [...results];
    const genreIds = tmdbGenre();
    const genreKey = +Object.keys(genreIds).find(item => genreIds[item] === genre);

    const filterdResults = ({ trends, genreKey }) => {
      let arr = [];

      if (trends.length === 0) {
        return arr;
      }

      if (trends[0]?.genre_ids.includes(genreKey)) {
        arr.push(trends[0]);
      }

      arr = arr.concat(filterdResults({ trends: trends.slice(1), genreKey }));
      return arr;
    };

    setGenreButton(genre);
    setTrendingFilterd(filterdResults({ trends, genreKey }));
  };

  // request more results from server

  const moreResultsHandler = () => {
    getMoreResultsHandler({ allItem: results });
    setTrendingFilterd(null);
    setGenreButton("");
  };

  return (
    <section className="py-5 max-min-w w-100 m-auto px-3">
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-12 px-0">
            <div className="mb-4">
              <h3 className="c-gray fw-300 fs-14">TRENDS NOW</h3>
            </div>

            <div className="position-relative">
              <div className="w-900 m-auto">
                <Slider {...settings}>
                  {genres.map((genre, index) => (
                    <div key={index} className="mr-3">
                      <Button
                        onClick={() => filterTrendsHandler({ genre })}
                        label={genre}
                        isPlain={true}
                        className={`${genre === genreButton && "b-red"}`}
                        removeDefaultBg={genre === genreButton && true}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>

        {[...lists(trendingFilterd || results, 5)].map((items, index) => (
          <div key={index} className="row mb-5">
            <MovieItem items={items} />
          </div>
        ))}

        {results.length !== totalResultsFromServer && (
          <div className="row">
            <div className="col px-0 text-center">
              <Button
                onClick={moreResultsHandler}
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

export default memo(Trends);
