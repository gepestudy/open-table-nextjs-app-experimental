"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  function searchAction() {
    // if (location == "" || location.length === 0 || /^\s+$/.test(location)) {
    //   setLocation("");
    //   return;
    // }
    router.push(`/search?city=${location}`);
  }
  return (
    <div className="text-left text-lg py-3 m-auto flex justify-center">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="search"
        placeholder="State, city or town"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={(event) => {
          if (event.code === "Enter") {
            searchAction();
          }
        }}
      />
      <button
        type="submit"
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={searchAction}
      >
        Let's go
      </button>
    </div>
  );
};
export default SearchBar;
