import React, { useEffect, useState } from "react";
import styled from "styled-components";

type PreviewImage = {
  src: string | null;
  name: string;
};

type Props = { files: File[] };

const ImagePreview = ({ files }: Props) => {
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

  useEffect(() => {
    const updatePreviews = async () => {
      const newPreviews = await Promise.all(
        files.map(async (file) => {
          const reader = new FileReader();
          const promise = new Promise((resolve) => {
            reader.onload = () =>
              resolve({ src: reader.result, name: file.name });
          });
          reader.readAsDataURL(file);
          return promise;
        })
      );
      setPreviewImages(newPreviews as PreviewImage[]);
    };

    updatePreviews();
  }, [files]);

  return (
    <>
      <PreviewList>
        {previewImages.map((image) => (
          <PreviewItme key={image.name}>
            {image.src && <PreviewImg src={image.src} alt={image.name} />}
          </PreviewItme>
        ))}
      </PreviewList>
    </>
  );
};

const PreviewList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
`;
const PreviewItme = styled.li`
  & + li:not(:first-child) {
    margin-left: 1rem;
  }
`;
const PreviewImg = styled.img`
  max-height: 7rem;
  width: 100%;
  height: 100%;
`;
export default ImagePreview;
