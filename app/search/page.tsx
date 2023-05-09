import prisma from "@/prisma/prisma";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSidebar from "./components/SearchSidebar";
import { PRICE } from "@prisma/client";

interface IProps {
  searchParams: { city: string };
}
interface IRestaurant {
  restaurant_name: string;

  slug: string;
  price: PRICE;
  main_image: string;
  location: {
    name: string;
  };
  cuisine: {
    name: string;
  };
}
const Search = async ({ searchParams }: IProps) => {
  // sql raw
  // const restaurants: IRestaurant[] =
  //   await prisma.$queryRaw`SELECT r."name" AS restaurant_name, l."name" AS location_name, r."slug", r."price", r."main_image" AS image, c."name" as cuisine_name FROM "Restaurant" r RIGHT JOIN "Location" l ON r."location_id" = l."id" RIGHT JOIN "Cuisine" c ON r."cuisine_id" = c."id" WHERE l."name" ILIKE '%ottawa%'`;

  // lewat prisma client
  const restaurants = await prisma.restaurant.findMany({
    select: {
      name: true,
      slug: true,
      main_image: true,
      price: true,
      cuisine: {
        select: {
          name: true,
        },
      },
      location: {
        select: {
          name: true,
        },
      },
    },
    where: {
      location: {
        name: {
          contains: `${searchParams.city}`,
          mode: "insensitive",
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar />
        <div className="w-5/6">
          {restaurants.length == 0 || restaurants == null ? (
            <p>There are no restaurants in the city you are looking for</p>
          ) : (
            restaurants.map((restaurant) => (
              <RestaurantCard
                restaurant_name={restaurant.name}
                location_name={restaurant.location.name}
                price={restaurant.price}
                slug={restaurant.slug}
                key={restaurant.slug}
                image={restaurant.main_image}
                cuisine={restaurant.cuisine.name}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Search;

export async function generateMetadata() {
  return {
    title: "Search OpenTable",
    description: "i loved her",
  };
}
