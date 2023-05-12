import Stars from "@/app/components/cards/Stars";
import { getAvgRating } from "@/src/utils/formatedRating/formatedRatting";
import { Review } from "@prisma/client";

const Rating = ({ reviews }: { reviews: Review[] }) => {
  const avgRating = getAvgRating(reviews);
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="text-reg ml-3">{avgRating}</p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length} Review{reviews.length > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default Rating;
