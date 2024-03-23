import React, { useCallback, useState } from "react";
import styled from "styled-components";

type Props = {
  value: string;
  placeholder: string;
  textType: string;
  type: string;
  errorMsg: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
};

const JoinInputSection = ({
  onChange,
  placeholder,
  value,
  type,
  textType,
  errorMsg,
  isError,
}: Props) => {
  return (
    <div>
      <JoinInput
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type={textType}
        data-type={type}
      />
      <ErrorMsg>{isError && errorMsg}</ErrorMsg>
    </div>
  );
};
export default JoinInputSection;
const JoinInput = styled.input`
  width: 428px;
  height: 48px;
  border-radius: 25px;
  padding-left: 15px;
  box-sizing: border-box;
  margin-bottom: 5px;
`;
const ErrorMsg = styled.div`
  font-size: 13px;
  color: red;
  padding-left: 15px;
  height: 10px;
`;
