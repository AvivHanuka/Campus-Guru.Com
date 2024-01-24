function calculateCourseAverageRating(review: CourseReview): number {
  const totalRating =
    review.structureReview * 1 +
    review.contentReview * 1 +
    review.difficultyReview * 1 +
    review.relevanceReview * 1;
  const averageRating = totalRating / 4; // Assuming 4 fields are used for the average
  return averageRating;
}

export default calculateCourseAverageRating;
