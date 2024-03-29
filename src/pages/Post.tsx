import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section, SectionRow } from "../components/SectionDirection";
import { Container, Input, Label } from "../components/CommonTag";
import Header from "../components/Header/Header";
import ImageFiles from "../components/post/ImageFiles";
import CategoryInput from "../components/post/CategoryInput";
import TeamInput from "../components/post/TeamInput";
import { Icategory, Imember, PostFormData } from "../interfaces/IPostFormData";
import styled from "styled-components";
import { getToken } from "../utils/token";
import axios from "axios";

const Post = () => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const githubLinkRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    description: "",
    githubLink: "",
    isTeamProject: true,
    ownerId: 16,
    projectCategories: [],
    teamProjectMembers: [],
    projectImgs: [],
  });

  const handleImageChange = (newFiles: File[]) => {
    setFormData((prevData) => ({
      ...prevData,
      projectImgs: newFiles,
    }));
  };

  const handleCategoryChange = (projectCategories: Icategory[]) => {
    const catgoryIds = projectCategories.map((categroy) => ({
      id: categroy.id,
    }));
    setFormData((prevData) => ({
      ...prevData,
      projectCategories: catgoryIds,
    }));
  };

  const handleTeamChange = (
    isTeamProject: boolean,
    teamProjectMembers: Imember[]
  ) => {
    const memberIds = teamProjectMembers.map((member) => ({ id: member.id }));
    setFormData((prevData) => ({
      ...prevData,
      isTeamProject,
      teamProjectMembers: memberIds,
    }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const imageData = new FormData();
    const {
      isTeamProject,
      ownerId,
      projectCategories,
      projectImgs,
      teamProjectMembers,
    } = formData;

    if (projectImgs) {
      projectImgs.forEach((projectImg) => {
        imageData.append("file", projectImg);
      });
    }

    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const githubLink = githubLinkRef.current?.value;
    // console.log(
    //   title,
    //   description,
    //   githubLink,
    //   isTeamProject,
    //   ownerId,
    //   projectCategories,
    //   teamProjectMembers
    // );
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/project/create`,
      {
        title,
        description,
        githubLink,
        isTeamProject,
        ownerId,
        projectCategories,
        teamProjectMembers,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
      }
    );
    const createdId = res.data.id;

    await axios.post(
      `${process.env.REACT_APP_API_URL}/project/create`,
      imageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    navigate(`/read/${createdId}`);
  };

  return (
    <>
      <Header />
      <PostContainer>
        <PostForm>
          <PostContent>
            <PostTitle
              id="title"
              type="text"
              ref={titleRef}
              placeholder="프로젝트 제목을 입력하세요."
            />
            <PostDescription
              id="description"
              ref={descriptionRef}
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
              <CategoryInput
                onChangeCategory={(projectCategories: Icategory[]) =>
                  handleCategoryChange(projectCategories)
                }
              />
              <TeamInput
                onChagneTeam={(
                  isTeamProject: boolean,
                  teamProjectMembers: Imember[]
                ) => handleTeamChange(isTeamProject, teamProjectMembers)}
              />
              <Section>
                <Label>GITHUB</Label>
                <SectionRow>
                  <Input
                    id="githubLink"
                    type="text"
                    ref={githubLinkRef}
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
    </>
  );
};

const PostContainer = styled(Container)``;
const PostForm = styled.form`
  margin: 14rem 0;
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
