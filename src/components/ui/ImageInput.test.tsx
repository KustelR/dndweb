import { render, screen, fireEvent } from "@testing-library/react";
import ImageInput from "./ImageInput";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import React from "react";

const mockLoadFile = () => {
  return new Promise<void>((resolve) => resolve());
};

describe("ImageInput", () => {
  test("All elements are in place", () => {
    render(<ImageInput loadFile={mockLoadFile} setImage={() => {}} />);
    const select = screen.getByTestId("inputTypeSelect");
    expect(select).toBeInTheDocument();
    expect(select.querySelectorAll("*")).toHaveLength(3);
    expect(
      (screen.getByTestId("fileOption") as HTMLOptionElement).selected,
    ).toBe(true);
    expect(
      (screen.getByTestId("srcOption") as HTMLOptionElement).selected,
    ).toBe(false);
    expect(
      (screen.getByTestId("colorOption") as HTMLOptionElement).selected,
    ).toBe(false);
  });

  describe("File Input", () => {
    test("File input created correctly", async () => {
      render(<ImageInput loadFile={mockLoadFile} setImage={() => {}} />);
      const select = screen.getByTestId("inputTypeSelect");
      const fileOption = screen.getByTestId("fileOption");
      await userEvent.selectOptions(select, fileOption);
      expect((fileOption as HTMLOptionElement).selected).toBe(true);
      const input = screen.getByTestId("fileInput");
      expect(input).toBeInTheDocument();
    });
    test("File input updates correctly", async () => {
      let value = "";
      const testFile = new File([new Uint8Array([123])], "test");
      render(
        <ImageInput
          loadFile={(file) => {
            return new Promise((resolve) => {
              if (file) resolve(file.name);
            });
          }}
          setImage={(src) => {
            value = src ? src : "";
            expect(value).toBe(testFile.name);
          }}
        />,
      );
      const select = screen.getByTestId("inputTypeSelect");
      const fileOption = screen.getByTestId("fileOption");
      await userEvent.selectOptions(select, fileOption);
      const input = screen.getByTestId("fileInput") as HTMLInputElement;
      fireEvent.change(input, {
        target: { files: { item: () => testFile, length: 1, 0: testFile } },
      });
      expect(input.files).toBeTruthy;
      // @ts-expect-error Checked above
      expect(input.files[0]).toEqual(testFile);
    });
  });

  describe("Source Input", () => {
    test("Source input created correctly", async () => {
      render(<ImageInput loadFile={mockLoadFile} setImage={() => {}} />);
      const select = screen.getByTestId("inputTypeSelect");
      const fileOption = screen.getByTestId("srcOption");
      await userEvent.selectOptions(select, fileOption);
      expect((fileOption as HTMLOptionElement).selected).toBe(true);
      const input = screen.getByTestId("srcInput");
      expect(input).toBeInTheDocument();
    });

    test("Source input updates correctly", async () => {
      let value = "";
      render(
        <ImageInput
          loadFile={mockLoadFile}
          setImage={(src, color) => {
            value = src ? src : "";
          }}
        />,
      );
      const select = screen.getByTestId("inputTypeSelect");
      const fileOption = screen.getByTestId("srcOption");
      await userEvent.selectOptions(select, fileOption);
      const input = screen.getByTestId("srcInput") as HTMLInputElement;
      await userEvent.type(input, "some url");
      expect(input.value).toBe("some url");
      expect(value).toBe("some url");
    });
  });

  describe("Color Input", () => {
    test("Color input created correctly", async () => {
      let value: string = "";
      render(
        <ImageInput loadFile={mockLoadFile} setImage={(src, color) => {}} />,
      );
      const select = screen.getByTestId("inputTypeSelect");
      const colorOption = screen.getByTestId("colorOption");
      await userEvent.selectOptions(select, colorOption);
      const input = screen.getByTestId("colorInput") as HTMLInputElement;
      expect((colorOption as HTMLOptionElement).selected).toBe(true);
      expect(input).toBeInTheDocument();
    });

    test("Color input updates correctly", async () => {
      let value: string = "";
      render(
        <ImageInput
          loadFile={mockLoadFile}
          setImage={(src, color) => {
            value = color ? color : "";
          }}
        />,
      );
      const select = screen.getByTestId("inputTypeSelect");
      const colorOption = screen.getByTestId("colorOption");
      await userEvent.selectOptions(select, colorOption);
      const input = screen.getByTestId("colorInput") as HTMLInputElement;

      fireEvent.input(input, { target: { value: "#ff0000" } });
      expect(input.value).toBe("#ff0000");
      expect(value).toBe("#ff0000");
    });
  });
});
