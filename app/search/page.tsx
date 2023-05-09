import prisma from "@/prisma/prisma";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSidebar from "./components/SearchSidebar";

interface IProps {
  searchParams: { location: string };
}
const Search = async ({ searchParams }: IProps) => {
  const restaurant = await prisma.location.findMany({
    where: {
      name: {
        contains: searchParams.location,
      },
    },
    select: {
      restaurants: true,
    },
  });

  console.log({ restaurant });

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSidebar />
        <div className="w-5/6">
          <RestaurantCard />
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
