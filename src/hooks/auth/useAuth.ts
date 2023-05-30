import { setAuthState } from "@/src/redux/features/authSlicer";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import axios from "axios";

const useAuth = () => {
  const { data, error, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const signinHandler = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    try {
      dispatch(setAuthState({ data, error, loading: true }));
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      dispatch(
        setAuthState({ data: response.data, error: null, loading: false })
      );
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          dispatch(
            setAuthState({
              data: null,
              error: "No server response",
              loading: false,
            })
          );
        } else if (error.response) {
          dispatch(
            setAuthState({
              data: null,
              error: error.response.data.message,
              loading: false,
            })
          );
        } else {
          dispatch(
            setAuthState({ data: null, error: error.message, loading: false })
          );
        }
      }
    }
  };

  const signupHanlder = async (
    {
      firstName,
      lastName,
      email,
      phone,
      city,
      password,
      confirmPassword,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      city: string;
      password: string;
      confirmPassword: string;
    },
    handleClose: () => void
  ) => {
    try {
      dispatch(setAuthState({ data: null, error: null, loading: true }));
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          firstName,
          lastName,
          email,
          phone,
          city,
          password,
          confirmPassword,
        }
      );
      dispatch(
        setAuthState({ data: response.data, error: null, loading: false })
      );
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          dispatch(
            setAuthState({
              data: null,
              error: "No server response",
              loading: false,
            })
          );
        } else if (error.response) {
          dispatch(
            setAuthState({
              data: null,
              error: error.response.data.message,
              loading: false,
            })
          );
        } else {
          dispatch(
            setAuthState({ data: null, error: error.message, loading: false })
          );
        }
      }
    }
  };

  return { signinHandler, signupHanlder };
};

export default useAuth;
