import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import "react-phone-number-input/style.css";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "react-phone-number-input/style.css";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TextField from "@mui/material/TextField";
import dummyDriver from "../../../../assets/images/dummyDriver.png";
import PhoneInput from "react-phone-number-input";
import dummyCar from "../../../../assets/images/dummyCar.png";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Button, Input } from "@mui/material";
import { PatternFormat } from "react-number-format";
import "./Driver.css";

const data = [
  {
    name: "John Doe",
    mobile: 987654321,
    vehicleMark: "Toyota Camry",
    vehicleNo: "NY1234",
    vehicleModel: 2022,
    vehicleColor: "Black",
    pricePerDay: 1500,
    priceArrDep: 1500,
    vehicleFromDate: "02/01/24",
    vehicleToDate: "02/15/24",
    status: "Active",
    updatedBy: "JaffarSaleem.com",
    updatedOn: "01/15/24",
  },
  {
    name: "Alice Smith",
    mobile: 555555555,
    vehicleMark: "Honda Accord",
    vehicleNo: "LA5678",
    vehicleModel: 2023,
    vehicleColor: "Silver",
    pricePerDay: 1300,
    priceArrDep: 1300,
    vehicleFromDate: "03/01/24",
    vehicleToDate: "03/10/24",
    status: "Active",
    updatedBy: "JaffarSaleem.com",
    updatedOn: "01/20/24",
  },
  {
    name: "Bob Johnson",
    mobile: 111111111,
    vehicleMark: "Ford Mustang",
    vehicleNo: "TX9876",
    vehicleModel: 2021,
    vehicleColor: "Red",
    pricePerDay: 2000,
    priceArrDep: 2000,
    vehicleFromDate: "04/01/24",
    vehicleToDate: "04/20/24",
    status: "inactive",
    updatedBy: "JaffarSaleem.com",
    updatedOn: "02/01/24",
  },
  {
    name: "Emily Brown",
    mobile: 999888777,
    vehicleMark: "Chevrolet Tahoe",
    vehicleNo: "FL5432",
    vehicleModel: 2024,
    vehicleColor: "Blue",
    pricePerDay: 1800,
    priceArrDep: 1800,
    vehicleFromDate: "05/01/24",
    vehicleToDate: "05/12/24",
    status: "Active",
    updatedBy: "JaffarSaleem.com",
    updatedOn: "02/10/24",
  },
  {
    name: "Michael Wilson",
    mobile: 666666666,
    vehicleMark: "BMW X5",
    vehicleNo: "CA4321",
    vehicleModel: 2023,
    vehicleColor: "Gray",
    pricePerDay: 2200,
    priceArrDep: 2200,
    vehicleFromDate: "06/01/24",
    vehicleToDate: "06/18/24",
    status: "inactive",
    updatedBy: "JaffarSaleem.com",
    updatedOn: "02/20/24",
  },
  {
    name: "Emma Garcia",
    mobile: 333333333,
    vehicleMark: "Audi Q7",
    vehicleNo: "GA8765",
    vehicleModel: 2022,
    vehicleColor: "White",
    pricePerDay: 1700,
    priceArrDep: 1700,
    vehicleFromDate: "07/01/24",
    vehicleToDate: "07/25/24",
    status: "Active",
    updatedBy: "JaffarSaleem.com",
    updatedOn: "03/01/24",
  },
  {
    name: "William Martinez",
    mobile: 777777777,
    vehicleMark: "Tesla Model S",
    vehicleNo: "WA9876",
    vehicleModel: 2023,
    vehicleColor: "Red",
    pricePerDay: 2500,
    priceArrDep: 2500,
    vehicleFromDate: "08/01/24",
    vehicleToDate: "08/08/24",
    status: "Active",
    updatedBy: "JaffarSaleem.com",
    updatedOn: "03/10/24",
  },
  {
    name: "Olivia Rodriguez",
    mobile: 444444444,
    vehicleMark: "Mercedes-Benz E-Class",
    vehicleNo: "IL3456",
    vehicleModel: 2022,
    vehicleColor: "Silver",
    pricePerDay: 1900,
    priceArrDep: 1900,
    vehicleFromDate: "09/01/24",
    vehicleToDate: "09/15/24",
    status: "Active",
    updatedBy: "JaffarSaleem.com",
    updatedOn: "03/20/24",
  },
  {
    name: "James Lee",
    mobile: 222222222,
    vehicleMark: "Lexus RX",
    vehicleNo: "OR6543",
    vehicleModel: 2024,
    vehicleColor: "Black",
    pricePerDay: 2100,
    priceArrDep: 2100,
    vehicleFromDate: "10/01/24",
    vehicleToDate: "10/22/24",
    status: "Active",
    updatedBy: "JaffarSaleem.com",
    updatedOn: "04/01/24",
  },
  {
    name: "Sophia Hernandez",
    mobile: 888888888,
    vehicleMark: "Hyundai Sonata",
    vehicleNo: "NV2345",
    vehicleModel: 2023,
    vehicleColor: "Blue",
    pricePerDay: 1600,
    priceArrDep: 1600,
    vehicleFromDate: "11/01/24",
    vehicleToDate: "11/30/24",
    status: "inactive",
    updatedBy: "JaffarSaleem.com",
    updatedOn: "04/10/24",
  },
];

