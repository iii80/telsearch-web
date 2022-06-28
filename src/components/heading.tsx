import React from "react";
import { HeadingProps } from "../types/props";
import { Link } from "react-router-dom";

function Heading(props: HeadingProps) {
  return (
    <Link to="/">
      <h1
        className={"hover:cursor-pointer text-5xl font-bold " + props.className}
      >
        <span className="flex justify-center space-x-4">
          <img src="/telegram.svg" alt="logo" />
          <span className="font-asap">TelSearch</span>
        </span>
      </h1>
    </Link>
  );
}

export default Heading;
