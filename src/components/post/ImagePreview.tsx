import styled from "styled-components";
import { IprojectImgs } from "../../interfaces/IPost";
import { useEffect, useState } from "react";

type Props = { files: IprojectImgs[] };

const ImagePreview = ({ files }: Props) => {
  const [previews, setPrviews] = useState<IprojectImgs[]>([]);
  useEffect(() => {
    if (files.length) {
      setPrviews(previews);
    }
  }, [files]);

  return (
    <>
      <PreviewList>
        {previews.map((preview) => (
          <PreviewItme key={preview.id}>
            <PreviewImg src={preview.src} alt={preview.alt} />
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
