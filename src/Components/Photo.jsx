import React from "react";
import "../general.css";

function Photo({ src, variant }) {

  const className = variant === 1 ? "photo-variant-1" : "photo-variant-2";

  return (
    <div className={`photo ${className}`}>
      <img src={src} alt="User" className="photo-img" />
    </div>
  );
}

export default Photo;

