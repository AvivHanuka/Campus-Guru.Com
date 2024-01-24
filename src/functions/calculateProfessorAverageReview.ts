function calculateProfessorAverageRating(review: ProfessorReview): number {
  const totalRating =
    review.interpersonalRelationshipsReview * 1 +
    review.proficiencyReview * 1 +
    review.teachingMethodReview * 1;

  const averageRating = totalRating / 3; // Assuming 4 fields are used for the average
  return averageRating;
}

export default calculateProfessorAverageRating;
