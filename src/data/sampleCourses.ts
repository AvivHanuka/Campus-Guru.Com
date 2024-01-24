import {
  Course,
  CourseDetails,
  CourseItem,
  CourseReview,
  Professor,
  ProfessorDetails,
  ProfessorItem,
  ProfessorReview,
} from "@/types/allTypes";

export const sampleCourses: Course[] = [
  {
    id: "10091103",
    number: 502,
    name: "Introduction to Computer Science",
    description:
      "The first and main part of the course will focus on consumer theory. We will examine consumer decisions in a competitive environment in which the consumer can choose 'baskets' from a set of possible baskets. We will discuss the consumer's preference system and the assumptions behind rational decision-making. In the second part, we will discuss another competitive unit, the producer, and see the analogy between the solution of the consumer's problem to the solution of the producer's problem. In examining consumer decisions, we will open a way of thinking and technical tools for maximization in the choice from a set of possible baskets and talk about special cases that are suitable for consumers with different preferences. Among other things, we will examine cases of internal solutions and end solutions, and also discuss the differences between different compensation systems ('Hicks', 'Slutsky'). ",
    credit: 3,
    hoursPerWeek: 3,
    institute: "Tel Aviv University",
    faculty: "Social science",
    tags: ["Hebrew", "Open Books", "Practicum"],
  },
  {
    id: "10091555",
    number: 500,
    name: "Hope: Human Odyssey to Political Existentialism",
    description:
      "The first and main part of the course will focus on consumer theory. We will examine consumer decisions in a competitive environment in which the consumer can choose 'baskets' from a set of possible baskets. We will discuss the consumer's preference system and the assumptions behind rational decision-making. In the second part, we will discuss another competitive unit, the producer, and see the analogy between the solution of the consumer's problem to the solution of the producer's problem. In examining consumer decisions, we will open a way of thinking and technical tools for maximization in the choice from a set of possible baskets and talk about special cases that are suitable for consumers with different preferences. Among other things, we will examine cases of internal solutions and end solutions, and also discuss the differences between different compensation systems ('Hicks', 'Slutsky'). ",
    credit: 3,
    hoursPerWeek: 3,
    institute: "Tel Aviv University",
    faculty: "Social science",
    tags: ["Hebrew", "Open Books", "Practicum"],
  },
];

export const sampleProfessors: Professor[] = [
  {
    id: "123",
    name: "Avivit Pesach",
    institute: "Tel Aviv University",
    faculty: "Social science",
    tags: ["Hebrew", "Open Books", "Practicum"],
  },
  {
    id: "456",
    name: "Mr John",
    institute: "Tel Aviv University",
    faculty: "Social science",
    tags: ["Hebrew", "Open Books", "Practicum"],
  },
];

export const sampleCourseReview: CourseReview[] = [
  {
    id: "1",
    course_id: "10091103",
    author: "M Sami",
    comment: "Great course. I studied with Maxim and he explains really well.",
    structureReview: 4,
    contentReview: 3.4,
    difficultyReview: 4.5,
    relevanceReview: 4.7,
    upVotes: 10,
    downVotes: 1,
    creationTimestamp: "2023-01-14T15:17:25.549+00:00",
  },
  {
    id: "2",
    course_id: "10091103",
    author: "John",
    comment: "Great course. I studied with Maxim and he explains really well.",
    structureReview: 2,
    contentReview: 4.4,
    difficultyReview: 4.5,
    relevanceReview: 1.7,
    upVotes: 10,
    downVotes: 12,
    creationTimestamp: "2023-01-14T15:17:25.549+00:00",
  },
  {
    id: "3",
    course_id: "10091555",
    author: "M Sami",
    comment: "Great course. I studied with Maxim and he explains really well.",
    structureReview: 4,
    contentReview: 3.4,
    difficultyReview: 4.5,
    relevanceReview: 4.7,
    upVotes: 10,
    downVotes: 1,
    creationTimestamp: "2023-01-14T15:17:25.549+00:00",
  },
  {
    id: "4",
    course_id: "10091555",
    author: "John",
    comment: "Great course. I studied with Maxim and he explains really well.",
    structureReview: 2,
    contentReview: 4.4,
    difficultyReview: 4.5,
    relevanceReview: 1.7,
    upVotes: 10,
    downVotes: 12,
    creationTimestamp: "2023-01-14T15:17:25.549+00:00",
  },
];

