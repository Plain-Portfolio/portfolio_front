import styled from "styled-components";
import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ProjectData } from "../interfaces/IProjectData";
import { HiHeart } from "react-icons/hi";

function UserProjectList() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [userData] = useState<{ intro: string; imgSrc: string }>({
    intro: location.state?.intro ?? "소개글이 없습니다",
    imgSrc: location.state?.imgSrc ?? "",
  });
  // console.log("userIntro: ", userIntro);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(
    null
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjectData = async (userId: string) => {
      await axios
        .get<ProjectData[]>(
          `${process.env.REACT_APP_API_URL}/project/${userId}/projects`
        )
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          if (error.response.data.status === 1029) {
            console.log(
              "400 error :: 해당 유저의 프로젝트가 존재하지 않습니다"
            );
            setProjects([]);
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
      <Header />
      <LeftWrapper>
        <UserProfileContainer>
          <UserProfileImg src={userData.imgSrc} />
          <UserProfile>{userData.intro}</UserProfile>
        </UserProfileContainer>

        <CategoryContainer>
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
        </CategoryContainer>
      </LeftWrapper>

      <RightWrapper>
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
                <>
                  <ProjectContainer
                    key={idx}
                    onClick={() => handleShowSummary(idx)}
                  >
                    <ProjectImg src={project.projectImgs[0].src} />
                    <ProjectSummaryContainer>
                      <ProjectTitle
                        onClick={() => navigate(`/read/${project.projectId}`)}
                      >
                        {project.title}
                      </ProjectTitle>
                      <ProjectDesc>{project.description}</ProjectDesc>
                      <ProjectInfo>
                        <LikeContainer>
                          <HiHeart size="20" color="#f00" />
                          <HeartNum>{project.likes.length}</HeartNum>
                        </LikeContainer>
                        <Category>
                          {project.projectCategories.map((c, idx) => (
                            <CButton key={idx}>{c.name}</CButton>
                          ))}
                        </Category>
                      </ProjectInfo>
                    </ProjectSummaryContainer>
                  </ProjectContainer>
                  <hr />
                </>
              );
            })
        ) : (
          <ProjectContainer>아직 프로젝트가 없습니다...</ProjectContainer>
        )}
      </RightWrapper>
    </UserProjectPage>
  );
}

export default UserProjectList;

// 전체 Wrapper
const UserProjectPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin-top: 6rem;
`;

const LeftWrapper = styled.div`
  margin-top: 0.5rem;
`;

// Left Wrapper 1) UserProfileContainer: UserProfileImg + UserProfile
const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

const UserProfileImg = styled.img`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  width: 220px;
  height: 220px;
  overflow: hidden;
  border-radius: 50%;
`;

const UserProfile = styled.div`
  width: auto;
  height: auto;
  background-color: #d3d3d3;
  padding: 2rem;
  margin-top: 2rem;
  font-size: 1.3rem;
`;

// Left Wrapper 2) Category Container: Category Buttons
const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem;
  padding: 2rem;

  background-color: #d3d3d3;
`;

const CategoryButton = styled.div<{ active: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 5rem;
  border: 1px solid ${(props) => (props.active ? "#39bc56" : "#7d7d7d")};
  color: ${(props) => (props.active ? "#39bc56" : "#7d7d7d")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  &:hover {
    opacity: 0.7;
  }
`;

const RightWrapper = styled.div``;

// Right Wrapper 1) all projects list container
const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: 2rem;
  /* background-color: #d3d3d3; */
`;

// 1-1) img box
const ProjectImg = styled.img`
  align-self: center;
  width: 25rem;
  height: 20rem;
  object-fit: contain;
`;

// 1-2) Summary Container: title + desc + info(like+c.g)
const ProjectSummaryContainer = styled.div`
  display: grid;
  padding: 2rem;
`;

const ProjectTitle = styled.div`
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: #39bc56;
  }
`;

const ProjectDesc = styled.pre`
  padding-left: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 2;
`;

// 1-3) <LikeContainer> + <Category>
const ProjectInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5rem;
`;

const LikeContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1rem;
`;

const HeartNum = styled.span`
  padding: 0.5rem;
`;

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-left: auto;
`;

const CButton = styled.div`
  padding: 1rem;
  margin-left: 1rem;
  border-radius: 5rem;
  border: 1px solid #2c2c2c;
  white-space: nowrap;
`;
