export type UserFullName = {
  firstName: string;
  lastName: string;
};

export type UserRoles = {
  seller: boolean;
  buyer: boolean;
};

export type UserSkill = {
  skillName: string;
  subSkills: string[];
};

export type UserEducation = {
  degree: string;
  major: string;
  school: string;
  year: number;
};

export type UserCertification = {
  certificationName: string;
  authority: string;
  year: number;
};

export type UserExperience = {
  title: string;
  company: string;
  location: string;
  startYear: number;
  endYear: number;
  description: string;
};

export type Error = {
  firstName: boolean;
  lastName: boolean;
  seller: boolean;
  buyer: boolean;
  skillName: boolean;
  subSkills: boolean;
  degree: boolean;
  major: boolean;
  school: boolean;
  year: boolean;
  certificationName: boolean;
  authority: boolean;
  title: boolean;
  company: boolean;
  location: boolean;
  startYear: boolean;
  endYear: boolean;
  description: boolean;
};
