import { Review } from "@prisma/client";

export function getAvgRating(reviews: Review[]): number {
  const review =
    reviews.reduce((sum, review) => {
      return sum + review.rating;
    }, 0) / reviews.length;
  const formatedRating = isNaN(review) ? 0 : +review.toFixed(1);
  return formatedRating;
}
