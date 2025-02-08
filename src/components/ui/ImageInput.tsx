import React, { useState, useEffect } from "react";
import LabeledInput from "./LabeledInput";
import axios from "axios";

async function loadFile(
  inputType: string,
  src: string,
  color: string,
  file: File | undefined,
  setImage: (src?: string, color?: string) => void,
) {
  switch (inputType) {
    case "file":
      if (!file) return;
      const response = await axios.post("/api/images/post", file, {
        headers: { "Content-Type": "image/jpeg" },
      });
      setImage(`/api/images/static/${response.data}`);
      break;
    case "src":
      setImage(src);
      break;
    case "color":
      setImage(undefined, color);
      break;
    default:
      break;
  }
}

export default function ImageInput(props: {
  setImage: (src?: string, color?: string) => void;
}) {
  const { setImage } = props;
  const [inputType, setInputType] = useState("file");
  const [src, setSrc] = useState("");
  const [color, setColor] = useState("");
  let defaultReader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  let defaultFile: File | undefined;
  const [file, setFile] = useState(defaultFile);
  useEffect(() => {
    loadFile(inputType, src, color, file, setImage);
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
