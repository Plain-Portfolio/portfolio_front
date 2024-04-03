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
    console.log(response);
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

  const userId = localStorage.getItem("user_id") as string;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const projectData = await fetchProjectData(userId);
      setProjects(projectData);
    };
    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  const handleShowSummary = (idx: number) => {
    setSelectedProjectIdx(idx === selectedProjectIdx ? null : idx);
  };

  return (
    <MyProjectPage>
      <Header />
      <MyProfileWrapper>
        <MyProfileImg>프로필 사진</MyProfileImg>
        <MyProfile>Contact To &rarr;</MyProfile>
      </MyProfileWrapper>

      <MyProjectWrapper>
        {projects.length > 0 ? (
          projects.map((project, idx) => {
            return (
              <MyProjectList key={idx}>
                <ProjectContainer>
                  <ProjectList onClick={() => handleShowSummary(idx)}>
                    {project.title}
                  </ProjectList>
                  <MoveToDetail
                    onClick={() => navigate(`/read/${project.projectId}`)}
                  >
                    구경하러 가기 &rarr;
                  </MoveToDetail>
                </ProjectContainer>
                {selectedProjectIdx === idx && (
                  <ProjectSummary
                    style={{
                      display: selectedProjectIdx === idx ? "block" : "none",
                    }}
                  >
                    {project.description}
                  </ProjectSummary>
                )}
              </MyProjectList>
            );
          })
        ) : (
          <ProjectContainer>아직 프로젝트가 없습니다...</ProjectContainer>
        )}
      </MyProjectWrapper>
    </MyProjectPage>
  );
}

const MyProjectPage = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
`;

const MyProfileWrapper = styled.div`
  display: flex;
  padding: 20px;
`;

const MyProfileImg = styled.div`
  width: 220px;
  height: 300px;
  overflow: hidden;
  border-radius: 50px;
  background-color: #39bc56;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const MyInfo = styled.div`
//   display: flex;
// `;

const MyProfile = styled.div`
  width: 500px;
  height: 150px;
  margin-left: 20px;
  border: 1px solid #39bc56;
  text-align: left;
  padding: 20px;
  border-radius: 20px;
  margin-top: auto;
`;

const MyProjectWrapper = styled.div`
  display: grid;
  flex-direction: column;
  padding: 10px;
  gap: 15px;
  margin-top: 50px;
`;

const MyProjectList = styled.div`
  display: grid;
`;

const ProjectContainer = styled.div`
  display: flex;
  //align-items: center;
  //justify-content: space-between;
  //background-color: #e7f7e2;
  border: 1px solid #39bc56;
  padding: 10px;
  padding-bottom: 10px;
  border-radius: 15px;
  cursor: pointer;
`;

const ProjectList = styled.div`
  width: 600px;
  flex-grow: 1;
`;

const ProjectSummary = styled.div`
  width: 700px;
  margin-top: 10px;
  background-color: green;
  // flex-grow: 1;
`;

const MoveToDetail = styled.span`
  font-weight: bold;
  cursor: pointer;
`;

export default MyProject;
