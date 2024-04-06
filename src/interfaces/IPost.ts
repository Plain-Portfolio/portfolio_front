// memo지혜: 생성모드 시, 제출할 폼 인터페이스
interface PostFormData {
  title?: string;
  description?: string;
  githubLink?: string;
  isTeamProject: boolean;
  ownerId?: number;
  projectCategories: { categoryId: number }[];
  projectImgs?: IdNumberArr;
  teamProjectMembers: { userId: number }[];
}
interface idNumber {
  id: number;
}

interface IdNumberArr extends Array<idNumber> {}

// memo지혜: 수정모드 시, 필요한 Icategory 인터페이스 (생성할 때 선택한 카테고리를 보여주기 위해)
interface Icategory extends idNumber {
  name: string;
}

// memo지혜: 수정모드 시, 필요한 Imember 인터페이스 (생성할 때 선택한 맴버를 보여주기 위해)
interface Imember extends idNumber {
  nickname: string;
}

// memo지혜: 수정모드 시, 필요한 projectimages 인터페이스
interface IprojectImgs {
  id: number;
  imageSrc: string;
  alt: string;
}

export type {
  PostFormData,
  Icategory,
  Imember,
  idNumber,
  IdNumberArr,
  IprojectImgs,
};
