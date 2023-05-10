import { Inter } from "next/font/google";
import RestaurantCard from "./components/cards/RestaurantCard";
import Header from "./components/layouts/Header";
import prisma from "@/prisma/prisma";
import { Cuisine, Location, PRICE } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  slug: string;
  location: Location;
  price: PRICE;
}
const fetchRestaurant = async (): Promise<RestaurantCardType[]> => {
  const restaurant = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
    },
  });
  return restaurant;
};

const Home = async () => {
  const restaurants = await fetchRestaurant();

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </main>
  );
};

export default Home;
