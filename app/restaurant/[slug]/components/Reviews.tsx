import Stars from "@/app/components/cards/Stars";
import getinitialName from "@/src/utils/formatedRating/users/getInitialname";
import { Review } from "@prisma/client";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      {reviews.length == 0 ? (
        <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
          No one has rated this restaurant yet
        </h1>
      ) : (
        <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
          What {reviews.length} {reviews.length === 1 ? "person" : "people"} are
          saying
        </h1>
      )}
      {reviews.map((review) => {
        return (
          <div key={review.id}>
            <div className="border-b pb-7 mb-7">
              <div className="flex">
                <div className="w-1/6 flex flex-col items-center">
                  <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
                    <h2 className="text-white text-2xl">
                      {getinitialName(review.first_name, review.last_name)}
                    </h2>
                  </div>
                  <p className="text-center">
                    {review.first_name +
                      " " +
                      (review.last_name ? review.last_name : "")}
                  </p>
                </div>
                <div className="ml-10 w-5/6">
                  <div className="flex items-center">
                    <div className="flex mr-5">
                      <Stars reviews={reviews} />
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="text-lg font-light">{review.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Reviews;
