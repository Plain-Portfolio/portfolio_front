import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Section, SectionRow } from "../components/SectionDirection";
import { Container, Input, Label } from "../components/CommonTag";
import Header from "../components/Header/Header";
import ImageFiles from "../components/Post/ImageFiles";
import CategoryInput from "../components/Post/CategoryInput";
import TeamInput from "../components/Post/TeamInput";
import { Icategory, Imember, PostFormData } from "../interfaces/IPost";
import { Iproject } from "../interfaces/IDetail";
import { useProjectData } from "../hooks/projecthooks";
import styled from "styled-components";

const Post = () => {
  const userId = localStorage.getItem("user_id");

  const params = useParams();
  const projectId = params.id;
  const edit = !!projectId;

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const githubLinkRef = useRef<HTMLInputElement>(null);
  const [project, setProject] = useState<Iproject>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<PostFormData>({
    isTeamProject: true,
    projectCategories: [],
    teamProjectMembers: [],
    projectImgs: [],
  });

  const { isLoading, data, isError, error, createMutate, updateMutate } =
    useProjectData(projectId);

  useEffect(() => {
    if (!isLoading && !isError) {
      setProject(data);
    }
  }, [data]);

  const handleImageChange = (newFiles: File[]) => {
    setImageFiles(newFiles);
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

    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const githubLink = githubLinkRef.current?.value;

    const { isTeamProject, projectCategories, teamProjectMembers } = formData;

    const imageData = new FormData();
    if (imageFiles) {
      imageFiles.forEach((imageFile) => {
        imageData.append("file", imageFile);
      });
    }

    if (
      !title ||
      !description ||
      !githubLink ||
      projectCategories.length < 1 ||
      imageFiles.length < 1 ||
      (isTeamProject && teamProjectMembers.length < 1)
    ) {
      alert("모두 입력해주세요.");
      return;
    }

    const postData = {
      title,
      description,
      githubLink,
      isTeamProject,
      ownerId: Number(userId),
      projectCategories,
      teamProjectMembers,
    };

    if (!edit) {
      createMutate(postData);
      // 이미지 업로드
      // await axios.post(
      //   `${process.env.REACT_APP_API_URL}/project/create`,
      //   imageData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //   }
      // );
    } else {
      updateMutate(postData);
    }
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
              defaultValue={edit && project ? project.title : ""}
            />
            <PostDescription
              id="description"
              ref={descriptionRef}
              placeholder="프로젝트에 대한 설명을 입력하세요."
              defaultValue={edit && project ? project.description : ""}
            />
            <div>
              <Section>
                <Label>이미지</Label>
                <ImageFiles
                  onFilesChange={(newFiles: File[]) =>
                    handleImageChange(newFiles)
                  }
                  // defaultimages = {edit && project ? project.member : ""}
                />
              </Section>
              <CategoryInput
                onChangeCategory={(projectCategories: Icategory[]) =>
                  handleCategoryChange(projectCategories)
                }
                // defaultCategories={edit && project ? project.category : ""}
              />
              <TeamInput
                onChagneTeam={(
                  isTeamProject: boolean,
                  teamProjectMembers: Imember[]
                ) => handleTeamChange(isTeamProject, teamProjectMembers)}
                defaultIsTeam={edit && project && project.isTeamProject}
                // defaultIsTeam={edit && project ? project.member : ""}
              />
              <Section>
                <Label>GITHUB</Label>
                <SectionRow>
                  <Input
                    id="githubLink"
                    type="text"
                    ref={githubLinkRef}
                    placeholder="https://github.com/..."
                    defaultValue={edit && project ? project.githubLink : ""}
                  />
                </SectionRow>
              </Section>
            </div>
          </PostContent>
          <PostButton type="submit" onClick={handleSubmit}>
            {edit ? "수정하기" : "게시하기"}
          </PostButton>
        </PostForm>
      </PostContainer>
    </>
  );
};

const PostContainer = styled(Container)`
  margin: 14rem 0;
`;
const PostForm = styled.form``;
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
