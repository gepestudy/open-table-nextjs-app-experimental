import prisma from "@/prisma/prisma";
import Menu from "../components/Menu";
import RestaurantNavbar from "../components/RestaurantNavbar";

const fetchMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      items: true,
    },
  });

  return restaurant;
};
const RestaurantMenu = async ({ params }: { params: { slug: string } }) => {
  const menu = await fetchMenu(params.slug);
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavbar slug={params.slug} />
        <Menu menu={menu} />
      </div>
    </>
  );
};

export default RestaurantMenu;
