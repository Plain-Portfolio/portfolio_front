import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../../components/CommonTag";
import { SectionCol, SectionRow } from "../../components/SectionDirection";
import Carousel from "../../components/Detail/Carousel";
import { Ilike, Iproject } from "../../interfaces/IDetail";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { getToken } from "../../utils/token";
import { useProjectData } from "../../hooks/projecthooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled, { css } from "styled-components";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import Comment from "../../components/Detail/Comment";
import DetailSkeleton from "../../components/Skeleton/DetailSkeleton";

// memo지혜 : 좋아요, 좋아요 취소 API
const likeProject = async ({
  projectId,
  liked,
}: {
  projectId: string;
  liked: boolean;
}) => {
  const url = liked
    ? `${process.env.REACT_APP_API_URL}/like/cancel`
    : `${process.env.REACT_APP_API_URL}/like/add`;
  const method = liked ? "delete" : "post";
  const data = { projectId };
  const headers = { Authorization: `${getToken()}` };

  const res = await axios({
    method,
    url,
    data,
    headers,
  });

  return res.data;
};

const Detail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.id;
  const userId = localStorage.getItem("user_id");

  // memo지혜 : 프로젝트 상태관리
  const [project, setProject] = useState<Iproject>();
  // memo지혜 : 좋아요 상태관리
  const [liked, setLiked] = useState<boolean>(false);

  const queryClient = useQueryClient();

  // memo지혜 : 프로젝트 get, delete custom hooks
  const { isLoading, data, isError, error, deleteMutate } =
    useProjectData(projectId);

  useEffect(() => {
    if (data) {
      const { likes, ...projectInfo } = data;
      //memo지혜: 게시물에 사용자가 좋아요를 했는지 확인하는 함수
      const isLiked = likes.some(
        (like: Ilike) => like.userId === Number(userId)
      );

      if (isLiked) {
        setLiked(isLiked);
      }
      setProject({ ...projectInfo, likes });
    }
  }, [data]);

  const { mutate: likeMutate } = useMutation({
    mutationFn: likeProject,
    onSuccess: (data) => {
      // memo지혜: like api 호출후 fetchdata키를 가진 캐시 무효화
      //           그 결과 refetch
      queryClient.invalidateQueries({
        queryKey: ["fetchdata", projectId as string],
      });
      setLiked(!liked);
    },
    onError: (error) => {
      console.error("Error liking/disliking project:", error);
    },
  });

  const handleRemoveProject = () => {
    projectId && deleteMutate(projectId);
  };

  const handleLike = async () => {
    projectId && likeMutate({ projectId, liked });
  };

  if (isLoading) {
    return (
      <Layout>
        <DetailSkeleton />
      </Layout>
    );
  }

  return (
    <Layout>
      <ReadContainer>
        <ReadBorder>
          <ReadTitle>{project?.title}</ReadTitle>
          {project?.owner.id === Number(userId) && (
            <ButtonGruop>
              <UpdButton
                type="button"
                onClick={() => navigate(`/edit/${projectId}`)}
                value="수정하기"
              />
              <DelButton
                type="button"
                onClick={handleRemoveProject}
                value="삭제하기"
              />
            </ButtonGruop>
          )}
          <ReadContent>
            <SectionLeft>
              <Carousel images={project ? project.projectImgs : []} />
              <LikeInfo>
                <Ul>
                  <Li color="white">
                    {liked ? (
                      <HiHeart size="32" color="#f00" onClick={handleLike} />
                    ) : (
                      <HiOutlineHeart size="32" onClick={handleLike} />
                    )}
                    <LikeCount>{project?.likes.length}</LikeCount>
                  </Li>
                  <Li color="white">
                    <Author>{project?.owner.email}</Author>
                  </Li>
                </Ul>
              </LikeInfo>
              <Comment projectId={projectId} />
            </SectionLeft>
            <SectionRight>
              <ul>
                <Li>
                  <Badge background="white">
                    {project?.isTeamProject ? "팀" : "개인"}
                  </Badge>
                  {project?.isTeamProject &&
                    project.teamProjectMembers.map((member) => (
                      <Badge key={member.userId}>{member.nickname}</Badge>
                    ))}
                </Li>
                <Li>
                  <label>카테고리</label>
                  {project?.projectCategories.map((category) => (
                    <Badge key={category.id}>{category.name}</Badge>
                  ))}
                </Li>
                <Li>
                  <label>깃링크</label>
                  <span>{project?.githubLink}</span>
                </Li>
                <Li>
                  <label>줄글</label>
                  <div>{project?.description}</div>
                </Li>
              </ul>
            </SectionRight>
          </ReadContent>
        </ReadBorder>
      </ReadContainer>
    </Layout>
  );
};

export default Detail;

const ReadContainer = styled(Container)`
  margin: 14rem 0;
`;

const ReadBorder = styled.div`
  width: 70%;
  height: 100%;
  padding: 4.9rem 4.7rem;
  border-radius: 2.5rem;
  border: 0.3rem solid ${({ theme }) => theme.color.darkGreen};
`;
const ButtonGruop = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  & > input:first-child {
    margin-right: 1rem;
  }
`;
const ReadTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 900;
  padding: 2rem;
  border-bottom: 0.2rem solid ${({ theme }) => theme.color.darkGreen};
`;
const ReadContent = styled(SectionRow)`
  padding: 5rem 0;
  height: 100%;
  justify-content: space-between;
`;
const Author = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 3rem;
`;
const Badge = styled.span<{ background?: string }>`
  display: inline-block;
  font-size: 1.3rem;
  min-width: 4rem;
  text-align: center;
  border-radius: 1rem;
  padding: 1rem;
  color: white;
  background-color: ${({ theme }) => theme.color.mainGreen};
  line-height: 1.2rem;

  ${({ background, theme }) =>
    background &&
    css`
      background-color: ${background};
      color: black;
      border: 0.3rem solid ${theme.color.mainGreen};
    `};

  &:not(:last-child) {
    margin-right: 0.3rem;
  }
`;
const CommonButton = styled(Button)`
  flex-basis: 7rem;
  padding: 1rem;
  border: 0.3rem solid ${({ theme }) => theme.color.darkGreen};
  background-color: white;
`;
const UpdButton = styled(CommonButton)``;
const DelButton = styled(CommonButton)``;

const SectionLeft = styled(SectionCol)`
  flex-grow: 4;
  flex-basis: 40%;
  margin-right: 2rem;

  & > div:not(:first-child) {
    margin-top: 2rem;
  }
`;
const SectionRight = styled(SectionCol)`
  flex-grow: 6;
  flex-basis: 60%;
  justify-content: flex-start;
  padding: 2rem;
  border-radius: 2rem;
  border: 0.2rem solid ${({ theme }) => theme.color.darkgray};
`;
const LikeInfo = styled.div`
  flex-grow: 1;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.color.mainGreen};
`;
const LikeCount = styled.span`
  line-height: 3rem;
`;
const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
`;
const Li = styled.li<{ color?: string }>`
  display: flex;
  margin: 1rem 0.8rem;
  font-size: 1.2rem;

  ${({ color }) => color && `color: white;`}

  & > label {
    font-size: 1.3rem;
    font-weight: 700;
    flex-basis: 7rem;
    margin-right: 1rem;
  }
  & > span,
  div {
    font-size: 1.3rem;
  }
`;
