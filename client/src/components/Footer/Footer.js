import React, { memo } from "react";
import { useHistory } from "react-router-dom";

import icon from "../../images/icon2.png";
import Facebook from "../../shared/ui/Svg/Facebook";
import Google from "../../shared/ui/Svg/Google";
import Instagram from "../../shared/ui/Svg/Instagram";
import Twitter from "../../shared/ui/Svg/Twitter";
import { lists } from "../../shared/utils/make-list/make-list";

function Footer({ genres, className }) {
  const { replace } = useHistory();

  const redirectHandler = ({ genre, path }) => {
    if (path && window.location.pathname === path) {
      return;
    }

    if (genre) {
      replace(`/movies-and-serials?genre=${genre}`);
      return;
    }

    replace(path);
  };

  return (
    <footer className={`${className && className} min-w w-100 py-5 b-blue-charcoal`}>
      <div className="container max-min-w">
        <div className="row mx-0">
          <div className="col-3 px-0 mr-5">
            <div
              className="d-flex align-items-center mb-4 hover"
              onClick={() => redirectHandler({ path: "/home" })}
            >
              <img src={icon} alt="kallyas" />
              <h1 className="c-gray-dark fs-26 fw-400 ml-3">KALLYAS</h1>
            </div>

            <div className="mb-5">
              <p className="c-gray-dark fs-14 fw-300">
                © Copyright 2019 KALLYAS - Hogash Studio. All rights reserved.
              </p>
            </div>

            <div className="d-flex align-items-center">
              <Facebook />
              <Google />
              <Twitter />
              <Instagram />
            </div>
          </div>

          <div className="col-7">
            <h3 className="fw-400 fs-14 c-gray mb-4 pl-3">Movies & Serials</h3>

            <div className="row mx-0 c-gray-dark fs-14 fw-300">
              {[...lists(genres, 10)].map((genreArr, index) => (
                <div key={index} className="col">
                  {genreArr.map(genre => (
                    <p
                      onClick={() => redirectHandler({ genre })}
                      key={genre}
                      className="mb-2 hover"
                    >
                      {genre}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
