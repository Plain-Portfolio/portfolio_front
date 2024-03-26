interface PostFormData {
  title: string;
  description: string;
  githubLink: string;
  //   isTeamProject: boolean;
  //   ownerId: number;
  //   projectCategories: string[];
  projectImgs: File[];
  teamProjectMembers: string[];
}

export type { PostFormData };
