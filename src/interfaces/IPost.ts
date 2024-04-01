interface PostFormData {
  title?: string;
  description?: string;
  githubLink?: string;
  isTeamProject: boolean;
  ownerId?: number;
  projectCategories: { id: number }[];
  projectImgs?: File[];
  teamProjectMembers: { id: number }[];
}

interface Icategory {
  id: number;
  name: string;
}

interface Imember {
  id: number;
  nickname: string;
}

export type { PostFormData, Icategory, Imember };
