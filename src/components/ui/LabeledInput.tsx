import React from "react";

type LabeledInputProps = {
  onChange: (val0: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id: string;
  labelClass?: string;
  inputClass?: string;
  containerClass?: string;
};

export default function LabeledInput(props: LabeledInputProps) {
  const { onChange, label, id, labelClass, inputClass, containerClass } = props;
  return (
    <div className={containerClass ? containerClass : "block m-0 p-0"}>
      <label className={labelClass ? labelClass : ""} htmlFor={id}>
        {label ? label : id}
      </label>
      <input
        className={
          inputClass
            ? inputClass
            : "text-neutral-300 bg-neutral-700 focus:bg-neutral-600 focus:outline-none px-2 w-full"
        }
        id={id}
        onChange={onChange}
        type="text"
      />
    </div>
  );
}
