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
  // console.log(isError);
  return (
    <JoinInputWrapper>
      <Subtitle>{type}</Subtitle>
      <JoinInput
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type={textType}
        data-type={type}
      />

      <ErrorMsg>{isError && errorMsg}</ErrorMsg>
    </JoinInputWrapper>
  );
};
export default JoinInputSection;
const JoinInputWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const Subtitle = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  padding-left: 1rem;
  padding-bottom: 0.4rem;
`;
const JoinInput = styled.input`
  display: flex;
  width: 100%;
  height: 4.8rem;
  border-radius: 2.5rem;
  padding-left: 1.5rem;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
  border: 0.1rem solid #d3d3d3;
`;
const ErrorMsg = styled.div`
  font-size: 1.3rem;
  color: red;
  padding-left: 1.5rem;
  height: 1rem;
`;
