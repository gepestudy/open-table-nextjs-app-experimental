"use client";
import { RootState, useAppSelector } from "@/src/redux/store";
import Link from "next/link";
import AuthModal from "../auth/AuthModal";
import { useEffect, useState } from "react";
import { User } from "@/src/redux/features/authSlicer";
import { CircularProgress, Skeleton } from "@mui/material";
import LogoutButton from "../auth/components/LogoutButton";

const Navbar = () => {
  const { data, loading } = useAppSelector((state) => state.auth);

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div className="flex items-center">
        {loading ? (
          <Skeleton variant="rounded" width={210} height={33.5} />
        ) : (
          <>
            {data && (
              <div className="flex items-center font-medium gap-2">
                <p>{data.firstName}</p>
                <p>{data.lastName}</p>
                <LogoutButton />
              </div>
            )}
            {!data && (
              <>
                <AuthModal signin />
                <AuthModal />
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
