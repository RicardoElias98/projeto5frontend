import React from "react";
import "../general.css";

function Photo({ src }) {
  return (
    <div className="photo">
      <img src={src} alt="User" className="photo-img" />
    </div>
  );
}

export default Photo;
