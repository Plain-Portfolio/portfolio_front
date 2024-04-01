import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../../components/CommonTag";
import { SectionCol, SectionRow } from "../../components/SectionDirection";
import Header from "../../components/Header/Header";
import Carousel from "../../components/Detail/Carousel";
import { Icomment, Iproject } from "../../interfaces/IDetail";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { getToken } from "../../utils/token";
import { useProjectData } from "../../hooks/projecthooks";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import axios from "axios";
import Layout from "../../components/Layout/Layout";

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

  const [project, setProject] = useState<Iproject>();
  const [comment, setComment] = useState<Icomment[]>([]);
  const [liked, setLiked] = useState<boolean>(false);

  const { isLoading, data, isError, error, deleteMutate } =
    useProjectData(projectId);

  useEffect(() => {
    setProject(data);
  }, [data]);

  const { mutate: likeMutate } = useMutation({
    mutationFn: likeProject,
    onSuccess: (data) => {
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

  return (
    <Layout>
      <ReadContainer>
        <ReadBorder>
          <ReadTitle>프로젝트제목</ReadTitle>
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
              <Carousel />
              <LikeInfo>
                <Ul>
                  <Li>
                    {liked ? (
                      <HiHeart size="32" color="#f00" onClick={handleLike} />
                    ) : (
                      <HiOutlineHeart size="32" onClick={handleLike} />
                    )}
                  </Li>
                  <Li>
                    <Author>{project?.owner.email}</Author>
                  </Li>
                </Ul>
              </LikeInfo>
              <Comment>댓글</Comment>
            </SectionLeft>
            <SectionRight>
              <ul>
                <Li>
                  <Badge>{project?.isTeamProject ? "팀" : "개인"}</Badge>
                  {/* 맴버 */}
                  {/* {project?.isTeamProject && members.map((member) => (
                      <Badge>{member.name}</Badge>
                    ))} */}
                </Li>
                <Li>
                  <label>카테고리</label>
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

const Badge = styled.span`
  display: inline-block;
  font-size: 1.2rem;
  min-width: 4rem;
  text-align: center;
  border-radius: 1rem;
  padding: 1rem;
  color: white;
  background-color: ${({ theme }) => theme.mainGreen};
`;
const Author = styled.span`
  font-size: 1.2rem;
  font-weight: 900;
  line-height: 3rem;
`;
const ReadBorder = styled.div`
  width: 70%;
  height: 100%;
  padding: 4.9rem 4.7rem;
  border-radius: 2.5rem;
  border: 1px solid ${({ theme }) => theme.darkgray};
  background-color: ${({ theme }) => theme.lightgray};
`;
const ButtonGruop = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  & > input:first-child {
    margin-right: 1rem;
  }
`;
const CommonButton = styled(Button)`
  flex-basis: 7rem;
  padding: 1rem;
  border: 0.3rem solid ${({ theme }) => theme.darkGreen};
`;
const UpdButton = styled(CommonButton)``;
const DelButton = styled(CommonButton)``;

const ReadTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 900;
  padding: 2rem;
  background-color: white;
`;
const ReadContent = styled(SectionRow)`
  padding: 5rem 0;
  height: 100%;
  justify-content: space-between;
`;
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
  background-color: white;
`;
const LikeInfo = styled.div`
  flex-grow: 1;
  background-color: white;
`;
const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  background-color: white;
`;
const Li = styled.li`
  display: flex;
  margin: 1rem 0.8rem;
  font-size: 1.2rem;

  & > label {
    font-size: 1.2rem;
    font-weight: 900;
    flex-basis: 5rem;
    margin-right: 1rem;
  }
`;

const Comment = styled.div`
  flex-grow: 6;
  flex-shrink: 0;
  background-color: white;
`;
