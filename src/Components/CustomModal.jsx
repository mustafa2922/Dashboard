import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function CustomModal({ status, openVal, setOpenVal }) {

  const [value, setValue] = useState();

  const handleClose = () => setOpenVal(false);

  return (
    <Modal
      keepMounted
      open={openVal}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[70%] h-[60%]">
        <div className="flex justify-between items-center h-[10%] px-2">
          <div className="font-bold text-lg">{status} Client</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <CloseIcon />
          </div>
        </div>

        <div className="flex justify-between h-[90%]">
          <div className="w-[48%] ">
            <select className="px-2 focus:outline-none w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md">
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
            </select>

            <div className="mt-4 flex justify-between">
              <TextField
                id="outlined-basic"
                size="small"
                label="First Name"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                size="small"
                label="Last Name"
                variant="outlined"
              />
            </div>

            <div className="mt-4 w-full">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                label="Email-1"
                variant="outlined"
              />
            </div>

            <div className="mt-4">
              <PhoneInput
                international
                value={value}
                onChange={setValue}
                placeholder="Number-1"
                className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
              />
            </div>

            <div className="mt-4 w-full">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                label="Email-2"
                variant="outlined"
              />
            </div>

            <div className="mt-4">
              <PhoneInput
                international
                value={value}
                onChange={setValue}
                placeholder="Number-2"
                className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
              />
            </div>
          </div>
          <div className="w-[48%] ">
            <div className="w-full">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                label="City"
                variant="outlined"
              />
            </div>

            <div className="mt-4 w-full">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                label="Address"
                variant="outlined"
              />
            </div>

            <div className="mt-4 w-full">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                label="Date of Birth"
                variant="outlined"
              />
            </div>

            <div className="mt-4 w-full">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                label="Marriage Anniversary"
                variant="outlined"
              />
            </div>

            <div className="mt-4 w-full rounded-md h-10">
              <button className="hover:bg-[#142b3e] w-full rounded-md h-full flex items-center justify-center text-white bg-[#1d3f5a]">
                Save
              </button>
            </div>

            <div
              onClick={handleClose}
              className="mt-4 w-full rounded-md h-10"
            >
              <button className="hover:bg-[#eeeeee] w-full rounded-md border border-[#b9b9b9] h-full flex items-center justify-center">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CustomModal;
