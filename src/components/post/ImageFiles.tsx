import React, { useEffect, useRef, useState } from "react";
import { SectionCol, SectionRow } from "../SectionDirection";
import { Button, Input } from "../CommonTag";
import styled from "styled-components";
import ImagePreview from "./ImagePreview";

type Props = { onFilesChange: (files: File[]) => void };

const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB
const MAX_FILE_NAME_VIEW = 5;

const getExtention = (filename: string): string => {
  const extensionIndex = filename.lastIndexOf(".");
  return extensionIndex === -1
    ? ""
    : filename.substring(extensionIndex + 1).toLowerCase();
};

const fileExtensionValid = ({ name }: { name: string }): boolean => {
  const extension = getExtention(name);
  if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === "") {
    return false;
  }
  return true;
};

const renderFileNames = (validFiles: File[]) => {
  if (validFiles.length <= MAX_FILE_NAME_VIEW) {
    return validFiles.map((file) => file.name).join(", ");
  }

  return `${validFiles
    .slice(0, MAX_FILE_NAME_VIEW)
    .map((file) => file.name)
    .join(", ")}외 ${validFiles.length - MAX_FILE_NAME_VIEW}개`;
};

const ImageFiles = ({ onFilesChange }: Props) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [files, setFiles] = useState<File[] | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = target.files as FileList;

    if (files === undefined) {
      return;
    }
    const FilesToArray = Array.from(files);

    const validFiles = FilesToArray.filter((file) => {
      if (!fileExtensionValid(file)) {
        alert(
          `${file.name}은 업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`
        );
        return false;
      }
      if (file.size > FILE_SIZE_MAX_LIMIT) {
        alert("업로드 가능한 최대 용량은 5MB입니다. ");
        return false;
      }
      return true;
    });

    setFileName(renderFileNames(validFiles));
    setFiles(validFiles);
  };

  function handleFileButtonClick() {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  }

  function handleReomveFiles() {
    setFileName("");
    setFiles(null);
  }

  useEffect(() => {
    if (files) onFilesChange(files);
  }, [files, onFilesChange]);

  return (
    <SectionCol>
      <SectionRow>
        <Input
          placeholder="이미지파일 파입을 업로드하세요. 최대 5MB."
          type="text"
          value={fileName}
          readOnly
        />
        <ImageInput
          type="file"
          accept="image/*"
          name="upload_image"
          multiple
          ref={imageInputRef}
          onChange={handleUpload}
        />
        <FileButton
          name="clear"
          type="button"
          value="지우기"
          onClick={handleReomveFiles}
        />
        <FileButton
          name="upload"
          type="button"
          value="업로드"
          onClick={handleFileButtonClick}
        />
      </SectionRow>
      <SectionRow>
        <ImagePreviewBoard>
          <label>이미지프리뷰</label>{" "}
          {!files && <p>업로드된 이미지가 없습니다.</p>}
          {files && <ImagePreview files={files} />}
        </ImagePreviewBoard>
      </SectionRow>
    </SectionCol>
  );
};
const ImageInput = styled.input`
  display: none;
`;
const FileButton = styled(Button)`
  margin-left: 1rem;
`;
const ImagePreviewBoard = styled.div`
  flex-grow: 1;
  height: 12rem;
  overflow-y: scroll;
  border-radius: 1.5rem;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.lightgray};
  padding: 1.3rem 1rem;
  & > label {
    font-weight: 900;
  }
  & > p {
    margin-top: 3.5rem;
  }
`;

export default ImageFiles;
