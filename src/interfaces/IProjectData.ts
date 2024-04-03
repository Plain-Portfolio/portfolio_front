// User Project List Data Interface

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
  projectCategories: [];
  projectImgs: ProjectImage[];
  comments: Comment[];
  likes: Like[];
  teamProjectMembers: { userId: number }[];
}

export type { ProjectImage, Comment, Like, Owner, ProjectData };
