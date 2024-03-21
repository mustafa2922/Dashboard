import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useLocation } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

let data = [
  {
    From: "2024-03-19",
    To: "2024-03-21",
    RoomType: "Standard Room",
    MealPlan: "Half Board",
    Single: 100,
    Double: 150,
    Triple: 200,
    Quad: 250,
    CWB: 50,
    CNB: 25,
  },
  {
    From: "2024-04-10",
    To: "2024-04-15",
    RoomType: "Deluxe Room",
    MealPlan: "Full Board",
    Single: 120,
    Double: 180,
    Triple: 240,
    Quad: 300,
    CWB: 60,
    CNB: 30,
  },
  {
    From: "2024-05-05",
    To: "2024-05-07",
    RoomType: "Suite",
    MealPlan: "All Inclusive",
    Single: 200,
    Double: 300,
    Triple: 400,
    Quad: 500,
    CWB: 100,
    CNB: 50,
  },
  {
    From: "2024-06-12",
    To: "2024-06-17",
    RoomType: "Standard Room",
    MealPlan: "Room Only",
    Single: 80,
    Double: 120,
    Triple: 160,
    Quad: 200,
    CWB: 40,
    CNB: 20,
  },
  {
    From: "2024-07-20",
    To: "2024-07-25",
    RoomType: "Deluxe Room",
    MealPlan: "Half Board",
    Single: 130,
    Double: 200,
    Triple: 260,
    Quad: 320,
    CWB: 65,
    CNB: 32.5,
  },
  {
    From: "2024-08-15",
    To: "2024-08-20",
    RoomType: "Suite",
    MealPlan: "Full Board",
    Single: 220,
    Double: 350,
    Triple: 480,
    Quad: 600,
    CWB: 110,
    CNB: 55,
  },
  {
    From: "2024-09-08",
    To: "2024-09-10",
    RoomType: "Standard Room",
    MealPlan: "All Inclusive",
    Single: 150,
    Double: 250,
    Triple: 350,
    Quad: 450,
    CWB: 90,
    CNB: 45,
  },
  {
    From: "2024-10-11",
    To: "2024-10-16",
    RoomType: "Deluxe Room",
    MealPlan: "Room Only",
    Single: 100,
    Double: 150,
    Triple: 200,
    Quad: 250,
    CWB: 50,
    CNB: 25,
  },
  {
    From: "2024-11-22",
    To: "2024-11-25",
    RoomType: "Suite",
    MealPlan: "Half Board",
    Single: 180,
    Double: 280,
    Triple: 380,
    Quad: 480,
    CWB: 95,
    CNB: 47.5,
  },
  {
    From: "2024-12-03",
    To: "2024-12-07",
    RoomType: "Standard Room",
    MealPlan: "Full Board",
    Single: 140,
    Double: 210,
    Triple: 280,
    Quad: 350,
    CWB: 70,
    CNB: 35,
  },
];

function HotelPrice() {
  const { state } = useLocation();
  const { id, name } = state;

  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [gridApi, setGridApi] = useState(null);

  const [stat, setStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "Room Type",
      field: "RoomType",
    },
    {
      headerName: "Meal Plan",
      field: "MealPlan",
    },
    {
      headerName: "Single",
      field: "Single",
      flex: 0.9,
    },
    {
      headerName: "Double",
      field: "Double",
      flex: 0.9,
    },
    {
      headerName: "Triple",
      field: "Triple",
      flex: 0.9,
    },
    {
      headerName: "Quad",
      field: "Quad",
      flex: 0.9,
    },
    {
      headerName: "CWB",
      field: "CWB",
      flex: 0.9,
    },
    {
      headerName: "CNB (Above 5 yrs)",
      field: "CNB",
    },
    {
      headerName: "CNB (Below 5 yrs)",
      field: "CNB",
    },
    {
      headerName: "INF (Below 3 yrs)",
      field: "CNB",
    },
    {
      sortable: false,
      filter: false,
      flex: 0.4,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <EditNoteIcon
              onClick={() => {
                setOpen(true);
                setStat("Edit");
              }}
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
        <div className="font-bold"> {name} - Tariff </div>
        <div className="flex justify-center items-center gap-3 h-full">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              quickFilter();
            }}
            className="border border-slate-300 h-[80%] px-2 rounded-md text-sm w-[65%] focus:outline-none focus:border focus:border-black"
            placeholder="Search by anything...."
          />
          <button
            onClick={() => {
              setOpen(true);
              setStat("Add");
            }}
            className="border border-slate-300 h-[80%] bg-[#1d3f5a] text-white text-sm rounded-md px-2 "
          >
            <span className="sm:block hidden">Add Tariff</span>{" "}
            <span className="sm:hidden flex items-center justify-center">
              <AddRoundedIcon />
            </span>
          </button>
        </div>
      </div>

      <div className="h-full w-full">
        <div className="ag-theme-quartz w-[1800px] lg:w-full h-full">
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
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[70%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Tariff </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="flex justify-between w-full mt-4 h-[90%]">
                <div className="flex flex-col w-[48%]">
                  <div className="px-1 text-basemt-4 w-full">Room Type</div>

                  <select className="px-2 focus:outline-none mt-1 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md">
                    <option value="1">1 Star</option>
                    <option value="2">2 Star</option>
                    <option value="3">3 Star</option>
                    <option value="4">4 Star</option>
                    <option value="5">5 Star</option>
                  </select>

                  <div className="px-1 text-base mt-4 w-full">Meal Plan</div>

                  <select className="px-2 focus:outline-none mt-1 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md">
                    <option value="1">1 Star</option>
                    <option value="2">2 Star</option>
                    <option value="3">3 Star</option>
                    <option value="4">4 Star</option>
                    <option value="5">5 Star</option>
                  </select>
                  <div className="mt-6 flex items-center justify-between w-full">
                    <div className=" w-[48%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label="CWB"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="w-[48%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label="INF (below 3 yrs)"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-[48%]">
                  <div className="mt-2 flex items-center justify-between w-full">
                    <div className=" w-[48%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label="Single"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="w-[48%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label="Double"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between w-full">
                    <div className=" w-[48%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label="Triple"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="w-[48%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label="Quad"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="CNB (above 5 yrs)"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="CNB (below 5 yrs)"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
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

export default HotelPrice;
