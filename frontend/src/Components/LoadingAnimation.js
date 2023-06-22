import React from "react";
import "./LoadingAnimation.css";

function LoadingAnimation({ height, backgroundColor }) {
  return (
    <div className="animation-container" style={{ height, width: `${height}` }}>
      <div className="wave" style={{ backgroundColor }}></div>
      <div className="wave" style={{ backgroundColor }}></div>
      <div className="wave" style={{ backgroundColor }}></div>
    </div>
  );
}

export default LoadingAnimation;
