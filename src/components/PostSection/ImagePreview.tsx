import styled from "styled-components";
import { IprojectImgs } from "../../interfaces/IPost";

type Props = { files: IprojectImgs[] };

const ImagePreview = ({ files }: Props) => {
  return (
    <>
      <PreviewList>
        {files.map((file) => (
          <PreviewItme key={file.id}>
            <PreviewImg
              src={file.src ? file.src : file.imageSrc}
              alt={file.alt}
            />
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
