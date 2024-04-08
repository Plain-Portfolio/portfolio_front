import { ForwardedRef, forwardRef } from "react";
import { Input } from "../CommonTag";

interface InputWithEnterProps {
  placeholder: string;
  onEnter: (value: string) => void;
  [rest: string]: any;
}

function onClearInput(ref: React.MutableRefObject<HTMLInputElement>) {
  ref.current.value = "";
}

const InputWithEnter = forwardRef(
  (props: InputWithEnterProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { placeholder, onEnter, ...rest } = props;

    const input = ref as React.MutableRefObject<HTMLInputElement>;

    const handleOnKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
      if (e.key === "Enter" && input?.current && input.current.value !== "") {
        e.preventDefault();
        onEnter(input.current.value);
        onClearInput(input);
      }
    };

    return (
      <Input
        type="text"
        placeholder={placeholder}
        onKeyDown={handleOnKeyPress}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default InputWithEnter;
