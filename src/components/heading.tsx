import React from "react";

function Heading() {
  return (
    <h1 className="text-5xl font-bold mb-5 lg:mb-10">
      <span className="flex space-x-4">
        <img src="/telegram.svg" alt="logo" />
        <span>TelSearch</span>
      </span>
    </h1>
  );
}

export default Heading;
