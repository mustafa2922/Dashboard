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
import ReactStars from "react-rating-stars-component";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import Textarea from "@mui/joy/Textarea";
import { Button, Input } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import "./Hotel.css";
import HotelPrice from "./HotelTariff";
import ImageModal from "../../../../Components/imageModal";

const data = [
  {
    id: "12EF34RC1",
    by: "JaffarSaleem.com",
    dateFrom: "15-03-2024",
    dateTo: "18-03-2024",
    name: "Premium Delux",
    type: "Premium Delux",
    stars: 2,
    destination: "New York",
    status: "active",
  },
  {
    id: "98AB76YZ3",
    by: "JaffarSaleem.com",
    dateFrom: "19-03-2024",
    dateTo: "22-03-2024",
    name: "Luxury Suite",
    type: "Luxury Suite",
    stars: 4,
    destination: "London",
    status: "inactive",
  },
  {
    id: "45CD67FG8",
    by: "JaffarSaleem.com",
    dateFrom: "23-03-2024",
    dateTo: "26-03-2024",
    name: "Executive Room",
    type: "Executive Room",
    stars: 3,
    destination: "Paris",
    status: "active",
  },
  {
    id: "23GH89IJ5",
    by: "JaffarSaleem.com",
    dateFrom: "27-03-2024",
    dateTo: "30-03-2024",
    name: "Standard Twin",
    type: "Standard Twin",
    stars: 5,
    destination: "Tokyo",
    status: "inactive",
  },
  {
    id: "67KL12MN0",
    by: "JaffarSaleem.com",
    dateFrom: "31-03-2024",
    dateTo: "03-04-2024",
    name: "Family Villa",
    type: "Family Villa",
    stars: 1,
    destination: "Dubai",
    status: "active",
  },
  {
    id: "34OP56QR7",
    by: "JaffarSaleem.com",
    dateFrom: "04-04-2024",
    dateTo: "07-04-2024",
    name: "Ocean View Suite",
    type: "Ocean View Suite",
    stars: 4,
    destination: "Sydney",
    status: "inactive",
  },
  {
    id: "89ST23UV4",
    by: "JaffarSaleem.com",
    dateFrom: "08-04-2024",
    dateTo: "11-04-2024",
    name: "Penthouse Loft",
    type: "Penthouse Loft",
    stars: 3,
    destination: "Rome",
    status: "active",
  },
  {
    id: "12WX34YZ5",
    by: "JaffarSaleem.com",
    dateFrom: "12-04-2024",
    dateTo: "15-04-2024",
    name: "Honeymoon Retreat",
    type: "Honeymoon Retreat",
    stars: 2,
    destination: "Berlin",
    status: "inactive",
  },
  {
    id: "56CD78EF9",
    by: "JaffarSaleem.com",
    dateFrom: "16-04-2024",
    dateTo: "19-04-2024",
    name: "Mountain Chalet",
    type: "Mountain Chalet",
    stars: 5,
    destination: "Moscow",
    status: "active",
  },
  {
    id: "78GH90IJ1",
    by: "JaffarSaleem.com",
    dateFrom: "20-04-2024",
    dateTo: "23-04-2024",
    name: "Beach Bungalow",
    type: "Beach Bungalow",
    stars: 3,
    destination: "Singapore",
    status: "inactive",
  },
];

const destinations = [
  "Dubai",
  "Dehli",
  "AhmedAbad",
  "Bombay",
  "Shinghai",
  "Karachi",
  "Lahore",
  "Chicago",
  "Patna",
  "Sirinagar",
];

