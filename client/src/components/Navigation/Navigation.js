import React, { memo, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { SearchValueContext } from "../../shared/context/search-value/search-value";
import icon from "../../images/icon.png";

import "./Navigation.css";

const nav = [
  { path: "/", name: "Homepage" },
  { path: "/serials?type=tv", name: "Serials" },
  { path: "/movies?type=movie", name: "Movies" }
];

function Navigation({ getMoreResultsHandler }) {
  const [allow, setAllow] = useState(false);
  const { value, setValueHandler } = useContext(SearchValueContext);
  const { replace } = useHistory();

  const redirectHandler = ({ path }) => {
    if (path === "/") {
      path = "/home";
    }

    if (window.location.pathname === path) {
      return;
    }

    replace(path);
  };

  // make search request

  useEffect(() => {
    if (value.length > 0 && allow) {
      const timer = setTimeout(async () => {
        try {
          await getMoreResultsHandler({ search: true, value });
        } catch (error) {
          return;
        }

        setAllow(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [value, getMoreResultsHandler, allow]);

  return (
    <nav className="w-100 b-transparent max-min-w m-auto py-4">
      <div className="container-fluid">
        <div className="row">
          <div className="col-7 d-flex align-items-center">
            <div
              onClick={() => redirectHandler({ path: "/" })}
              className="d-flex align-items-center hover"
            >
              <img src={icon} alt="icon" />
              <p className="ml-3 c-red fw-400 fs-14">KALLYAS</p>
            </div>

            <div className="ml-80">
              <ul className="d-flex align-items-center c-white">
                {nav.map((item, index) => {
                  const { path, name } = item;

                  return (
                    <li
                      key={index}
                      onClick={() => redirectHandler({ path })}
                      className="mr-4 fw-300 hover fs-14 text-hover t-02"
                    >
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="col-5 d-flex align-items-center justify-content-end">
            <form className="position-relative" onSubmit={e => e.preventDefault()}>
              <input
                onBlur={() => setTimeout(() => setValueHandler(""), 500)}
                onChange={e => setValueHandler(e.target.value)}
                onKeyDown={e => setAllow(true)}
                type="text"
                name="search"
                placeholder="Search"
                value={value}
                className="i-default c-red outline-none pr-3"
              />

              <div className="position-absolute top-right-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="#f10e1f"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default memo(Navigation);