export const sampleProfessorReview: ProfessorReview[] = [
  {
    id: "1",
    professor_id: "123",
    author: "M Sami",
    comment:
      "Great Professor. I studied with Maxim and he explains really well.",
    interpersonalRelationshipsReview: 4,
    proficiencyReview: 3.4,
    teachingMethodReview: 4.5,
    upVotes: 10,
    downVotes: 1,
    creationTimestamp: "2023-01-14T15:17:25.549+00:00",
  },
  {
    id: "2",
    professor_id: "123",
    author: "John D.",
    comment:
      "Great Professor. I studied with Maxim and he explains really well.",
    interpersonalRelationshipsReview: 4,
    proficiencyReview: 1.4,
    teachingMethodReview: 4.5,
    upVotes: 10,
    downVotes: 1,
    creationTimestamp: "2023-01-14T15:17:25.549+00:00",
  },
  {
    id: "3",
    professor_id: "456",
    author: "M Sami",
    comment:
      "Great Professor. I studied with Maxim and he explains really well.",
    interpersonalRelationshipsReview: 4,
    proficiencyReview: 3.4,
    teachingMethodReview: 4.5,
    upVotes: 10,
    downVotes: 1,
    creationTimestamp: "2023-01-14T15:17:25.549+00:00",
  },
  {
    id: "4",
    professor_id: "456",
    author: "John D.",
    comment:
      "Great Professor. I studied with Maxim and he explains really well.",
    interpersonalRelationshipsReview: 4,
    proficiencyReview: 1.4,
    teachingMethodReview: 4.5,
    upVotes: 10,
    downVotes: 1,
    creationTimestamp: "2023-01-14T15:17:25.549+00:00",
  },
];

// Function to calculate the average rating for a single review
function calculateAverageRating(review: CourseReview): number {
  const totalRating =
    review.structureReview +
    review.contentReview +
    review.difficultyReview +
    review.relevanceReview;
  const averageRating = totalRating / 4; // Assuming 4 fields are used for the average
  return averageRating;
}
export const getCourses = (): CourseItem[] => {
  return sampleCourses.map((item) => {
    const courseReviews = sampleCourseReview.filter(
      (x) => x.course_id === item.id
    );
    return {
      ...item,
      averageReview:
        courseReviews.reduce((total, review) => {
          return total + calculateAverageRating(review);
        }, 0) / courseReviews.length,
      professors: sampleProfessors,
    };
  });
};

function calculateProfessorAverageRating(review: ProfessorReview): number {
  const totalRating =
    review.interpersonalRelationshipsReview +
    review.proficiencyReview +
    review.teachingMethodReview;

  const averageRating = totalRating / 3; // Assuming 4 fields are used for the average
  return averageRating;
}
export const getProfessors = (): ProfessorItem[] => {
  return sampleProfessors.map((item) => {
    const proReviews = sampleProfessorReview.filter(
      (x) => x.professor_id === item.id
    );

    return {
      ...item,
      averageReview:
        proReviews.reduce((total, review) => {
          return total + calculateProfessorAverageRating(review);
        }, 0) / proReviews.length,
      courses: sampleCourses,
    };
  });
};

export const getCourseDetails = (
  courseId: string
): CourseDetails | undefined => {
  let course = sampleCourses.find((item) => item.id === courseId);
  if (!course) return undefined;
  return {
    ...course,
    reviews: sampleCourseReview.filter((x) => x.course_id === courseId),
    professors: sampleProfessors.map((item) => {
      const proReviews = sampleProfessorReview.filter(
        (x) => x.professor_id === item.id
      );
      return {
        ...item,
        averageReview:
          proReviews.reduce((total, review) => {
            return total + calculateProfessorAverageRating(review);
          }, 0) / proReviews.length,
        courses: [],
      };
    }),
  };
};

export const getProfessorDetails = (
  professorId: string
): ProfessorDetails | undefined => {
  let professor = sampleProfessors.find((item) => item.id === professorId);
  if (!professor) return undefined;
  return {
    ...professor,
    reviews: sampleProfessorReview.filter(
      (x) => x.professor_id === professorId
    ),
    courses: sampleCourses.map((item) => {
      const courseReviews = sampleCourseReview.filter(
        (x) => x.course_id === item.id
      );
      return {
        ...item,
        averageReview:
          courseReviews.reduce((total, review) => {
            return total + calculateAverageRating(review);
          }, 0) / courseReviews.length,
      };
    }),
  };
};
