import React from "react";

export default function Loader() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