function Hotel() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [open, setOpen] = useState(false);
  const [tarifOpen, setTarifOpen] = useState(false);
  const [hotelName, sethotelName] = useState("");
  const [destinationVal, setDestinationVal] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [able, setAble] = useState(true);
  const [imgModal, setImgModal] = useState(false);

  const showMatches = (input) => {
    return destinations.filter((item) => {
      return item.toLowerCase().includes(input.toLowerCase());
    });
  };

  const matchArr = showMatches(destinationVal);

  const handleClose = (name) => {
    if (name === "modal") {
      setOpen(false);
    } else if (name === "tarif") {
      setTarifOpen(false);
    } else if (name === "bank") {
      setBankOpen(false);
      setAble(true);
    }
  };
  const [gridApi, setGridApi] = useState(null);
  const [value, setValue] = useState();
  const [hotelImage, setHotelImage] = useState("");

  const [stat, setStat] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "#",
      field: "serialNumber",
      sortable: false,
      flex: 0.35,
      filter: false,
      cellRenderer: (params) => {
        return <div className="ml-[-10px]">{params.rowIndex + 1}</div>;
      },
    },
    {
      headerName: "Name",
      field: "name",
      flex: 0.88,
    },
    {
      headerName: "Type",
      field: "type",
      flex: 0.8,
    },
    {
      headerName: "Category",
      field: "stars",
      flex: 1.18,
      cellRenderer: (params) => {
        return (
          <ReactStars
            count={5}
            value={params.value}
            edit={false}
            size={20}
            activeColor="#ffd700"
          />
        );
      },
    },
    {
      headerName: "Destination",
      field: "destination",
      flex: 1.22,
    },
    {
      headerName: "Tarif",
      sortable: false,
      filter: false,
      flex: 0.6,
      cellRenderer: (params) => {
        return (
          <div
            onClick={() => {
              setTarifOpen(true);
              sethotelName(params.data.name);
            }}
            className="flex items-center justify-center w-full h-full"
          >
            <NorthEastIcon
              className="hover:bg-black hover:text-white rounded-full border p-1 border-black"
              style={{ fontSize: "25px" }}
            />
          </div>
        );
      },
    },
    {
      headerName: "Tarif Valid From",
      field: "dateFrom",
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params) => {
        return (
          <div
            className={`flex items-center justify-center w-full h-6 text-white font-bold rounded-md ${
              dayjs(params.data.dateTo, "DD-MM-YYYY").isBefore(dayjs(), "day")
                ? "bg-red-500"
                : "bg-green-500"
            } `}
          >
            {params.value}
          </div>
        );
      },
      flex: 1.4,
    },
    {
      headerName: "Tarif Valid To",
      field: "dateTo",
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params) => {
        return (
          <div
            className={`flex items-center justify-center w-full h-6 text-white font-bold rounded-md ${
              dayjs(params.value, "DD-MM-YYYY").isBefore(dayjs(), "day")
                ? "bg-red-500"
                : "bg-green-500"
            } `}
          >
            {params.value}
          </div>
        );
      },
      flex: 1.2,
    },
    {
      headerName: "Bank Details",
      sortable: false,
      filter: false,
      field: "",
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params) => {
        return (
          <div
            onClick={() => {
              sethotelName(params.data.name);
              setBankOpen(true);
            }}
            className="underline cursor-pointer font-bold"
          >
            View
          </div>
        );
      },
    },
    {
      headerName: "Status",
      field: "status",
      flex: 0.9,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div
              className={`flex items-center justify-center w-14 ${
                params.value.toLocaleLowerCase() ===
                "Active".toLocaleLowerCase()
                  ? "bg-green-500"
                  : "bg-red-500"
              }  text-white font-bold rounded-md h-7 w-full`}
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
      flex: 1.6,
      field: "by",
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-start gap-2 w-full h-full">
            <div className="p-1 rounded-full border border-black h-6 w-6 flex items-center justify-center">
              {params.value[0]}
            </div>
            <div className="w-2">{params.value}</div>
          </div>
        );
      },
    },
    {
      headerName: "Updated On",
      field: "dateTo",
      flex: 1.25,
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

  const quickFilter = (search) => {
    gridApi.setGridOption("quickFilterText", search);
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    cellStyle: { borderRight: "1px solid #d9d9db" },
    flex: 1,
    tooltipField: "name",
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setHotelImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setHotelImage("");
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Accommodation </div>
        <div className="flex justify-center  sm:w-[65%] md:w-[55%] lg:w-[43%]  w-[90%] items-center gap-3 h-full">
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
            className="border border-slate-300 h-[80%] px-2 rounded-md text-sm w-[60%] focus:outline-none focus:border focus:border-black"
            placeholder="Search by anything...."
          />
          <div className="w-[40%] h-[80%]">
            <button
              onClick={() => {
                setOpen(true);
                setStat("Add");
              }}
              className="border w-[100%] border-slate-300 h-full bg-[#1d3f5a] text-white text-xs rounded-md px-2 "
            >
              <span className="sm:block hidden">Add Accommodation</span>
              <span className="sm:hidden block">
                <AddRoundedIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-full w-full overflow-x-auto">
        <div className="ag-theme-quartz h-full xl:w-full  w-[1800px]">
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
            onClose={() => {
              handleClose("modal");
            }}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] lg:w-[70%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Hotel </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleClose("modal");
                  }}
                >
                  <CloseIcon />
                </div>
              </div>
              <div className="flex justify-between w-full mt-4 h-[90%]">
                <div className="flex flex-col w-[48%]">
                  <select
                    defaultValue={"DEFAULT"}
                    className="px-2 focus:outline-none w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md"
                  >
                    <option value="DEFAULT" disabled={true}>
                      Property Type
                    </option>
                    <option value="Hotel">Hotel</option>
                    <option value="Houseboat">Houseboat</option>
                    <option value="Guest House">Guest House</option>
                    <option value="Resort">Resort</option>
                    <option value="Lodge">Lodge</option>
                    <option value="Homestay">Homestay</option>
                    <option value="Motel">Motel</option>
                    <option value="Cottage">Cottage</option>
                    <option value="Villa">Villa</option>
                    <option value="Camping">Camping</option>
                  </select>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Accommodation Name"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <select
                    defaultValue={"DEFAULT"}
                    className="px-2 focus:outline-none mt-4 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-sm"
                  >
                    <option value="DEFAULT" disabled={true}>
                      Category
                    </option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Star</option>
                    <option value="3">3 Star</option>
                    <option value="4">4 Star</option>
                    <option value="5">5 Star</option>
                  </select>

                  <div className="relative mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Destination"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      value={destinationVal}
                      onChange={(e) => {
                        setDestinationVal(e.target.value);
                        setShowPicker(true);
                      }}
                    />
                    {showPicker && destinationVal && matchArr.length > 0 && (
                      <ul className="absolute z-10 bg-[#f9f9f9] w-full border rounded-b-lg p-1 border-black">
                        {matchArr.map((match, index) => (
                          <li
                            className="hover:bg-blue-200 cursor-pointer rounded-sm p-1 border-b"
                            key={index}
                            onClick={() => {
                              setDestinationVal(match);
                              setShowPicker(false);
                            }}
                          >
                            {match}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className=" mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Accommodation Address"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div className="mt-4">
                    <PhoneInput
                      international
                      value={value}
                      onChange={setValue}
                      placeholder="Accommodation Contact No"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>

                  <div className="mt-4 w-full h-fit">
                    <Textarea
                      placeholder="Accommodation Details"
                      minRows={2}
                      maxRows={5}
                      sx={{
                        width: "100%",
                        backgroundColor: "#fff",
                        borderColor: "#d3d3d3",
                        height: "130px",
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-[48%]">
                  <div className=" flex items-center w-full justify-between">
                    <div className="border border-slate-300 rounded-md flex justify-start items-center px-2 h-10 w-[84%]">
                      <Input
                        id="file-input"
                        type="file"
                        inputProps={{ multiple: true }}
                        onChange={(e) => handleFileSelect(e)}
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
                          {hotelImage === ""
                            ? `Select Hotel Image`
                            : 'Selected  '}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setImgModal(true);
                        console.log(hotelImage);
                      }}
                      className="border border-slate-300 rounded-md flex items-center justify-center w-[15%] underline cursor-pointer h-10"
                    >
                      View
                    </button>
                    <ImageModal
                      setState={setImgModal}
                      state={imgModal}
                      image={hotelImage}
                    />
                  </div>

                  <div className="flex mt-4 items-center w-full justify-between">
                    <div className="custom-date-picker w-[48%]">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                          label="Tarif Valid From"
                          defaultValue={dayjs("2022-04-17")}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="custom-date-picker w-[48%]">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                          label="Tarif Valid To"
                          defaultValue={dayjs("2022-04-17")}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Contact Person"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div className="mt-4">
                    <PhoneInput
                      international
                      value={value}
                      onChange={setValue}
                      placeholder="Mobile No *"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>
                  <div className="mt-4">
                    <PhoneInput
                      international
                      value={value}
                      onChange={setValue}
                      placeholder="Alternative No"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className=" mt-4 w-[48%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label="Reservation Email ID"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className=" mt-4 w-[48%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label="Website Link"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <select
                    defaultValue={"DEFAULT"}
                    className="px-2 focus:outline-none mt-4 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md"
                  >
                    <option value="DEFAULT" disabled={true}>
                      Accommodation Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div
                  onClick={() => {
                    handleClose("modal");
                  }}
                  className=" w-[48%] rounded-md h-10"
                >
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

          <Modal
            keepMounted
            open={tarifOpen}
            onClose={() => {
              handleClose("tarif");
            }}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[85%] h-fit">
              <div className="h-full overflow-x-auto">
                <HotelPrice name={hotelName} MainSetOpen={handleClose} />
              </div>
            </div>
          </Modal>

          <Modal
            keepMounted
            open={bankOpen}
            onClose={() => {
              handleClose("bank");
            }}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[70%] h-fit">
              <div className="flex justify-between text-3xl items-center px-1">
                <div className="font-bold text-lg">
                  {" "}
                  {hotelName} Bank Details
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleClose("bank");
                  }}
                >
                  <CloseIcon />
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col px-1 w-[49%]">
                  <div className="font-bold   text-black ">Bank 1</div>
                  <div className="mt-2 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      disabled={able}
                      label="Account Name"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      disabled={able}
                      label="Account No"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      disabled={able}
                      label="Bank Name"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Branch Name"
                      disabled={able}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="IFSCI Code"
                      disabled={able}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-[49%]">
                  <div className="font-bold   text-black ">Bank 2</div>
                  <div className="mt-2 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Account Name"
                      disabled={able}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      disabled={able}
                      label="Account No"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Bank Name"
                      disabled={able}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      disabled={able}
                      label="Branch Name"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="IFSCI Code"
                      disabled={able}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div
                  onClick={() => {
                    handleClose("bank");
                  }}
                  className=" w-[49%] rounded-md h-10"
                >
                  <button className="hover:bg-[#c22626] w-full rounded-md  text-white bg-[#e51d27] h-full flex items-center justify-center">
                    Cancel
                  </button>
                </div>

                <div className=" w-[49%] rounded-md h-10  ">
                  <button
                    onClick={() => {
                      setAble(false);
                    }}
                    className={`w-full rounded-md h-full flex ${
                      able
                        ? "hover:bg-blue-900 bg-blue-700"
                        : "hover:bg-green-900 bg-green-700"
                    }  items-center justify-center text-white `}
                  >
                    {able ? "Edit" : "Save"}
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

export default Hotel;

// 1- property Type

// {
// Hotel
// Houseboat
// Guest House
// Resort
// Lodge
// Homestay
// Motel
// Cottage
// Villa
// Camping
// }

// view {Bank Detail}
// Account Name
// Account No.
// Bank Name
// Branch Name
// IFSCI Code

// tarif edit allingnment

// tarif --> modal

// tariff date if < current date --> red

// Destination --> Drop Down

// driver date if < current date --> red

// details --> height

// day itinary -> title pehlay karna hay

// vehicle details spacing

// vehicle price 1st ---> per day

// driver id card ---> image field

// price validty --> 2 cols from,to

// Mail settings
