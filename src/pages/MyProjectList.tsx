import styled from "styled-components";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProjectData } from "../interfaces/IProjectData";

const fetchProjectData = async (userId: string) => {
  try {
    const response = await axios.get<ProjectData[]>(
      `${process.env.REACT_APP_API_URL}/project/${userId}/projects`
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error fetching projects: ", error);
    return [];
  }
};

function MyProject() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(
    null
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // memo지은: Home에서 userList.id 넘겨받아 해당 유저의 리스트 보여주도록 변경 필요
  const userId = localStorage.getItem("user_id") as string;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async (userId: string) => {
      const projectData = await fetchProjectData(userId);
      setProjects(projectData);
    };
    if (userId) {
      fetchProjects(userId);
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
    <MyProjectPage>
      <Header />
      <MyProfileWrapper>
        <MyProfileImg>프로필 사진</MyProfileImg>
        <MyProfile>Contact To &rarr;</MyProfile>
      </MyProfileWrapper>

      <CategoryWrapper>
        {dummyDatas
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
      </CategoryWrapper>

      <MyProjectWrapper>
        {dummyDatas.length > 0 ? (
          dummyDatas
            .filter((project) =>
              selectedCategories.length === 0
                ? true
                : project.projectCategories.some((category) =>
                    selectedCategories.includes(category.name)
                  )
            )
            .map((project, idx) => {
              return (
                <>
                  <ProjectContainer key={idx}>
                    <ProjectTitle onClick={() => handleShowSummary(idx)}>
                      {project.title}
                    </ProjectTitle>
                    <MoveToDetail
                      onClick={() => navigate(`/read/${project.projectId}`)}
                    >
                      구경하러 가기 &rarr;
                    </MoveToDetail>
                  </ProjectContainer>
                  {selectedProjectIdx === idx && (
                    <ProjectSummaryContainer
                      style={{
                        display: selectedProjectIdx === idx ? "block" : "none",
                      }}
                    >
                      <ProjectSummary>{project.description}</ProjectSummary>
                      {project.isTeamProject === true ? (
                        <ProjectSummary>팀 프로젝트</ProjectSummary>
                      ) : (
                        <ProjectSummary>개인 프로젝트</ProjectSummary>
                      )}
                    </ProjectSummaryContainer>
                  )}
                </>
              );
            })
        ) : (
          <ProjectContainer>아직 프로젝트가 없습니다...</ProjectContainer>
        )}
      </MyProjectWrapper>
    </MyProjectPage>
  );
}

const dummyDatas = [
  {
    projectId: 0,
    title: "프로젝트1",
    description: "JavaScript, TypeScript, React",
    img: 1, // memo지은: 이미지 아이디로 지급되면 이미지 가져와서 쓰면 됨
    isTeamProject: true,
    projectCategories: [
      { name: "JavaScript", id: 0 },
      { name: "TypeScript", id: 1 },
      { name: "React", id: 2 },
    ],
  },
  {
    projectId: 1,
    title: "프로젝트2",
    description: "React, SpringBoot",
    img: 2,
    isTeamProject: true,
    projectCategories: [
      { name: "React", id: 2 },
      { name: "SpringBoot", id: 4 },
    ],
  },
  {
    projectId: 2,
    title: "프로젝트3",
    description: "React, Java, SpringBoot",
    img: 3,
    isTeamProject: false,
    projectCategories: [
      { name: "React", id: 2 },
      { name: "Java", id: 3 },
      { name: "SpringBoot", id: 4 },
    ],
  },
  {
    projectId: 4,
    title: "프로젝트4",
    description: "Vanila JavaScript",
    img: 4,
    isTeamProject: false,
    projectCategories: [{ name: "JavaScript", id: 0 }],
  },
  {
    projectId: 5,
    title: "프로젝트5",
    description: "JavaScript, TypeScript",
    img: 5,
    isTeamProject: false,
    projectCategories: [
      { name: "JavaScript", id: 0 },
      { name: "TypeScript", id: 1 },
    ],
  },
];

const MyProjectPage = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const MyProfileWrapper = styled.div`
  display: flex;
  padding: 20px;
  margin-bottom: 50px;
`;

const MyProfileImg = styled.div`
  width: 220px;
  height: 220px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #39bc56;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyProfile = styled.div`
  width: 400px;
  height: 150px;
  margin-left: 50px;
  background-color: #d3d3d3;
  text-align: left;
  padding: 20px;
  border-radius: 20px;
  margin-top: 45px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: -30px;
`;

const CategoryButton = styled.div<{ active: number }>`
  cursor: pointer;
  padding: 10px;
  margin-right: 10px;
  border-radius: 40px;
  border: 1px solid ${(props) => (props.active ? "#39bc56" : "#999")};
  color: ${(props) => (props.active ? "#39bc56" : "#000")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  &:hover {
    opacity: 0.8;
  }
`;

const MyProjectWrapper = styled.div`
  display: grid;
  flex-direction: column;
  padding: 10px;
  gap: 15px;
  margin-top: 50px;
`;

const ProjectContainer = styled.div`
  display: flex;
  background-color: #d3d3d3;
  padding: 10px;
  border-radius: 15px;
  cursor: pointer;
`;

const ProjectTitle = styled.div`
  width: 600px;
  flex-grow: 1;
  padding: 10px;
`;

const MoveToDetail = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  font-weight: bold;
  cursor: pointer;
`;

const ProjectSummaryContainer = styled.div`
  width: 700px;
  padding: 10px;
  flex-grow: 1;
`;

const ProjectSummary = styled.div`
  margin: 10px;
`;

export default MyProject;
