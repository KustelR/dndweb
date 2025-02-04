"use client";

import React, { ReactNode, useState } from "react";

type NavItem = {
  name: string;
  href: string;
};

type NavProps = {
  children: ReactNode;
};

export default function Nav(props: NavProps) {
  const { children } = props;
  const [hidden, setHidden] = useState(false);
  return (
    <nav className={`w-fit h-full z-50 ${hidden ? "absolute" : "relative"}`}>
      <button
        className={`${hidden ? "" : "absolute"} right-0 w-10 h-full hover:bg-white/5`}
        onClick={() => {
          setHidden(!hidden);
        }}
      ></button>
      <div className={`${hidden ? "w-0 hidden" : "w-fit"}`}>
        <h2>Explorer</h2>
        {children}
      </div>
    </nav>
  );
}
