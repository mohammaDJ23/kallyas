import React from "react";

const Genre = ({ year, firstGenre, secondGenre }) => {
  return (
    <div className="mb-3">
      <span className="fw-400 fs-14 mr-3 px-2 py-1  c-white b-yellow">
        {year || "2012"}
      </span>

      <span className="fw-400 fs-14 mr-3 px-2 py-1 c-white b-blue">
        {firstGenre || "ACTION"}
      </span>

      {secondGenre && (
        <span className="fw-400 fs-14 c-white px-2 py-1 b-orange">
          {secondGenre}
        </span>
      )}
    </div>
  );
};

export default Genre;
