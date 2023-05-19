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

export interface UserDoc {
  name: UserFullName;
  username: string;
  description: string;
  location: string;
  languages: string[];
  timezone: string;
  roles: UserRoles;
  skills: UserSkill[];
  education: UserEducation[];
  certifications: UserCertification[];
  experience: UserExperience[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type UserKeys =
  | keyof UserFullName
  | keyof UserRoles
  | keyof UserSkill
  | keyof UserEducation
  | keyof UserCertification
  | keyof UserExperience;

export type Error = Record<UserKeys, boolean>;
