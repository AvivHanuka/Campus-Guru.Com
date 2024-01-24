interface AuthState {
  user: {
    id: number;
    username: string;
    email: string;
    roles: [string];
  };
  jwt: string;
}

interface Institution {
  id: number;
  name: string;
  createdAt: Date;
}
interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  roles: [string];
}

interface Professor {
  id: number;
  name: string;
  institute: number;
  faculty: string;
  tags: string[];
  institution: Institution;
  reviews: ProfessorReview[];
  courses?: Course[];
}

interface Course {
  id: number;
  name: string;
  description: string;
  credit: number;
  hoursPerWeek: number;
  institute: number;
  faculty: string;
  tags: string[];
  institution: Institution;
  reviews: CourseReview[];
  professors?: Professor[];
}

interface Votes {
  id: number;
  userId: number;
  reviewId: number;
}
interface CourseReview {
  id?: number;
  course_id: number;
  userId?: number;
  author: string;
  comment: string;
  structureReview: number;
  contentReview: number;
  difficultyReview: number;
  relevanceReview: number;
  averageReview?: number;
  upVotes?: Votes[];
  downVotes?: Votes[];
  creationTimestamp?: string;
}

interface CourseReport {
  id?: number;
  course_id: number;
  userId?: number;
  reason: string;
  details: string;
}

interface ProfessorReport {
  id?: number;
  professor_id: number;
  userId?: number;
  reason: string;
  details: string;
}

interface ProfessorReview {
  id?: number;
  professor_id: number;
  userId?: number;
  author: string;
  comment: string;
  interpersonalRelationshipsReview: number;
  proficiencyReview: number;
  teachingMethodReview: number;
  averageReview?: number;
  upVotes?: Votes[];
  downVotes?: Votes[];
  creationTimestamp?: string;
}

interface Relation {
  id: number;
  course_id: number;
  professor_id: number;
  course: Course;
  professor: Professor;
}
