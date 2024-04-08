import styled from "styled-components";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectData } from "../interfaces/IProjectData";

function UserProjectList() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [userIntro, setUserIntro] = useState<string>("");
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(
    null
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { userId } = useParams();
  const navigate = useNavigate();

  // memo지은: useLocation으로 Home에서 Intro 받아오는 방식으로 변경 예정
  useEffect(() => {
    const fetchProjectData = async (userId: string) => {
      await axios
        .get<ProjectData[]>(
          `${process.env.REACT_APP_API_URL}/project/${userId}/projects`
        )
        .then((response) => {
          setProjects(response.data);
          setUserIntro(
            response.data[0]?.owner?.introduction ?? "소개글이 없습니다"
          );
        })
        .catch((error) => {
          if (error.response.data.status === 1029) {
            console.log(
              "400 error :: 해당 유저의 프로젝트가 존재하지 않습니다"
            );
            setProjects([]);
            setUserIntro("소개글을 가져올 수 없습니다");
          }
        });
    };
    if (userId) {
      fetchProjectData(userId);
    }
  }, [userId]);

  const handleShowSummary = (idx: number) => {
    setSelectedProjectIdx(idx === selectedProjectIdx ? null : idx);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  return (
    <UserProjectPage>
      <Header type="List" />
      <UserProfileWrapper>
        <UserProfileImg>프로필 사진</UserProfileImg>
        <UserProfile>{userIntro}</UserProfile>
      </UserProfileWrapper>

      <ProjectCategoryWrapper>
        {projects
          .flatMap((project) => project.projectCategories)
          .filter(
            (category, index, self) =>
              index === self.findIndex((c) => c.name === category.name)
          )
          .map((category, idx) => (
            <CategoryButton
              key={idx}
              onClick={() => handleCategoryClick(category.name)}
              active={selectedCategories.includes(category.name) ? 1 : 0}
            >
              {category.name}
            </CategoryButton>
          ))}
      </ProjectCategoryWrapper>

      <ProjectListWrapper>
        {projects.length > 0 ? (
          projects
            .filter((project) =>
              selectedCategories.length === 0
                ? true
                : project.projectCategories.some((category) =>
                    selectedCategories.includes(category.name)
                  )
            )
            .map((project, idx) => {
              return (
                <ProjectContainer
                  key={idx}
                  onClick={() => handleShowSummary(idx)}
                >
                  <CardFront
                    style={{
                      transform:
                        selectedProjectIdx === idx
                          ? "rotateY(-180deg)"
                          : "rotateY(0deg)",
                    }}
                  >
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectImg src={project.projectImgs[0].src} />
                  </CardFront>
                  <CardBack
                    style={{
                      transform:
                        selectedProjectIdx === idx
                          ? "rotateY(0deg)"
                          : "rotateY(180deg)",
                    }}
                  >
                    {selectedProjectIdx === idx && (
                      <ProjectSummaryContainer>
                        <ProjectSummary>{project.description}</ProjectSummary>
                        {project.isTeamProject === true ? (
                          <ProjectSummary>팀 프로젝트</ProjectSummary>
                        ) : (
                          <ProjectSummary>개인 프로젝트</ProjectSummary>
                        )}
                        <MoveToDetail
                          onClick={() => navigate(`/read/${project.projectId}`)}
                        >
                          자세히 보기 &rarr;
                        </MoveToDetail>
                      </ProjectSummaryContainer>
                    )}
                  </CardBack>
                </ProjectContainer>
              );
            })
        ) : (
          <ProjectContainer>아직 프로젝트가 없습니다...</ProjectContainer>
        )}
      </ProjectListWrapper>
    </UserProjectPage>
  );
}

export default UserProjectList;

const UserProjectPage = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  padding-bottom: 100px;
`;

// User Info
const UserProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  margin-bottom: 50px;
`;

const UserProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  //
  width: 220px;
  height: 220px;
  //
  overflow: hidden;
  border-radius: 30%;
  background-color: #39bc56;
`;

const UserProfile = styled.div`
  width: 500px; // auto
  height: 200px; // auto
  margin-left: 20px;
  background-color: #d3d3d3;
  text-align: left;
  padding: 20px;
  border-radius: 20px;
  margin-top: 10px;
`;

// Category
const ProjectCategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const CategoryButton = styled.div<{ active: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
  margin-right: 10px;
  border-radius: 40px;
  border: 1px solid ${(props) => (props.active ? "#39bc56" : "#999")};
  color: ${(props) => (props.active ? "#39bc56" : "#000")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  &:hover {
    opacity: 0.7;
  }
`;

// Project List - CardFront + CardBack
const ProjectListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
  padding: 10px;
`;

const ProjectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* perspective: 1000px; */
`;

// Card Front
const CardFront = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  background-color: #d3d3d3;
  padding: 10px;
  border-radius: 15px;

  backface-visibility: hidden;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
  cursor: pointer;
`;

const ProjectTitle = styled.div`
  text-align: center;
  padding: 10px;
`;

const ProjectImg = styled.img`
  width: 100%;
  height: 90%;
  object-fit: contain;
`;

// Card Back
const CardBack = styled.div`
  backface-visibility: hidden;
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
  position: absolute;
`;

const ProjectSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 400px;
  height: 300px;
  background-color: #39bc56;
  border-radius: 15px;
`;

const ProjectSummary = styled.span`
  margin: 10px;
`;

const MoveToDetail = styled.span`
  padding: 10px;
  margin-top: auto;
  align-self: center;
  font-weight: bold;
  cursor: pointer;
`;
