import React, { memo } from "react";
import { Parallax } from "react-parallax";
import ReactPlayer from "react-player/youtube";

import Genre from "../../../shared/ui/Genre/Genre";
import Button from "../../../shared/ui/Button/Button";
import { random } from "../../../shared/utils/random/random";
import { useHistory } from "react-router-dom";

function Trailer({ trailer }) {
  const { replace } = useHistory();

  // get all data that we need

  const {
    original_title,
    overview,
    release_date,
    genres,
    videos,
    images,
    id
  } = trailer;

  const year = release_date.split("-")[0];
  const genre = genres.map(item => item.name);

  // pick a random video

  const { results: videoResults } = videos;
  const videoIndex = random(videoResults.length);
  const video = videoResults[videoIndex];

  // get a random image

  const { backdrops: imageResults } = images;
  const imageIndex = random(imageResults.length);
  const image = imageResults[imageIndex];

  // get the unique key from tmdb

  const { key } = video;
  const { file_path } = image;

  const redirectHandler = () => replace(`/movie/${id}?type=movie`);

  return (
    <Parallax
      bgImage={`${process.env.REACT_APP_TMDB_IMAGE_URL}${file_path}`}
      strength={-100}
      className="w-100 min-w"
      bgImageStyle={{ opacity: "0.2" }}
    >
      <section className="max-min-w m-auto px-3">
        <div className="container-fluid">
          <div className="row d-flex align-items-center">
            <div className="col-7 py-5 px-0">
              <div>
                <ReactPlayer
                  style={{ boxShadow: "0 0 200px 10px black" }}
                  controls={true}
                  muted={false}
                  width="560px"
                  height="316px"
                  url={`${process.env.REACT_APP_YOUTUBE_URL}${key}`}
                />
              </div>
            </div>

            <div className="col-5 py-100 d-flex align-items-end flex-column">
              <Genre year={year} firstGenre={genre[0]} secondGenre={genre[1]} />

              <h1 className="fw-600 fs-36 c-white mb-4">
                <b>{original_title}</b>
              </h1>

              <p className="fw-400 fs-12 c-gray py-2 text-right">{overview}</p>

              <div className="mt-4">
                <Button onClick={redirectHandler} isRedShadow={true} isRed={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Parallax>
  );
}

export default memo(Trailer);
