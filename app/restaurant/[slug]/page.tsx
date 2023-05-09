import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavbar from "./components/RestaurantNavbar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
}
const fetchRestaurant = async (slug: string): Promise<Restaurant | null> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
    },
  });
  return restaurant;
};
const RestaurantDetail = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await fetchRestaurant(params.slug);
  if (!restaurant) {
    redirect("/404");
  }
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
};

export default RestaurantDetail;
