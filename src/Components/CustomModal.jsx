import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import "./CustomModal.css";

function CustomModal({ page, status, openVal, setOpenVal }) {
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
      <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[70%] h-fit">
        <div className="flex justify-between items-center h-[10%] px-2">
          <div className="font-bold text-lg">
            {status} {page}
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <CloseIcon />
          </div>
        </div>

        <div className="flex mt-4 justify-between h-[90%]">
          <div className="w-[48%] ">
            <select className="px-2 focus:outline-none w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md">
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
              <option value="Dr.">Dr.</option>
              <option value="Prof.">Prof.</option>
            </select>

            <div className="flex items-center justify-between">
              <div className="mt-4 w-[49%]">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  label="First Name"
                  variant="outlined"
                />
              </div>

              <div className="mt-4 w-[49%]">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  label="Last Name"
                  variant="outlined"
                />
              </div>
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
          </div>
          <div className="w-[48%]">
            <div>
              <PhoneInput
                international
                value={value}
                onChange={setValue}
                placeholder="Number-2"
                className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
              />
            </div>

            <div className="mt-4 w-full">
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

            {page === "Client" ? (
              <>
                <div className="mt-4 custom-date-picker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="Tarif Valid From"
                      defaultValue={dayjs("2022-04-17")}
                    />
                  </LocalizationProvider>
                </div>
                <div className=" mt-4 custom-date-picker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                      label="Tarif Valid To"
                      defaultValue={dayjs("2022-04-17")}
                    />
                  </LocalizationProvider>
                </div>
              </>
            ) : (
              <>
                <div className="mt-4 w-full">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    size="small"
                    label="Company"
                    variant="outlined"
                  />
                </div>

                <div className="mt-4 w-full">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    size="small"
                    label="GST"
                    variant="outlined"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div onClick={handleClose} className=" w-[48%] rounded-md h-10">
            <button className="hover:bg-[#c22626] w-full rounded-md  text-white bg-[#e51d27] h-full flex items-center justify-center">
              Cancel
            </button>
          </div>

          <div className=" w-[48%] rounded-md h-10  ">
            <button className="w-full rounded-md h-full flex hover:bg-[#1a8d42] items-center justify-center text-white bg-[#04AA6D]">
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CustomModal;
