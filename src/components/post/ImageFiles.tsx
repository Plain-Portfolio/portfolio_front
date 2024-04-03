import React, { useEffect, useRef, useState } from "react";
import { SectionCol, SectionRow } from "../SectionDirection";
import { BorderButton, Input } from "../CommonTag";
import styled from "styled-components";
import ImagePreview from "./ImagePreview";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IdNumberArr, IprojectImgs } from "../../interfaces/IPost";

type Props = {
  onFilesChange: (files: IdNumberArr) => void;
  defaultimages: IprojectImgs[] | undefined;
};

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

const uploadImages = async (files: File[]) => {
  console.log(files);
  const imageData = new FormData();
  const promises = files.map(async (file) => {
    imageData.append("images", file);

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/image/upload`,
      imageData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return res.data;
  });

  const responseReslut = (await Promise.all(promises)) as IprojectImgs[];
  return responseReslut;
};

const ImageFiles = ({ onFilesChange, defaultimages }: Props) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  //memo 지혜: 이미지 파일명
  const [fileName, setFileName] = useState<string>("");
  //memo 지혜 : 이미지 파일 아이디 배열( 상위 컴포넌트로 lifting up . 폼제출용)
  const [filesIds, setFilesIds] = useState<{ id: number }[]>([]);
  //memo 지혜: id와 src배열 ( 업로드 성공시 리턴 값 또는 수정모드일때 받아온 이미지 데이터 )
  const [uploaded, setUploaded] = useState<IprojectImgs[]>([]);
  //memo 지혜: 업로드 파일배열
  const [files, setFiles] = useState<File[]>([]);

  const { mutate: uploadMutate } = useMutation({
    mutationFn: () => uploadImages(files),
    onSuccess: (data) => {
      console.log("upload api");
      // memo지혜: 업로드 성공시 리턴 값 상태에 할당 후, 이미지프리뷰에 사용
      const imageArr = data;
      setUploaded(imageArr);

      // memo지혜: 해당 게시글에 속한 이미지 파일 id 배열
      const idArray = imageArr.map((image) => {
        return { id: image.id };
      });
      console.log("idArray", idArray);
      setFilesIds(idArray);
    },
    onError: (error) => {
      console.error("Error uploadImages:", error);
    },
  });
  // memo지혜: 이미지 업로드 함수
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const files = target.files as FileList;

    if (files === undefined) {
      return;
    }
    const FilesToArray = Array.from(files);

    // memo지혜: 이미지 validation
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
    // memo지혜: File[]형식의 이미지 파일을 상태에 할당
    setFiles(validFiles);

    // memo지혜: 이미지 업로드 API trigger
    uploadMutate();
  };

  // memo지혜: 업로드 버튼 클릭시 이미지 인풋 open
  function handleFileButtonClick() {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  }

  // memo지혜: 지우기버튼 클릭시 초기화
  function handleReomveFiles() {
    setFileName("");
    setFilesIds([]);
    setUploaded([]);
  }

  // memo지혜: 업로드완료시 id에 대한 배열을 lifting up state
  useEffect(() => {
    onFilesChange(filesIds);
  }, [filesIds]);

  // memo지혜: 수정 모드시 이미지의 데이터 셋팅
  useEffect(() => {
    if (defaultimages) {
      setUploaded(defaultimages);
    }
  }, [defaultimages]);

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
          <label>이미지프리뷰</label>
          {uploaded ? (
            <ImagePreview files={uploaded} />
          ) : (
            <p>업로드된 이미지가 없습니다.</p>
          )}
        </ImagePreviewBoard>
      </SectionRow>
    </SectionCol>
  );
};
const ImageInput = styled.input`
  display: none;
`;
const FileButton = styled(BorderButton)`
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
