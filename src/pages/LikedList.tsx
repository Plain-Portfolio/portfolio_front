import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import styled from "styled-components";

interface LikedData {
  projectId: number;
  title: string;
  description: string;
  githubLink: string;
  isTeamProject: boolean;
  projectCategories: { name: string; id: number }[];
  projectImgs: { id: number; src: string }[];
  likes: { likeId: number; userId: number }[];
  teamProjectMembers: { userId: number; nickname: string }[];
}

function LikedList() {
  const [likedProjects, setLikedProjects] = useState<LikedData[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get<{ likeProjects: LikedData[] }>(
        `${process.env.REACT_APP_API_URL}/like/my/projects`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setLikedProjects(response.data.likeProjects);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  return (
    <LikedListWrapper>
      <Header />
      userId 님이 좋아요 한 프로젝트 목록입니다.
      <ListContainer>
        {likedProjects.map((project) => (
          <Project key={project.projectId}>{project.title}</Project>
        ))}
      </ListContainer>
    </LikedListWrapper>
  );
}

export default LikedList;

const LikedListWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 8rem;
  padding: 2rem;
`;

const ListContainer = styled.div`
  width: 100%;
`;

const Project = styled.div`
  margin: 2rem;
  padding: 2rem;
`;
