import React from "react";

import Play from "../Svg/play";
import Plus from "../Svg/Plus";

import "./Button.css";

function Button({
  label,
  className,
  isPlain,
  isRed,
  isRedShadow,
  fs,
  isStar,
  onClick,
  removeDefaultBg
}) {
  let input = null;

  if (isRed) {
    input = (
      <>
        <Play />
        {label || "PLAY TRAILER"}
      </>
    );
  }

  if (isPlain) {
    input = (
      <>
        {isStar && <Plus />}
        {label}
      </>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${
        className && className
      } b-default fw-400 c-white hover c-white border-0 px-4 py-2 outline-none border-red t-02 ${
        fs || "fs-12"
      } ${isRed && "b-red"} ${!removeDefaultBg && isPlain && "b-charcoal"} ${
        isRedShadow && "b-shadow-red"
      }`}
    >
      {input}
    </button>
  );
}

export default Button;
