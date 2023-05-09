import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

interface Props {
  menu: {
    id: number;
    items: Item[];
  } | null;
}

const Menu = ({ menu }: Props) => {
  console.log({ menu });

  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {menu?.items.length == 0 ? (
            <p>This restaurant doesnt have menu</p>
          ) : (
            menu?.items.map((item) => (
              <MenuCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
};
export default Menu;
