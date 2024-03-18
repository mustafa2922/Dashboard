import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import "react-phone-number-input/style.css";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TextField from "@mui/material/TextField";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const data = [
  {
    id: "12EF34RC1",
    location: "London",
  },
  {
    id: "98AB76YZ3",
    location: "New York",
  },
  {
    id: "45CD67FG8",
    location: "Sydney",
  },
  {
    id: "23GH89IJ5",
    location: "Paris",
  },
  {
    id: "67KL12MN0",
    location: "Tokyo",
  },
  {
    id: "34OP56QR7",
    location: "Rome",
  },
  {
    id: "89ST23UV4",
    location: "Dubai",
  },
  {
    id: "12WX34YZ5",
    location: "Berlin",
  },
  {
    id: "56CD78EF9",
    location: "Cairo",
  },
  {
    id: "78GH90IJ1",
    location: "Moscow",
  },
];

function Destinations() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [gridApi, setGridApi] = useState(null);
  const [value, setValue] = useState();

  const [stat, setStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "Name",
      field: "location",
    },
    {
      width: 50,
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        return (
          <div
            onClick={() => {
              setOpen(true);
              setStat("Edit");
            }}
            className="flex items-center justify-center w-full h-full"
          >
            <EditNoteIcon
              className="hover:bg-black hover:text-white rounded-full border p-1 border-black"
              style={{ fontSize: "25px" }}
            />
          </div>
        );
      },
    },
  ]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setRow(data);
  };

  const ExportData = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv();
    }
  };

  const quickFilter = () => {
    gridApi.setGridOption("quickFilterText", search);
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    cellStyle: { borderRight: "1px solid #d9d9db" },
    width: "1245px",
    tooltipField: "name",
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Destinations </div>
        <div className="flex justify-center items-center gap-3 h-full">
          <button
            onClick={() => {
              ExportData();
            }}
            className="px-2 bg-[#1d3f5a] text-white rounded-md flex items-center h-[80%]"
          >
            <IosShareIcon style={{ fontSize: "20" }} />
          </button>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              quickFilter();
            }}
            className="border border-slate-300 h-[80%] px-2 rounded-md text-sm w-[50%] focus:outline-none focus:border focus:border-black"
            placeholder="Search by anything...."
          />
          <div className="h-[80%]">
            <button
              onClick={() => {
                setOpen(true);
                setStat("Add");
              }}
              className="border border-slate-300 h-full bg-[#1d3f5a] text-white text-xs rounded-md px-2 "
            >
              <span className="sm:block hidden">Add Destination</span>
              <span className="sm:hidden block">
                <AddRoundedIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-full w-full">
        <div
          className="ag-theme-quartz"
          style={{ height: "100%", width: "100%" }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={column}
            rowData={row}
            defaultColDef={defaultColDef}
            enableBrowserTooltips={true}
            pagination={true}
          />

          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[70%] md:w-[40%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Destination </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="flex flex-col justify-between mt-4 h-[90%]">

                <div className="w-full">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    size="small"
                    label="Name"
                    variant="outlined"
                  />
                </div>

                <div className="mt-4 w-full rounded-md h-10  ">
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
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Destinations;
