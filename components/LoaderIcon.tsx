import React from "react";

export const LoaderIcon = () => {
  return (
    <div className="bounded-wave-loader">
      <svg xmlns="http://www.w3.org/2000/svg" width="960" height="80" fill="#D1D5DB" viewBox="0 0 120 10">
        <path d="M0,5 C20,-10 40,20 60,5 v5 H0" />
        <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0" />
      </svg>
    </div>
  );
};
