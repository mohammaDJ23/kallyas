import React, { memo } from "react";

import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import { genres } from "../../shared/utils/genre/genre";
import Search from "../../shared/ui/Search/Search";

import "./IsEmptyResults.css";

function IsEmptyResults({ getMoreResultsHandler, searchResults }) {
  return (
    <>
      <Navigation getMoreResultsHandler={getMoreResultsHandler} />

      <section className="py-5 my-5 max-min-w m-auto px-3 position-relative">
        <Search results={searchResults} />

        <div className="container-fluid">
          <div className="row">
            <div className="col d-flex justify-content-center">
              <div>
                <h2 className="fw-400 c-gray fs-36">No results found</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer genres={genres()} className="position-fixed bottom-0" />
    </>
  );
}

export default memo(IsEmptyResults);
