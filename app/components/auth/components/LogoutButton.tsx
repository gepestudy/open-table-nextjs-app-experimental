import useAuth from "@/src/hooks/auth/useAuth";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { signoutHandler } = useAuth();
  return (
    <Button
      onClick={signoutHandler}
      className={` border p-1 px-4 rounded mr-3 font-medium capitalize text-base bg-blue-400 text-white hover:bg-blue-500`}
      variant={"contained"}
    >
      Logout
    </Button>
  );
};
export default LogoutButton;
