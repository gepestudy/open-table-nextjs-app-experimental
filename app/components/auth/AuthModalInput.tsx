"use client";
import { useState } from "react";
import {
  ISignup,
  ISignin,
  signupSchema,
  signinScheme,
} from "@/app/api/config/zod/authSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";

const AuthModalInput = ({ signin }: { signin: boolean | undefined }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorSubmiting, setErrorSubmiting] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>({
    resolver: zodResolver(signupSchema),
  });

  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: errorsSignin },
  } = useForm<ISignin>({
    resolver: zodResolver(signinScheme),
  });

  const onSignup: SubmitHandler<ISignup> = async (data) => {
    setIsLoading(true);
    const res = await fetch("/api/auth/signup", {
      body: JSON.stringify(data),
      method: "POST",
    })
      .then((res) => res.json())
      .catch((err) => {
        setErrorSubmiting(err.message);
        setIsLoading(false);
        console.log(err);
      });
    setIsLoading(false);
  };

  const onSignin: SubmitHandler<ISignin> = async (data) => {
    setIsLoading(true);
    const res = await fetch("/api/auth/signin", {
      body: JSON.stringify(data),
      method: "POST",
    })
      .then((res) => res.json())
      .catch((err) => {
        setErrorSubmiting(err.message);
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={signin ? handleSubmitSignin(onSignin) : handleSubmit(onSignup)}
    >
      {signin ? null : (
        <>
          <div className="my-3 flex justify-between gap-2 text-sm">
            <TextField
              className={`${errors.firstName && "border-red-500"}`}
              {...register("firstName")}
              label="First Name"
              size="small"
              fullWidth
              autoFocus
              name="firstName"
            />

            <TextField
              className={`${errors.lastName && "border-red-500"}`}
              {...register("lastName")}
              label="Last Name"
              size="small"
              fullWidth
              name="lastName"
            />
          </div>
          <div>
            {errors.firstName?.message && (
              <p className="text-red-500 block">{errors.firstName?.message}</p>
            )}
            {errors.lastName?.message && (
              <p className="text-red-500 block">{errors.lastName?.message}</p>
            )}
          </div>
        </>
      )}
      <div className="my-3 flex justify-between gap-2 text-sm">
        <TextField
          className={`${errors.email && "border-red-500"}`}
          {...(signin
            ? { ...registerSignin("email") }
            : { ...register("email") })}
          label="Email"
          size="small"
          fullWidth
          name="email"
        />
      </div>
      {errors.email?.message && (
        <p className="text-red-500 block">{errors.email?.message}</p>
      )}
      {signin ? null : (
        <>
          <div className="my-3 flex justify-between gap-2 text-sm">
            <TextField
              className={`${errors.phone && "border-red-500"}`}
              {...register("phone")}
              label="Phone"
              size="small"
              fullWidth
              type="number"
              inputProps={{ inputMode: "numeric", patern: "[0-9]*" }}
              name="phone"
            />
            <TextField
              className={`${errors.city && "border-red-500"}`}
              {...register("city")}
              label="City"
              size="small"
              fullWidth
              name="city"
            />
          </div>
          <div>
            {errors.phone?.message && (
              <p className="text-red-500 block">{errors.phone?.message}</p>
            )}
            {errors.city?.message && (
              <p className="text-red-500 block">{errors.city?.message}</p>
            )}
          </div>
        </>
      )}
      {signin ? (
        <>
          <div className="my-3 flex justify-between gap-2 text-sm">
            <TextField
              className={`${errors.password && "border-red-500"}`}
              {...registerSignin("password")}
              label="Password"
              type="password"
              size="small"
              fullWidth
              autoComplete="new-password"
              name="password"
            />
          </div>
          {errorsSignin.password?.message && (
            <p className="text-red-500 block">
              {errorsSignin.password?.message}
            </p>
          )}
        </>
      ) : (
        <>
          <div className="my-3 flex justify-between gap-2 text-sm">
            <TextField
              className={`${errors.password && "border-red-500"}`}
              {...register("password")}
              label="Password"
              type="password"
              size="small"
              fullWidth
              autoComplete="new-password"
              name="password"
            />
          </div>
          <div className="my-3 flex justify-between gap-2 text-sm">
            <TextField
              className={`${errors.confirmPassword && "border-red-500"}`}
              {...register("confirmPassword")}
              label="Confirm Password"
              type="password"
              size="small"
              fullWidth
              autoComplete="new-password"
              name="confirmPassword"
            />
          </div>
        </>
      )}
      {isLoading ? (
        <>
          <Button
            disabled={isLoading}
            variant="contained"
            type="submit"
            fullWidth
            className={`${
              signin
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-400 hover:bg-blue-500"
            } font-medium tracking-widest disabled:bg-gray-400`}
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          type="submit"
          fullWidth
          className={`${
            signin
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-400 hover:bg-blue-500"
          } font-medium tracking-widest disabled:bg-gray-400`}
        >
          {signin ? "Sign In" : "Create Account"}
        </Button>
      )}
    </form>
  );
};
export default AuthModalInput;
