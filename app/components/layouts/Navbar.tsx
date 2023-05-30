"use client";
import { RootState, useAppSelector } from "@/src/redux/store";
import Link from "next/link";
import AuthModal from "../auth/AuthModal";
import { useEffect, useState } from "react";
import { User } from "@/src/redux/features/authSlicer";

const Navbar = () => {
  const { data, loading } = useAppSelector((state) => state.auth);

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div className="flex items-center">
        {data && (
          <div className="flex items-center font-medium gap-2">
            <p>{data.firstName}</p>
            <p>{data.lastName}</p>
          </div>
        )}
        {!data && (
          <>
            <AuthModal signin />
            <AuthModal />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
