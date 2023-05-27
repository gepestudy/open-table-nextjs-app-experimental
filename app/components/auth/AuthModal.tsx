"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import AuthModalInput from "./AuthModalInput";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

export default function AuthModal({ signin }: { signin?: boolean }) {
  const [open, setOpen] = useState(false);
  // const [inputs, setInputs] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: "",
  //   city: "",
  //   password: "",
  // });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderContent = (signInContent: string, signUpContent: string) => {
    return signin ? signInContent : signUpContent;
  };

  // const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputs({
  //     ...inputs,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className={`${
          signin
            ? "bg-blue-400 text-white hover:bg-blue-500"
            : "hover:bg-gray-200"
        } border p-1 px-4 rounded mr-3 font-medium capitalize text-base`}
        variant={signin ? "contained" : "outlined"}
      >
        {renderContent("Sign In", "Sign Up")}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2">
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className="text-sm">{signin ? "Sign In" : "Create Account"}</p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {renderContent(
                  "Log Into Your Account",
                  "Create Your Open Table Account"
                )}
              </h2>
              <AuthModalInput
                // inputs={inputs}
                // handleChangeInput={handleChangeInput}
                signin={signin}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
