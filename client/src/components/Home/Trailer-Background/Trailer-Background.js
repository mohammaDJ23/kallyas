import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player/youtube";

import Genre from "../../../shared/ui/Genre/Genre";
import Button from "../../../shared/ui/Button/Button";
import { random } from "../../../shared/utils/random/random";

import "./Trailer-Background.css";

function TrailerBackground({ trailer }) {
  const { replace } = useHistory();

  // get all data that we need

  const { genres, id, original_title, overview, release_date, videos } = trailer;
  const genreArr = genres.map(genre => genre.name);
  const year = release_date.split("-")[0];

  // get the random video

  const { results: videoResults } = videos;
  const index = random(videoResults.length);
  const video = videoResults[index];
  const { key } = video;

  const redirectHandler = () => replace(`/movie/${id}?type=movie`);

  return (
    <section className="w-100 min-w position-relative">
      <ReactPlayer
        controls={false}
        loop={true}
        playing={true}
        muted={true}
        width="100%"
        height="1020px"
        style={{ filter: "brightness(50%)" }}
        url={`${process.env.REACT_APP_YOUTUBE_URL}${key}`}
      />

      <div className="container-fulid position-absolute top-left-50-19 z-2">
        <div className="row mx-0">
          <div className="col-7 px-0">
            <Genre year={year} firstGenre={genreArr[0]} secondGenre={genreArr[1]} />

            <h1 className="fw-600 fs-36 c-white mb-3">
              <b>{original_title}</b>
            </h1>

            <p className="fw-400 fs-12 c-gray py-3 pr-160">{overview}</p>

            <div className="mt-4">
              <Button
                onClick={redirectHandler}
                className="mr-4"
                isRedShadow={true}
                isRed={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(TrailerBackground);
