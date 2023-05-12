import { PRICE, Review } from "@prisma/client";
import Link from "next/link";
import Price from "../../components/price/Price";
import { getAvgRating } from "@/src/utils/formatedRating/formatedRatting";
import Stars from "@/app/components/cards/Stars";
interface IProps {
  restaurant_name: string;
  location_name: string;
  slug: string;
  price: PRICE;
  image: string;
  cuisine: string;
  reviews: Review[];
}

const RestaurantCard = ({
  restaurant_name,
  location_name,
  price,
  slug,
  image,
  cuisine,
  reviews,
}: IProps) => {
  function renderRatingText() {
    const formatedRating = getAvgRating(reviews);
    if (formatedRating > 4) {
      return "Awesome";
    } else if (formatedRating <= 4 && formatedRating > 3) {
      return "Good";
    } else if (formatedRating <= 3 && formatedRating > 0) {
      return "Average";
    } else {
      return "";
    }
  }
  return (
    <div className="border-b flex pb-5">
      <Link href={`/restaurant/${slug}`}>
        <img src={image} alt="" className="w-44 rounded" />
      </Link>
      <div className="pl-5">
        <Link href={`/restaurant/${slug}`}>
          <h2 className="text-3xl">{restaurant_name}</h2>
        </Link>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={reviews} />
          </div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={price} />
            <p className="mr-4">{cuisine}</p>
            <p className="mr-4">{location_name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
