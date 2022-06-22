import React from "react";

function Heading() {
  return (
    <h1 className="text-5xl font-bold mb-5 lg:mb-10">
      <span className="flex justify-center space-x-4">
        <img src="/telegram.svg" alt="logo" />
        <span className="font-asap">TelSearch</span>
      </span>
    </h1>
  );
}

export default Heading;
