import React from "react";

import "./IsLoading.css";

function IsLoading() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="lds-hourglass"></div>
    </div>
  );
}

export default IsLoading;