function Driver() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [gridApi, setGridApi] = useState(null);
  const [driverPhoto, setDriverPhoto] = useState("Select driver image");
  const [vehiclePhoto, setVehiclePhoto] = useState("Select vehicle image");
  const [licenseCopy, setLicenseCopy] = useState("Select license copy");

  const [value, setValue] = useState();

  const [stat, setStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "#",
      field: "serialNumber",
      sortable: false,
      flex: 0.3,
      filter: false,
      cellRenderer: (params) => {
        return params.rowIndex + 1;
      },
    },
    {
      headerName: "Driver Name",
      field:'name',
      flex: 1.7,
      cellRenderer: (params) => {
        return (
          <div className="flex w-full items-center justify-between h-full p-1">
            <div className="h-full w-[48%] flex items-center ">
              {" "}
              {params.data.name}{" "}
            </div>
            <div className="h-[90%] w-[48%]">
              {" "}
              <img
                className="h-full w-full object-contain"
                src={dummyDriver}
              />{" "}
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Mobile",
      field: "mobile",
      flex: 0.8,
    },
    {
      headerName: "Vehicle Details",
      flex: 2.8,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-between p-1 h-full w-full">
            <div className="w-[68%] items-start justify-center h-[95%] flex flex-col">
              <div className="text-sm">
                Vehicle Mark :
                <span className="text-black font-bold">
                  {params.data.vehicleMark}
                </span>
              </div>
              <div className="text-sm mt-[-1px]">
                Vehicle No :
                <span className="text-black font-bold">
                  {params.data.vehicleNo}
                </span>
              </div>
              <div className="text-sm mt-[-1px]">
                Vehicle Model :
                <span className="text-black font-bold">
                  {params.data.vehicleModel}
                </span>
              </div>
              <div className="text-sm mt-[-1px]">
                Vehicle Color :
                <span className="text-black font-bold">
                  {params.data.vehicleColor}
                </span>
              </div>
            </div>
            <div className="w-[28%] h-[90%]">
              <img className="w-full h-full object-contain" src={dummyCar} />
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Price",
      flex: 2,
      cellRenderer: (params) => {
        return (
          <div className="flex flex-col items-start justify-center w-full h-full">
            <div className="text-sm mt-[-1px]">
              {`Vehicle Price (Per Day) :`}
              <span className="text-black font-bold">
                {params.data.pricePerDay}
              </span>
            </div>
            <div className="text-sm mt-[-1px]">
              {`Vehicle Price (Arrival/Departure) : `}
              <span className="text-black font-bold">
                {params.data.priceArrDep}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Price Validity",
      flex: 2.5,
      cellRenderer: (params) => {
        return (
          <div className="flex flex-col items-start justify-center w-full h-full">
            <div className="text-sm mt-[-1px]">
              {`Vehicle Price (Arrival/Departure) : `}
              <span className="text-black font-bold">
                {params.data.vehicleFromDate}
              </span>
            </div>
            <div className="text-sm mt-[-1px]">
              {`Vehicle Price (Arrival/Departure) : `}
              <span className="text-black font-bold">
                {params.data.vehicleToDate}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Status",
      field: "status",
      flex: 0.8,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-10">
            <div
              className={`flex items-center justify-center w-14 ${
                params.value.toLocaleLowerCase() ===
                "Active".toLocaleLowerCase()
                  ? "bg-green-700"
                  : "bg-[#f9392f]"
              }  text-white rounded-md h-[70%]`}
            >
              {params.value[0].toUpperCase()}
              {params.value.substring(1)}
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Updated By",
      field: "updatedBy",
      flex: 1.2,
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
      field: "updatedOn",
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

  const handleFileSelect = (event, func) => {
    const file = event.target.files[0];
    if (file) {
      func(file.name);
    } else {
      func(null);
    }
  };

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
    cellStyle: {
      borderRight: "1px solid #d9d9db",
      display: "flex",
      alignItems: "center",
    },
    flex: 1,
    tooltipField: "name",
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Drivers </div>
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
              <span className="sm:block hidden">Add Driver</span>
              <span className="sm:hidden block">
                <AddRoundedIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-full w-full overflow-x-auto">
        <div className="ag-theme-quartz h-full min-[1900px]:w-[100%] w-[2000px]">
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={column}
            rowData={row}
            defaultColDef={defaultColDef}
            enableBrowserTooltips={true}
            pagination={true}
            rowHeight={100}
          />

          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[80%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Driver </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>

              <div className="w-full flex justify-between h-[90%] mt-4">
                <div className="flex flex-col items-start justify-center h-full w-[48%]">
                  <div className=" w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Driver Name"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <PhoneInput
                      international
                      value={value}
                      onChange={setValue}
                      placeholder="Mobile No"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <PhoneInput
                      international
                      value={value}
                      onChange={setValue}
                      placeholder="Alternative No"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Driver Address"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <PatternFormat
                      format="####_####_####"
                      className="focus:outline-none w-full border border-[#b9b9b9] h-10 px-2 rounded-md p-1 text-black"
                      placeholder="Aadhar No"
                    />
                  </div>

                  <div className="px-1 mt-4 text-sm ">Vehicle Mark</div>
                  <select className="px-2 text-slate-600 focus:outline-none mt-1 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-sm">
                    <option value="1">Toyota Camry</option>
                    <option value="2">Ford Mustang</option>
                    <option value="3">Hyundai Sonata</option>
                    <option value="4">Honda Accord</option>
                    <option value="5">Chevrolet Tahoe</option>
                  </select>

                  <div className="mt-4 w-full">
                    <input
                      type="number"
                      className="focus:outline-none w-full border border-[#b9b9b9] h-10 px-2 rounded-md p-1 text-black"
                      placeholder="Passanger Capacity"
                      disabled={true}
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Vehicle No"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center h-full w-[48%]">
                  <div className="flex w-full justify-between items-center">
                    <div className=" w-[49%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label="Vehicle Model"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className=" w-[49%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label="Vehicle Color"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 w-full custom-date-picker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        label="Price Valid From"
                        defaultValue={dayjs("2022-04-17")}
                      />
                    </LocalizationProvider>
                  </div>

                  <div className="mt-4 w-full custom-date-picker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        label="Price Valid To"
                        defaultValue={dayjs("2022-04-17")}
                      />
                    </LocalizationProvider>
                  </div>

                  <div className="border border-slate-300 rounded-md flex justify-start items-center px-2 h-10 mt-4 w-full">
                    <Input
                      id="file-input"
                      type="file"
                      inputProps={{ multiple: true }}
                      onChange={(e) => handleFileSelect(e, setDriverPhoto)}
                      style={{ display: "none" }}
                    />
                    <div className="flex items-center gap-3">
                      <label htmlFor="file-input">
                        <Button
                          variant="outlined"
                          component="span"
                          sx={{ height: "30px", fontSize: "10px" }}
                        >
                          Select Files
                        </Button>
                      </label>
                      <div className="hidden md:block overflow-x-auto">
                        {driverPhoto}
                      </div>
                    </div>
                  </div>
                  <div className="border border-slate-300 rounded-md flex justify-start items-center px-2 h-10 mt-4 w-full">
                    <Input
                      id="file-input"
                      type="file"
                      inputProps={{ multiple: true }}
                      onChange={(e) => handleFileSelect(e, setVehiclePhoto)}
                      style={{ display: "none" }}
                    />
                    <div className="flex items-center gap-3">
                      <label htmlFor="file-input">
                        <Button
                          variant="outlined"
                          component="span"
                          sx={{ height: "30px", fontSize: "10px" }}
                        >
                          Select Files
                        </Button>
                      </label>
                      <div className="hidden md:block overflow-x-auto">
                        {vehiclePhoto}
                      </div>
                    </div>
                  </div>
                  <div className="border border-slate-300 rounded-md flex justify-start items-center px-2 h-10 mt-4 w-full">
                    <Input
                      id="file-input"
                      type="file"
                      inputProps={{ multiple: true }}
                      onChange={(e) => handleFileSelect(e, setLicenseCopy)}
                      style={{ display: "none" }}
                    />
                    <div className="flex items-center gap-3">
                      <label htmlFor="file-input">
                        <Button
                          variant="outlined"
                          component="span"
                          sx={{ height: "30px", fontSize: "10px" }}
                        >
                          Select Files
                        </Button>
                      </label>
                      <div className="hidden md:block overflow-x-auto">
                        {licenseCopy}
                      </div>
                    </div>
                  </div>

                  <select className="px-2 focus:outline-none mt-4 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md">
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
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

export default Driver;
