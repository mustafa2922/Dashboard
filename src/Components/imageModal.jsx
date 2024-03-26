import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

function ImageModal({ state, setState , image }) {
  const handleClose = () => setState(false);

  return (
    <Modal
      keepMounted
      open={state}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] px-2 translate-y-[-50%] bg-white w-[30%] h-fit">
        <div className="flex justify-between items-center h-[10%]">
          <div className="font-bold text-lg">
            Image Viewer
          </div>
          <div className="cursor-pointer" onClick={handleClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="mt-4 w-full">
            { image == '' ? <div className="text-center text-red-700" > No Image Is Selected </div> : <img className="h-full w-full object-contain" src={image} alt="image" />}
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal;
