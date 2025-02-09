import React, { useState, useEffect } from "react";
import LabeledInput from "./LabeledInput";

export default function ImageInput(props: {
  loadFile: (file: File | undefined) => Promise<string | void>;
  setImage: (src?: string, color?: string) => void;
}) {
  const { setImage, loadFile } = props;
  const [inputType, setInputType] = useState("file");
  const [src, setSrc] = useState("");
  const [color, setColor] = useState("");
  let defaultFile: File | undefined;
  const [file, setFile] = useState(defaultFile);
  useEffect(() => {
    const getFile = async () => {
      const fileName = await loadFile(file);
      if (fileName) {
        setImage(fileName);
      }
    };
    switch (inputType) {
      case "file":
        getFile();
        break;
      case "src":
        setImage(src);
        break;
      case "color":
        setImage(undefined, color);
        break;
    }
  }, [file, src, color]);
  return (
    <div>
      <select
        className="bg-neutral-900"
        onChange={(event) => {
          setInputType(event.currentTarget.value);
        }}
        name="inputType"
        id="inputType"
      >
        <option value="file">file</option>
        <option value="src">link</option>
        <option value="color">color</option>
      </select>
      {inputType === "file" ? <FileInput setFile={setFile} /> : ""}
      {inputType === "src" ? <TextInput setSrc={setSrc} /> : ""}
      {inputType === "color" ? <ColorInput setColor={setColor} /> : ""}
    </div>
  );
}

function FileInput(props: { setFile: (arg0: File) => void }) {
  const { setFile } = props;
  return (
    <>
      <label htmlFor="image">Image:</label>
      <input
        onChange={(event) => {
          const files = event.target.files;
          if (!files || files.length == 0) return;
          setFile(files[0]);
        }}
        type="file"
        id="image"
        name="image"
        accept="image/*"
      />
    </>
  );
}
function TextInput(props: { setSrc: (arg0: string) => void }) {
  const { setSrc } = props;
  return (
    <>
      <LabeledInput
        id="textInput"
        onChange={(event) => {
          setSrc(event.target.value);
        }}
      />
    </>
  );
}
function ColorInput(props: { setColor: (arg: string) => void }) {
  const { setColor } = props;
  return (
    <>
      <label htmlFor="image">Image:</label>
      <input
        onChange={(e) => {
          setColor(e.target.value);
        }}
        type="color"
        id="image"
        name="image"
        accept="image/*"
      />
    </>
  );
}
