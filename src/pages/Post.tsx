import styled from "styled-components";
import { Section, SectionRow } from "../components/SectionDirection";
import { Input, Label } from "../components/CommonTag";
import ImageFiles from "../components/post/ImageFiles";
import CategoryInput from "../components/post/CategoryInput";
import TeamInput from "../components/post/TeamInput";
import { PostFormData } from "../interfaces/IPostFormData";
import { useState } from "react";

const Post = () => {
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    description: "",
    githubLink: "",
    teamProjectMembers: [],
    projectImgs: [],
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      title: event.target.value,
    }));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      description: event.target.value,
    }));
  };

  const handleGithubLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      githubLink: event.target.value,
    }));
  };

  const handleImageChange = (newFiles: File[]) => {
    const formData = new FormData();
    if (newFiles) {
      // formData.append("file", newFiles);
    }

    setFormData((prevData) => ({
      ...prevData,
      projectImgs: newFiles,
    }));
  };
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <PostContainer>
      <PostForm>
        <PostContent>
          <PostTitle
            id="title"
            type="text"
            onChange={handleTitleChange}
            placeholder="프로젝트 제목을 입력하세요."
          />
          <PostDescription
            id="description"
            onChange={handleDescriptionChange}
            placeholder="프로젝트에 대한 설명을 입력하세요."
          />
          <div>
            <Section>
              <Label>이미지</Label>
              <ImageFiles
                onFilesChange={(newFiles: File[]) =>
                  handleImageChange(newFiles)
                }
              />
            </Section>
            <CategoryInput />
            <TeamInput />
            <Section>
              <Label>GITHUB</Label>
              <SectionRow>
                <Input
                  id="githubLink"
                  type="text"
                  onChange={handleGithubLinkChange}
                  placeholder="https://github.com/..."
                />
              </SectionRow>
            </Section>
          </div>
        </PostContent>
        <PostButton type="submit" onClick={handleSubmit}>
          게시하기
        </PostButton>
      </PostForm>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const PostForm = styled.form`
  margin: 7.2rem 0;
`;
const PostContent = styled.div`
  width: 119.6rem;
  border: 1px solid ${({ theme }) => theme.darkgray};
  min-height: 91.5rem;
  border-radius: 2.5rem;
  padding: 4.9rem 4.7rem;

  // 스크롤바 숨기기
  -ms-overflow-style: none;
  scrollbar-width: none;
  & {
    ::-webkit-scrollbar {
      display: none; /* 크롬, 사파리, 오페라, 엣지 */
    }
  }
`;
const PostTitle = styled.input`
  width: 100%;
  border: none;
  border-bottom: 0.2rem solid ${({ theme }) => theme.darkgray};
  padding: 1rem;
  font-size: 2.5rem;
  font-weight: 900;
  &:hover,
  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    border-color: black;
  }
`;
const PostDescription = styled.textarea`
  width: 100%;
  height: 57.9rem;
  border: 1px solid ${({ theme }) => theme.darkgray};
  border-radius: 2.5rem;
  margin: 6.42rem 0;
  padding: 3.3rem 2.2rem;
  font-size: 1.8rem;
  resize: none;
  outline: none;
`;
const PostButton = styled.button`
  width: 100%;
  border-radius: 2.5rem;
  font-size: 2.5rem;
  font-weight: 900;
  padding: 2rem;
  margin-top: 4.2rem;
  background-color: ${({ theme }) => theme.mainGreen};
  color: white;
`;

export default Post;
