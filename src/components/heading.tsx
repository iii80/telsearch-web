import React from "react";
import { HeadingProps } from "../types/props";

function Heading(props: HeadingProps) {
  return (
    <h1 className={"text-5xl font-bold " + props.className}>
      <span className="flex justify-center space-x-4">
        <img src="/telegram.svg" alt="logo" />
        <span className="font-asap">TelSearch</span>
      </span>
    </h1>
  );
}

export default Heading;
