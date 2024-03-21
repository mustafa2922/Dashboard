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

const data = [
  {
    id: "12EF34RC1",
    by: "JaffarSaleem.com",
    date: "15-03-2024",
    name: "Electric Scooter with Long Range Battery",
    passengerCapacity: 2,
    status: "active",
  },
  {
    id: "98AB76YZ3",
    by: "JaffarSaleem.com",
    date: "16-03-2024",
    name: "Luxury Limousine with Panoramic Sunroof",
    passengerCapacity: 6,
    status: "inactive",
  },
  {
    id: "45CD67FG8",
    by: "JaffarSaleem.com",
    date: "17-03-2024",
    name: "Supercharged Sports Car with Carbon Fiber Body",
    passengerCapacity: 2,
    status: "active",
  },
  {
    id: "23GH89IJ5",
    by: "JaffarSaleem.com",
    date: "18-03-2024",
    name: "All-Terrain Off-Road Vehicle with Four-Wheel Drive",
    passengerCapacity: 5,
    status: "inactive",
  },
  {
    id: "67KL12MN0",
    by: "JaffarSaleem.com",
    date: "19-03-2024",
    name: "Hybrid SUV with Advanced Safety Features",
    passengerCapacity: 5,
    status: "active",
  },
  {
    id: "12EF34RC1",
    by: "JaffarSaleem.com",
    date: "15-03-2024",
    name: "Electric Scooter with Long Range Battery",
    passengerCapacity: 2,
    status: "active",
  },
  {
    id: "98AB76YZ3",
    by: "JaffarSaleem.com",
    date: "16-03-2024",
    name: "Luxury Limousine with Panoramic Sunroof",
    passengerCapacity: 6,
    status: "inactive",
  },
  {
    id: "45CD67FG8",
    by: "JaffarSaleem.com",
    date: "17-03-2024",
    name: "Supercharged Sports Car with Carbon Fiber Body",
    passengerCapacity: 2,
    status: "active",
  },
  {
    id: "23GH89IJ5",
    by: "JaffarSaleem.com",
    date: "18-03-2024",
    name: "All-Terrain Off-Road Vehicle with Four-Wheel Drive",
    passengerCapacity: 5,
    status: "inactive",
  },
  {
    id: "67KL12MN0",
    by: "JaffarSaleem.com",
    date: "19-03-2024",
    name: "Hybrid SUV with Advanced Safety Features",
    passengerCapacity: 5,
    status: "active",
  },
  {
    id: "34OP56QR7",
    by: "JaffarSaleem.com",
    date: "20-03-2024",
    name: "Convertible with Heated Seats",
    passengerCapacity: 4,
    status: "active",
  },
];

function Transfer() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [gridApi, setGridApi] = useState(null);
  const [value, setValue] = useState();

  const [stat, setStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "Vehicle",
      field: "name",
    },
    {
      headerName: "Passenger Capacity",
      field: "passengerCapacity",
      flex: 0.9,
    },

    {
      headerName: "Updated By",
      field: "by",

      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-start gap-2 w-full h-full">
            <div className="p-1 rounded-full border border-black h-6 w-6 flex items-center justify-center">
              {params.value[0]}
            </div>
            <div>{params.value}</div>
          </div>
        );
      },
    },
    {
      headerName: "Updated On",
      field: "date",
    },
    {
      sortable: false,
      filter: false,
      flex: 0.3,
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
    flex: 1,
    tooltipField: "name",
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Transfers </div>
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
              <span className="sm:block hidden">Add Vehicle</span>
              <span className="sm:hidden block">
                <AddRoundedIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-full w-full overflow-x-scroll">
        <div className="ag-theme-quartz h-full lg:w-full w-[1000px]">
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
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[80%] md:w-[40%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Vehicle </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="flex flex-col justify-between mt-4 h-[90%]">
                <div className=" mt-4 w-full">
                  <TextField
                    id="outlined-basic"
                    size="small"
                    label="Name"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </div>
                <div className="mt-4 w-full">
                  <input
                    type="number"
                    className="focus:outline-none w-full border border-[#b9b9b9] h-10 px-2 rounded-md p-1 text-black"
                    placeholder="Passanger Capacity"
                  />
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
        </div>
      </div>
    </div>
  );
}

export default Transfer;
