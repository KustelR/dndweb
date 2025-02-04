import React from "react";

type LabeledInputProps = {
  onChange: (val0: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id: string;
};

export default function LabeledInput(props: LabeledInputProps) {
  const { onChange, label, id } = props;
  return (
    <>
      <label htmlFor={id}>{label ? label : id}</label>
      <input className="text-black" id={id} onChange={onChange} type="text" />
    </>
  );
}
