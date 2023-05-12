import fullStar from "../../../public/icons/full-star.png";
import halfStar from "../../../public/icons/half-star.png";
import emptyStar from "../../../public/icons/empty-star.png";
import { Review } from "@prisma/client";
import { getAvgRating } from "@/src/utils/formatedRating/formatedRatting";
import Image from "next/image";

const Stars = ({ reviews }: { reviews: Review[] }) => {
  // 3.6
  // fullstar fullstar fullstar halfstart emptystart
  const rating = getAvgRating(reviews);
  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((rating - i).toFixed(1));
      if (difference >= 1) {
        stars.push(fullStar);
      } else if (difference > 0 || difference < 1) {
        if (difference <= 0.2) stars.push(emptyStar);
        else if (difference > 0.2 && difference <= 0.5) stars.push(halfStar);
        else stars.push(fullStar);
      }
    }

    return stars;
  };

  return (
    <>
      {renderStars().map((star, i) => (
        <Image src={star} alt="star" className="w-4 h-4 mr-1" key={i} />
      ))}
    </>
  );
};
export default Stars;
