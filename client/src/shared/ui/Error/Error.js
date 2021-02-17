import React, { memo, useContext } from "react";
import { useHistory } from "react-router-dom";

import { ErrorContext } from "../../context/error/error";

import "./Error.css";

function Error() {
  const { replace } = useHistory();
  const { errorText, errorHandler } = useContext(ErrorContext);

  const removeErrorHandler = () => {
    errorHandler("");
    replace("/");
  };

  return (
    errorText && (
      <div className="error-modal position-fixed">
        <div className="b-white p-4 w-500 position-relative">
          <div
            onClick={removeErrorHandler}
            className="top-right-5-10 position-absolute hover"
          >
            <p>&#10005;</p>
          </div>

          <div>
            <p className="c-black fs-14 fw-400">{errorText}</p>
          </div>
        </div>
      </div>
    )
  );
}

export default memo(Error);
