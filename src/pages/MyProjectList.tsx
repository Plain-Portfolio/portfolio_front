import styled from "styled-components";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProjectData } from "../interfaces/IProjectData";

// axios.get.ProjectData
const fetchProjectData = async (userId: number) => {
  try {
    const response = await axios.get<ProjectData[]>(
      `http://158.247.243.170:8080/project/${userId}/projects`
    );
    //console.log(response);
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

  const userId = 21; //IUserts > LoginUser.id
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const projectData = await fetchProjectData(userId);
      setProjects(projectData);
    };
    fetchProjects();
  }, [userId]);

  return (
    <MyProjectPage>
      <Header />
      <MyProfileWrapper>
        <MyProfileImg>프로필 사진</MyProfileImg>
        <MyProfile>Personal Information</MyProfile>
      </MyProfileWrapper>

      <MyProjectWrapper>
        {projects.length > 0 ? (
          projects.map((project, idx) => {
            return (
              <ProjectContainer key={idx}>
                <ProjectList>{project.title}</ProjectList>
                <MoveToDetail
                  onClick={() =>
                    navigate({
                      /* /project/{projectId} */
                    })
                  }
                >
                  구경하러 가기 &rarr;
                </MoveToDetail>
              </ProjectContainer>
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
`;

const MyProfileWrapper = styled.div`
  display: flex;
`;

const MyProfileImg = styled.div`
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #39bc56;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyProfile = styled.div`
  width: 500px;
  margin-left: 20px;
  background-color: #d6e1d9;
  text-align: left;
  padding: 20px;
  border-radius: 20px;
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
  //align-items: center;
  //justify-content: space-between;
  background-color: #e7f7e2;
  padding: 10px;
  padding-bottom: 10px;
  border-radius: 15px;
  cursor: pointer;
`;

const ProjectList = styled.div`
  width: 600px;
  flex-grow: 1;
`;

const MoveToDetail = styled.span`
  font-weight: bold;
  cursor: pointer;
`;

export default MyProject;
