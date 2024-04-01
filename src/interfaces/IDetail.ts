import { LoginUser } from "./IUser";

interface Iproject {
  id: number;
  title: string;
  description: string;
  githubLink: string;
  isTeamProject: boolean;
  owner: LoginUser;
}

interface Icomment {
  id: number;
  context: string;
  parentCommentOrderId: number;
  commentOrder: number;
  childCommentCount: number;
  isDeleted: boolean;
}

export type { Iproject, Icomment };
