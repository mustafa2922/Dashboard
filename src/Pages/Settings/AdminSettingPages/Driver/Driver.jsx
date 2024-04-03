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
import dayjs from "dayjs";
import ImageModal from "../../../../Components/imageModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Button, Input } from "@mui/material";
import { PatternFormat } from "react-number-format";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
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
    vehicleToDate: "02/05/24",
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
    vehicleToDate: "03/01/24",
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
    vehicleToDate: "04/02/24",
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
    vehicleToDate: "05/02/24",
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
    vehicleToDate: "06/01/24",
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
    vehicleToDate: "07/05/24",
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
    vehicleMark: "Mercedes-Benz",
    vehicleNo: "IL3456",
    vehicleModel: 2022,
    vehicleColor: "Silver",
    pricePerDay: 1900,
    priceArrDep: 1900,
    vehicleFromDate: "09/01/24",
    vehicleToDate: "09/05/24",
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
    vehicleToDate: "10/02/24",
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
    vehicleToDate: "11/03/24",
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

  const [driverPhoto, setDriverPhoto] = useState("");
  const [vehiclePhoto, setVehiclePhoto] = useState("");
  const [licenseCopy, setLicenseCopy] = useState("");
  const [idCardImg, setIdCardImg] = useState("");

  const [driverImgModal, setDriverImgModal] = useState(false);
  const [vehicleImgModal, setVehicleImgModal] = useState(false);
  const [LicenseCopyModal, setLicenseCopyModal] = useState(false);
  const [IdCardModal, setIdCardModal] = useState(false);

  const [value, setValue] = useState();

  const [stat, setStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "#",
      field: "serialNumber",
      sortable: false,
      filter: false,
      flex: 0.45,
      cellRenderer: (params) => {
        return <div className="ml-[-10px]">{params.rowIndex + 1}</div>;
      },
      cellStyle: {
        display: "flex",
        alignItems: "center",
      },
    },
    {
      headerName: "Driver Name",
      field: "name",
      flex: 3.2,
      filter: false,
      cellRenderer: (params) => {
        return (
          <div className="ml-[-10px] flex w-full items-center justify-between h-full p-1">
            <div className="h-full leading-4 w-[40%] whitespace-pre-wrap flex items-center ">
              {params.data.name}
            </div>
            <div className="h-[90%] w-[48%]">
              <img
                className="h-full w-full object-contain"
                src={dummyDriver}
              />
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Mobile",
      field: "mobile",
      flex: 1.35,
    },
    {
      headerName: "Vehicle Details",
      filter: false,
      flex: 2.5,
      cellRenderer: (params) => {
        return (
          <div className="ml-[-10px] flex items-center justify-between p-1 h-full w-full">
            <div className="w-full items-start justify-center h-[95%] flex flex-col">
              <div className="text-sm ">
                Mark :
                <span className="text-black font-bold">
                  {` ` + params.data.vehicleMark}
                </span>
              </div>
              <div className="text-sm mt-[-1px]">
                No :
                <span className="text-black font-bold">
                  {` ` + params.data.vehicleNo}
                </span>
              </div>
              <div className="text-sm mt-[-1px]">
                Model :
                <span className="text-black font-bold">
                  {` ` + params.data.vehicleModel}
                </span>
              </div>
              <div className="text-sm mt-[-1px]">
                Color :
                <span className="text-black font-bold">
                  {` ` + params.data.vehicleColor}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Vehicle Price",
      filter: false,
      flex: 1.85,
      cellRenderer: (params) => {
        return (
          <div className="ml-[-10px] flex flex-col items-start justify-center w-full h-full">
            <div className="text-sm mt-[-1px]">
              {`(AC) : `}
              <span className="text-black font-bold">
                {`₹` + params.data.pricePerDay}
              </span>
            </div>
            <div className="text-sm mt-[-1px]">
              {`(Non - AC) : `}
              <span className="text-black font-bold">
                {`₹` + params.data.priceArrDep}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Price Valid From",
      flex: 1.75,
      filter: false,
      field: "vehicleFromDate",
      cellRenderer: (params) => {
        return (
          <div
            className={`flex items-center justify-center w-full h-6 text-white font-bold rounded-md ${
              dayjs(params.data.vehicleToDate, "DD/MM/YY").isBefore(
                dayjs(),
                "day"
              )
                ? "bg-red-500"
                : "bg-green-500"
            } `}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      headerName: "Price Valid To",
      filter: false,
      flex: 1.5,
      field: "vehicleToDate",
      cellRenderer: (params) => {
        return (
          <div
            className={`flex items-center justify-center w-full h-6 text-white font-bold rounded-md ${
              dayjs(params.value, "DD/MM/YY").isBefore(dayjs(), "day")
                ? "bg-red-500"
                : "bg-green-500"
            } `}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      headerName: "Status",
      field: "status",
      flex: 1.1,
      filter: false,
      cellRenderer: (params) => {
        return (
          <div className=" flex items-center justify-center w-full h-10">
            <div
              className={`flex items-center justify-center w-full px-7 ${
                params.value.toLowerCase() === "Active".toLowerCase()
                  ? "bg-green-500"
                  : "bg-red-500"
              }  text-white font-bold rounded-md h-[70%]`}
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
      filter: false,
      flex: 2.2,
      cellRenderer: (params) => {
        return (
          <div className="ml-[-10px] flex items-center justify-start gap-2 w-full h-full">
            <div className="p-1 rounded-full border border-black h-6 w-6 flex items-center justify-center">
              {params.value[0]}
            </div>
            <div className="w-1">{params.value}</div>
          </div>
        );
      },
    },
    {
      headerName: "Updated On",
      filter: false,
      field: "updatedOn",
      flex: 1.2,
    },
    {
      sortable: false,
      filter: false,
      flex: 0.6,
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

  const handleFileSelect = (event, str) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (str === "driver") {
          console.log('---driver---')
          setDriverPhoto(reader.result)
        }
        if (str === "id") {
          console.log('---id---')
          setIdCardImg(reader.result)
        }
        if (str === 'vehicle') {
          console.log('---vehicle---')
          setVehiclePhoto(reader.result)
        }
        if (str === 'liscense') {
          console.log('---liscense---')
          setLicenseCopy(reader.result)
        }
      };
      reader.readAsDataURL(file);
    } else {
      func("");
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

  const quickFilter = (search) => {
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
        <div className="flex justify-center sm:w-[65%] md:w-[55%] lg:w-[45%]  w-[90%] items-center gap-3 h-full">
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
              quickFilter(e.target.value);
            }}
            className="border border-slate-300 h-[80%] px-2 rounded-md text-sm w-[70%] focus:outline-none focus:border focus:border-black"
            placeholder="Search by name..."
          />
          <div className="w-[30%] h-[80%]">
            <button
              onClick={() => {
                setOpen(true);
                setStat("Add");
              }}
              className="border w-full border-slate-300 h-full bg-[#1d3f5a] text-white text-xs rounded-md px-2 "
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
        <div className="ag-theme-quartz h-full xl:w-[100%] w-[2000px]">
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

                  <select
                    defaultValue={"DEFAULT"}
                    className="px-2 mt-4 text-slate-600 focus:outline-none w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-sm"
                  >
                    <option value="DEFAULT" disabled={true}>
                      Vehicle Mark
                    </option>
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

                  <div className="flex w-full mt-4 justify-between items-center">
                    <div className=" w-[49%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label={
                          <>
                            {" "}
                            <CurrencyRupeeIcon />
                            Vehicle Price (AC)
                          </>
                        }
                        variant="outlined"
                        sx={{ width: "100%" }}
                        type="number"
                      />
                    </div>
                    <div className=" w-[49%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label={
                          <>
                            {" "}
                            <CurrencyRupeeIcon />
                            Vehicle Price (Non AC)
                          </>
                        }
                        variant="outlined"
                        sx={{ width: "100%" }}
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <div className="mt-4 w-[48%] custom-date-picker">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                          label="Price Valid From"
                          defaultValue={dayjs("2022-04-17")}
                        />
                      </LocalizationProvider>
                    </div>

                    <div className="mt-4 w-[48%] custom-date-picker">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                          label="Price Valid To"
                          defaultValue={dayjs("2022-04-17")}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div className=" flex items-center mt-4 w-full justify-between">
                    <div className="border border-slate-300 rounded-md flex justify-start items-center px-2 h-10 w-[84%]">
                      <Input
                        id="file-input1"
                        type="file"
                        inputProps={{ multiple: true }}
                        onChange={(e) => handleFileSelect(e,'id')}
                        style={{ display: "none" }}
                      />
                      <div className="flex items-center gap-3">
                        <label htmlFor="file-input1">
                          <Button
                            variant="outlined"
                            component="span"
                            sx={{ height: "30px", fontSize: "10px" }}
                          >
                            Select Files
                          </Button>
                        </label>
                        <div className="hidden md:block text-xs overflow-x-auto">
                          {idCardImg === "" ? `Driver Id Card` : "Selected  "}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIdCardModal(true);
                      }}
                      className="border border-slate-300 rounded-md text-xs flex items-center justify-center w-[15%] underline cursor-pointer h-10"
                    >
                      View
                    </button>
                    <ImageModal
                      setState={setIdCardModal}
                      state={IdCardModal}
                      image={idCardImg}
                    />
                  </div>
                  <div className=" flex items-center mt-4 w-full justify-between">
                    <div className="border border-slate-300 rounded-md flex justify-start items-center px-2 h-10 w-[84%]">
                      <Input
                        id="file-input2"
                        type="file"
                        inputProps={{ multiple: true }}
                        onChange={(e) => handleFileSelect(e,'vehicle')}
                        style={{ display: "none" }}
                      />
                      <div className="flex items-center gap-3">
                        <label htmlFor="file-input2">
                          <Button
                            variant="outlined"
                            component="span"
                            sx={{ height: "30px", fontSize: "10px" }}
                          >
                            Select Files
                          </Button>
                        </label>
                        <div className="hidden md:block  text-xs overflow-x-auto">
                          {vehiclePhoto === ""
                            ? `Vehicle Image`
                            : "Selected  "}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setVehicleImgModal(true);
                      }}
                      className="border border-slate-300 rounded-md text-xs flex items-center justify-center w-[15%] underline cursor-pointer h-10"
                    >
                      View
                    </button>
                    <ImageModal
                      setState={setVehicleImgModal}
                      state={vehicleImgModal}
                      image={vehiclePhoto}
                    />
                  </div>
                  <div className=" flex items-center mt-4 w-full justify-between">
                    <div className="border border-slate-300 rounded-md flex justify-start items-center px-2 h-10 w-[84%]">
                      <Input
                        id="file-input3"
                        type="file"
                        inputProps={{ multiple: true }}
                        onChange={(e) => handleFileSelect(e,'driver')}
                        style={{ display: "none" }}
                      />
                      <div className="flex items-center gap-3">
                        <label htmlFor="file-input3">
                          <Button
                            variant="outlined"
                            component="span"
                            sx={{ height: "30px", fontSize: "10px" }}
                          >
                            Select Files
                          </Button>
                        </label>
                        <div className="hidden md:block  text-xs overflow-x-auto">
                          {driverPhoto === ""
                            ? `Driver Image`
                            : "Selected  "}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setDriverImgModal(true);
                      }}
                      className="border border-slate-300 rounded-md text-xs flex items-center justify-center w-[15%] underline cursor-pointer h-10"
                    >
                      View
                    </button>
                    <ImageModal
                      setState={setDriverImgModal}
                      state={driverImgModal}
                      image={driverPhoto}
                    />
                  </div>
                  <div className=" flex items-center mt-4 w-full justify-between">
                    <div className="border border-slate-300 rounded-md flex justify-start items-center px-2 h-10 w-[84%]">
                      <Input
                        id="file-input4"
                        type="file"
                        inputProps={{ multiple: true }}
                        onChange={(e) => handleFileSelect(e,'liscense')}
                        style={{ display: "none" }}
                      />
                      <div className="flex items-center gap-3">
                        <label htmlFor="file-input4">
                          <Button
                            variant="outlined"
                            component="span"
                            sx={{ height: "30px", fontSize: "10px" }}
                          >
                            Select Files
                          </Button>
                        </label>
                        <div className="hidden md:block  text-xs overflow-x-auto">
                          {licenseCopy === ""
                            ? `Liscense Copy`
                            : "Selected  "}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setLicenseCopyModal(true);
                      }}
                      className="border border-slate-300 rounded-md text-xs flex items-center justify-center w-[15%] underline cursor-pointer h-10"
                    >
                      View
                    </button>
                    <ImageModal
                      setState={setLicenseCopyModal}
                      state={LicenseCopyModal}
                      image={licenseCopy}
                    />
                  </div>

                  <select
                    defaultValue={"DEFAULT"}
                    className="px-2 focus:outline-none mt-4 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md"
                  >
                    <option value="DEFAULT" disabled={true}>
                      Status
                    </option>
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
