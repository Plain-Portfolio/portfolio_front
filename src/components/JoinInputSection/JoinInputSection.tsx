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
    <JoinInputWrapper>
      <SubtitleWithLimit>
        <Subtitle>{type}</Subtitle>
        {type === "selfIntroduction" ? (
          <Length>{value.length}/50</Length>
        ) : undefined}
      </SubtitleWithLimit>

      <InputContent>
        {textType === "file" ? (
          <ProfileImg style={{ backgroundImage: `url(${value})` }}></ProfileImg>
        ) : null}
        {textType === "file" ? (
          <FileWrapper>
            <FileLabel htmlFor="file">이미지 선택</FileLabel>
            <FileEx>jpg, png, jpeg, gif 파일을 지원합니다.</FileEx>
          </FileWrapper>
        ) : null}
        <JoinInput
          onChange={onChange}
          placeholder={placeholder}
          value={textType === "file" ? "" : value}
          type={textType}
          data-type={type}
          id={textType === "file" ? "file" : undefined}
          accept={
            textType === "file"
              ? "image/gif, image/jpeg, image/png, image/jpg"
              : ""
          }
          maxLength={type === "selfIntroduction" ? 50 : undefined}
        />
      </InputContent>

      <ErrorMsg>{isError && errorMsg}</ErrorMsg>
    </JoinInputWrapper>
  );
};
export default JoinInputSection;
const JoinInputWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const SubtitleWithLimit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Subtitle = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  padding-left: 1rem;
  padding-bottom: 0.4rem;
`;
const Length = styled.div`
  color: #39bc56;
  padding-right: 1.5rem;
`;
const InputContent = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;
const ProfileImg = styled.div`
  width: 8.2rem;
  height: 8.2rem;
  /* background-image: url(./assets/join/profile.png); */
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 4.5rem;
  border-radius: 5rem;
`;
const FileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
const FileLabel = styled.label`
  width: 12.2rem;
  height: 4.8rem;
  border-radius: 2.5rem;
  border: 0.1rem solid #d3d3d3;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: gray;
  font-weight: 700;
  cursor: pointer;
`;
const FileEx = styled.div`
  font-size: 1.3rem;
`;
const JoinInput = styled.input`
  display: ${(props) => (props.type === "file" ? "none" : "flex")};
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
