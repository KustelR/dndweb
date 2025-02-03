"use client";

import React, { JSX, useState } from "react";
import Link from "next/link";

type NavItem = {
  name: string;
  href: string;
};

type NavProps = {
  children?: Array<string | JSX.Element | JSX.Element[]>;
};

export default function Nav(props: NavProps) {
  const { children } = props;
  const [hidden, setHidden] = useState(false);
  return (
    <nav className={`w-fit z-50 ${hidden ? "absolute h-full" : "relative"}`}>
      <button
        className={`${hidden ? "" : "absolute"} right-0 w-10 h-full hover:bg-white/5`}
        onClick={() => {
          setHidden(!hidden);
        }}
      ></button>
      <div className={`${hidden ? "w-0 hidden" : "w-40"}`}>
        <h2>Explorer</h2>
        <ul>
          {children
            ? children.map((child) => {
                return <li>{child}</li>;
              })
            : ""}
        </ul>
      </div>
    </nav>
  );
}
