"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState, useEffect, useContext } from "react";
import Icon from "@mdi/react";
import { mdiImageEdit } from "@mdi/js";
import {
  Card,
  Input,
  // Checkbox,
  Button,
  Textarea,
  // Typography,
} from "@material-tailwind/react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: " solid #f2f2f2",
  boxShadow: 3,
  p: 4,
};

interface UserCardProps {
  user: { _id: string; userName: string };
}
const EditUserForm: React.FC<UserCardProps> = ({ user }) => {
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(user.userName);
  }, [user]);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   try {
     const res = await fetch(`http://localhost:3000/api/users/${user._id}`, {
       method: "PUT",
       headers: {
         "Content-type": "application/json",
       },
       body: JSON.stringify({ userName }),
     });

     if (!res.ok) {
       throw new Error("Failed to update user");
     }
     handleClose();
   } catch (error) {
     console.log(error);
   }
  };

  return (
    <>
      <div onClick={handleOpen}>
        <Icon color={"blue"} size={1.5} path={mdiImageEdit} />
      </div>

      <div className="">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form
              onSubmit={handleSubmit}
              className="  "
            >
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  type="text"
                  label="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  crossOrigin={undefined}
                />
              </div>

              <br></br>
              <div className="flex justify-between">
                <Button
                  type="submit"
                  className=" w-28 border-solid border-[#E8AA42] border-2 text-[#E8AA42] hover:bg-[#E8AA42] hover:text-[#ffffff]"
                  variant="text"
                >
                  Edit
                </Button>
                <Button
                  className=" w-28 border-solid border-[#7C9070] border-2 text-[#7C9070] hover:bg-[#7C9070] hover:text-[#ffffff]"
                  variant="text"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default EditUserForm;
