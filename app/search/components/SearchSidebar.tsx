import prisma from "@/prisma/prisma";
import { PRICE } from "@prisma/client";
import Link from "next/link";

interface IProps {
  locations: {
    name: string;
    id: number;
  }[];
  cuisines: {
    name: string;
    id: number;
  }[];
  searchParams?: {
    city: string | undefined;
    cuisine: string | undefined;
    price?: PRICE | undefined;
  };
}

const SearchSidebar = ({ locations, cuisines, searchParams }: IProps) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      classname: `rounded-l`,
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      classname: null,
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      classname: `rounded-r`,
    },
  ];

  return (
    <div className="w-1/5 mr-5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {!locations ? (
          <p>could not get location</p>
        ) : (
          locations.map((location) => (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  city: location.name,
                },
              }}
              key={location.id}
            >
              <p
                className={`${
                  location.name == searchParams?.city && "font-medium"
                } font-light text-reg`}
              >
                {location.name}
              </p>
            </Link>
          ))
        )}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {!cuisines ? (
          <p>could not get location</p>
        ) : (
          cuisines.map((cuisine) => (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  cuisine: cuisine.name,
                },
              }}
              key={cuisine.id}
            >
              <p
                className={`${
                  cuisine.name == searchParams?.cuisine && "font-medium text-lg"
                } font-light text-reg`}
              >
                {cuisine.name}
              </p>
            </Link>
          ))
        )}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ label, price, classname }) => (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className={`${
                searchParams?.price == price && "bg-slate-200 text-lg"
              } ${classname} border w-full text-reg font-light p-2 text-center`}
              key={price}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSidebar;
