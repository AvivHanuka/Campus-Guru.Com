export type Course = {
  id: string;
  number: number;
  name: string;
  description?: string;
  credit?: number;
  hoursPerWeek?: number;
  institute: string;
  faculty: string;
  tags?: string[];
};

export type Professor = {
  id: String;
  name: String;
  institute: String;
  faculty: string;
  tags?: string[];
};

export type CourseReview = {
  id: String;
  course_id: String;
  author: String;
  comment: string;
  structureReview: number;
  contentReview: number;
  difficultyReview: number;
  relevanceReview: number;
  upVotes: number;
  downVotes: number;
  creationTimestamp: string;
};

export type ProfessorReview = {
  id: String;
  professor_id: String;
  author: String;
  comment: string;
  interpersonalRelationshipsReview: number;
  proficiencyReview: number;
  teachingMethodReview: number;
  upVotes: number;
  downVotes: number;
  creationTimestamp: string;
};

export type CourseItem = Course & {
  averageReview: number;
  professors: Professor[] | [];
};
export type ProfessorItem = Professor & {
  averageReview: number;
  courses: Course[] | [];
};
export type CourseDetails = Course & {
  reviews: CourseReview[];
  professors: ProfessorItem[];
  // Add any other additional fields here
};
export type ProfessorDetails = Professor & {
  reviews: ProfessorReview[];
  courses: Course[];
  // Add any other additional fields here
};
