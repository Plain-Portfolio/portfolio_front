import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Section, SectionRow } from "../components/SectionDirection";
import { Container, FillButton, Input, Label } from "../components/CommonTag";
import ImageFiles from "../components/Post/ImageFiles";
import CategoryInput from "../components/Post/CategoryInput";
import TeamInput from "../components/Post/TeamInput";
import Layout from "../components/Layout/Layout";
import {
  Icategory,
  IdNumberArr,
  Imember,
  PostFormData,
} from "../interfaces/IPost";
import { Iproject } from "../interfaces/IDetail";
import { useProjectData } from "../hooks/projecthooks";
import styled from "styled-components";

const Post = () => {
  const userId = localStorage.getItem("user_id");

  const params = useParams();
  const projectId = params.id;
  //memo지혜: 수정모드일 경우 url이 /edit/:number 이므로 parasm.id로 판단
  const edit = !!projectId;

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const githubLinkRef = useRef<HTMLInputElement>(null);

  // memo지혜: 수정모드시, project 정보를 상태관리
  const [project, setProject] = useState<Iproject>();
  // memo지혜: 이미지 id에 대한 상태관리
  const [imageFiles, setImageFiles] = useState<IdNumberArr>([]);
  // memo지혜: 생성모드시, post 정보를 상태관리
  const [formData, setFormData] = useState<PostFormData>({
    isTeamProject: true,
    projectCategories: [],
    teamProjectMembers: [],
    projectImgs: [],
  });

  // memo지혜: 생성, 수정 mutation custom hook
  const { isLoading, data, isError, error, createMutate, updateMutate } =
    useProjectData(projectId);

  // memo지혜: 수정모드에서 get요청이 성공하면 project에 상태을 할당
  //          data는 기본 undefined로 data를 받아온 경우에서 setting됨
  useEffect(() => {
    data && setProject(data);
    // console.log(data);
  }, [data]);

  // memo지혜: 이미지 변경에 따른 상태관리
  const handleImageChange = (newFiles: IdNumberArr) => {
    setImageFiles(newFiles);
  };

  // memo지혜: 카테고리 변경에 따른 상태관리
  const handleCategoryChange = (projectCategories: Icategory[]) => {
    // memo지혜: 카테고리 {id: number} 의 배열형태로 배열생성
    const catgoryIds = projectCategories.map(({ id }) => ({
      categoryId: id,
    }));

    setFormData((prevData) => ({
      ...prevData,
      projectCategories: catgoryIds,
    }));
  };

  // memo지혜: 팀/개인 및 맴버 변경에 따른 상태관리
  const handleTeamChange = (
    isTeamProject: boolean,
    teamProjectMembers: Imember[]
  ) => {
    // memo지혜: 맴버 {id: number} 의 배열형태로 배열생성
    const memberIds = teamProjectMembers.map(({ id }) => ({ userId: id }));
    setFormData((prevData) => ({
      ...prevData,
      isTeamProject,
      teamProjectMembers: memberIds,
    }));
  };

  // memo지혜: 생성 폼 제출
  const handleSubmit = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const githubLink = githubLinkRef.current?.value;

    const { isTeamProject, projectCategories, teamProjectMembers } = formData;

    // memo지혜: validation
    if (
      !title ||
      !description ||
      !githubLink ||
      projectCategories.length < 1 ||
      imageFiles.length < 1 ||
      (isTeamProject && teamProjectMembers.length < 1)
    ) {
      alert("모든 입력창에 값을 넣어주세요.");
      return;
    }

    // memo지혜: 생성 or 수정 폼
    const postData = {
      title,
      description,
      githubLink,
      isTeamProject,
      ownerId: Number(userId),
      projectCategories,
      teamProjectMembers,
      projectImgs: imageFiles,
    } as PostFormData;
    console.log(postData);

    // memo지혜: 생성 or 수정 폼 api호출
    if (!edit) {
      createMutate(postData);
    } else {
      updateMutate(postData);
    }
  };

  return (
    <Layout>
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
                  onFilesChange={(newFiles: IdNumberArr) =>
                    handleImageChange(newFiles)
                  }
                  defaultimages={
                    edit && project ? project.projectImgs : undefined
                  }
                />
              </Section>
              <CategoryInput
                onChangeCategory={(projectCategories: Icategory[]) =>
                  handleCategoryChange(projectCategories)
                }
                defaultCategories={
                  edit && project ? project.projectCategories : undefined
                }
              />
              <TeamInput
                onChagneTeam={(
                  isTeamProject: boolean,
                  teamProjectMembers: Imember[]
                ) => handleTeamChange(isTeamProject, teamProjectMembers)}
                defaultIsTeam={edit && project && project.isTeamProject}
                defaultTeamMember={
                  edit && project ? project.teamProjectMembers : []
                }
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
          <PostButton
            type="submit"
            onClick={handleSubmit}
            value={edit ? "수정하기" : "게시하기"}
          ></PostButton>
        </PostForm>
      </PostContainer>
    </Layout>
  );
};

const PostContainer = styled(Container)`
  margin: 14rem 0;
`;
const PostForm = styled.form``;
const PostContent = styled.div`
  border: 1px solid ${({ theme }) => theme.color.darkgray};
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
  border-bottom: 0.2rem solid ${({ theme }) => theme.color.darkgray};
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
  border: 1px solid ${({ theme }) => theme.color.darkgray};
  border-radius: 2.5rem;
  margin: 6.42rem 0;
  padding: 3.3rem 2.2rem;
  font-size: 1.8rem;
  resize: none;
  outline: none;
`;
const PostButton = styled(FillButton)`
  width: 80%;
  margin: 0 10%;
  border-radius: 2.5rem;
  font-size: 2.5rem;
  padding: 2rem;
  margin-top: 4.2rem;
`;

export default Post;
