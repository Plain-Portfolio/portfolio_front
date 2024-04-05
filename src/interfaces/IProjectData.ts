// User Project List Data Interface

interface ProjectCategory {
  id: number;
  name: string;
}

interface ProjectImage {
  id: number;
  src: string;
}

interface Comment {
  id: number;
  context: string;
}

interface Like {
  likeId: number;
  userId: number;
}

interface Owner {
  id: number;
  email: string;
  nickname: string;
}

interface ProjectData {
  projectId: number;
  title: string;
  description: string;
  githubLink: string;
  isTeamProject: boolean;
  owner: Owner[];
  projectCategories: ProjectCategory[];
  projectImgs: ProjectImage[];
  comments: Comment[];
  likes: Like[];
  teamProjectMembers: { userId: number }[];
}

export type {
  ProjectCategory,
  ProjectImage,
  Comment,
  Like,
  Owner,
  ProjectData,
};
