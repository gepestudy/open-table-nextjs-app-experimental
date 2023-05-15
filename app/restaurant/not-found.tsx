"use client";

import Image from "next/image";
import errorMascot from "../../public/icons/error.png";

export default function NotFound({ error }: { error: Error }) {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image src={errorMascot} alt="errorImage" className="w-56 mb-8" />
      <div className="bg-white px-9 py-14 shadow rounded text-center">
        <h3 className="text-3xl font-bold">well, this is embarrassing</h3>
        <p className="text-reg font-bold">We couldn't find the restaurant</p>
        <p className="mt-6 text-sm font-light">error code: 400</p>
      </div>
    </div>
  );
}
