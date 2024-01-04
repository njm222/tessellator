import React, { useState } from "react";

import { useAnalyser } from "../../utils/analyserContext";

import { WelcomeUser } from "./WelcomeUser";

export default function ClickToStart() {
  const { audioAnalyser, analyserOptions } = useAnalyser();
  const [start, setStart] = useState(false);

  function handleClick() {
    audioAnalyser.setup(analyserOptions, "input");
    setStart(true);
  }

  return (
    <>
      <div className={`clickToStart ${start ? "hidden" : ""}`}>
        <a className="text-xxxl" onClick={handleClick}>
          Click to start
        </a>
      </div>
      {start ? <WelcomeUser /> : null}
    </>
  );
}
