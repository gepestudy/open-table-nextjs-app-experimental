"use client";

import { setAuthState } from "@/src/redux/features/authSlicer";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const fetchUser = async () => {
    dispatch(
      setAuthState({
        data: null,
        loading: true,
        error: null,
      })
    );
    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        dispatch(
          setAuthState({
            data: null,
            loading: false,
            error: null,
          })
        );
      }
      const res = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      dispatch(
        setAuthState({
          data: res.data,
          loading: false,
          error: null,
        })
      );
    } catch (error: any) {
      dispatch(
        setAuthState({
          data: null,
          loading: false,
          error: null,
        })
      );
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return <div>{children}</div>;
};
export default AuthProvider;
