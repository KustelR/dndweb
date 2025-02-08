"use client";

import React, { ReactNode, useState } from "react";

type NavProps = {
  children: ReactNode;
};

export default function Nav(props: NavProps) {
  const { children } = props;
  const [hidden, setHidden] = useState(false);
  return (
    <div className={`w-fit h-full z-50 ${hidden ? "absolute" : "relative"}`}>
      <button
        name="hide nav"
        className={`${hidden ? "" : "absolute"} right-0 w-10 h-full hover:bg-white/5 focus:bg-white/5 focus:outline-none`}
        onClick={() => {
          setHidden(!hidden);
        }}
      ></button>
      <nav className="m-1 py-2 rounded-xl h-full bg-white/5">
        <div className={`${hidden ? "w-0 hidden" : "w-fit"}`}>
          <h2>Explorer</h2>
          {children}
        </div>
      </nav>
    </div>
  );
}
