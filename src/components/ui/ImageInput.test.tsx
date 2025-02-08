import { render, screen } from "@testing-library/react";
import ImageInput from "./ImageInput";
import "@testing-library/jest-dom";
import React from "react";

test("All elements are in place", () => {
  const result = render(<ImageInput setImage={() => {}} />);
  const select = result.container.querySelector("select#inputType");
  expect(select).toBeInTheDocument();
  expect(select?.querySelectorAll("*")).toHaveLength(3);
});
