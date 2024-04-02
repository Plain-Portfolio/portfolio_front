import { Icategory, IprojectImgs } from "./IPost";

interface Iproject {
  id: number;
  title: string;
  description: string;
  githubLink: string;
  isTeamProject: boolean;
  likes: Ilike[];
  owner: IOwner;
  projectCategories: Icategory[];
  projectImgs: IprojectImgs[];
  teamProjectMembers: IgetMember[];
}

// memo지혜: 작성자 인터페이스
interface IOwner {
  id: number;
  email: string;
  nickname: string;
}
// memo지혜: 팀원 인터페이스
interface IgetMember {
  userId: number;
  email: string;
  nickname: string;
}
// memo지혜: 좋아요 인터페이스
interface Ilike {
  likedId: number;
  userId: number;
}
// memo지혜: 댓글 인터페이스
interface Icomment {
  id: number;
  context: string;
}

export type { Iproject, Icomment, Ilike, IgetMember };
