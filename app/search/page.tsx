import prisma from "@/prisma/prisma";
import { PRICE, Review } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSidebar from "./components/SearchSidebar";

interface IProps {
  searchParams: {
    city: string | undefined;
    cuisine: string | undefined;
    price: PRICE | undefined;
  };
}
// interface IRestaurant {
//   name: string;

//   slug: string;
//   price: PRICE;
//   main_image: string;
//   location: {
//     name: string;
//   };
//   cuisine: {
//     name: string;
//   };
//   reviews: Review[];
// }

const fetchRestaurants = async ({
  city,
  cuisine,
  price,
}: {
  city: string | undefined;
  cuisine: string | undefined;
  price: PRICE | undefined;
}) => {
  const select = {
    name: true,
    slug: true,
    main_image: true,
    price: true,
    reviews: true,
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
  };

  const filter: any = {
    AND: [],
  };

  if (city) {
    filter.AND.push({
      location: {
        name: {
          contains: `${city?.toLowerCase()}`,
          mode: "insensitive",
        },
      },
    });
  }
  if (cuisine) {
    filter.AND.push({
      cuisine: {
        name: {
          contains: `${cuisine?.toLowerCase()}`,
          mode: "insensitive",
        },
      },
    });
  }
  if (price) {
    filter.AND.push({
      price: {
        equals: price,
      },
    });
  }

  if (!city && !cuisine && !price)
    return prisma.restaurant.findMany({
      select,
    });

  return prisma.restaurant.findMany({
    select,
    where: filter,
    // where: {
    //   location: {
    //     name: {
    //       contains: `${city?.toLowerCase()}`,
    //       mode: "insensitive",
    //     },
    //   },
    //   cuisine: {
    //     name: {
    //       contains: `${cuisine?.toLowerCase()}`,
    //       mode: "insensitive",
    //     },
    //   },
    //   price: {
    //     equals: price,
    //   },
    // },
  });
};

function fetchAllLocation() {
  return prisma.location.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

function fetchAllCuisine() {
  return prisma.cuisine.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

const Search = async ({ searchParams }: IProps) => {
  const restaurants = await fetchRestaurants(searchParams);
  const locations = await fetchAllLocation();
  const cuisines = await fetchAllCuisine();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length == 0 || restaurants == null ? (
            <p>There are no restaurants in the city you are looking for</p>
          ) : (
            restaurants.map((restaurant) => (
              <RestaurantCard
                reviews={restaurant.reviews}
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
