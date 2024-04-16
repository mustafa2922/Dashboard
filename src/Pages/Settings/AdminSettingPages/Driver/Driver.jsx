import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import "react-phone-number-input/style.css";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "react-phone-number-input/style.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-number-input";
import dayjs from "dayjs";
import ImageModal from "../../../../Components/imageModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Input } from "@mui/material";
import { PatternFormat } from "react-number-format";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "./Driver.css";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { toast } from "react-toastify";

let vehicle_Mark = [];

function Driver() {
  const [able, setAble] = useState(false);
  const [id, setId] = useState("");
  const [reload, setReload] = useState(false);

  const [search, setSearch] = useState("");
  const [row, setRow] = useState();
  const [open, setOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
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

  const [showFromDate, setShowFromDate] = useState(dayjs());
  const [showToDate, setShowToDate] = useState(dayjs());

  const [vehicleMarkVal, setvehicleMarkVal] = useState("");
  const [passengerCapacity, setPassengerCapacity] = useState("");

  const [driverFields, setDriverFields] = useState({
    name: "",
    transfer_id: "",
    veh_no: "",
    veh_model: "",
    veh_color: "",
    veh_price_ac: "",
    veh_price_non_ac: "",
    price_valid_from: "",
    price_valid_to: "",
    veh_img: "",
    mob_no_1: "",
    mob_no_2: "",
    address: "",
    aadher_no: "",
    driver_img: "",
    driver_id_card: "",
    license_copy: "",
    status: "1",
  });

  const handleChange = (event) => {
    return setDriverFields({
      ...driverFields,
      [event.target.name]: event.target.value,
    });
  };

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
                src={`${params.data.driver_img}`}
              />
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Mobile",
      field: "mob_no_1",
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
                  {` ` + params.data.vehicle.veh_mark}
                </span>
              </div>
              <div className="text-sm mt-[-1px]">
                No :
                <span className="text-black font-bold">
                  {` ` + params.data.veh_no}
                </span>
              </div>
              <div className="text-sm mt-[-1px]">
                Model :
                <span className="text-black font-bold">
                  {` ` + params.data.veh_model}
                </span>
              </div>
              <div className="text-sm mt-[-1px]">
                Color :
                <span className="text-black font-bold">
                  {` ` + params.data.veh_color}
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
      flex: 1.7,
      cellRenderer: (params) => {
        return (
          <div className="ml-[-10px] flex flex-col items-start justify-center w-full h-full">
            <div className="text-sm mt-[-1px]">
              {`(AC) : `}
              <span className="text-black text-xs font-bold">
                {`₹` + params.data.veh_price_ac}
              </span>
            </div>
            <div className="text-sm mt-[-1px]">
              {`(Non - AC) : `}
              <span className="text-black  text-xs font-bold">
                {`₹` + params.data.veh_price_non_ac}
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
      field: "price_valid_from",
      cellRenderer: (params) => {
        return (
          <div
            className={`flex items-center justify-center w-full h-6 text-white text-xs rounded-md ${
              dayjs(params.data.price_valid_to, "DD/MM/YY").isBefore(
                dayjs(),
                "day"
              )
                ? "bg-red-600"
                : "bg-green-600"
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
      field: "price_valid_to",
      cellRenderer: (params) => {
        return (
          <div
            className={`flex items-center justify-center w-full h-6 text-white text-xs rounded-md ${
              dayjs(params.value, "DD/MM/YY").isBefore(dayjs(), "day")
                ? "bg-red-600"
                : "bg-green-600"
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
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-[35px]">
            <div
              className={`flex items-center justify-center w-14 px-8 ${
                params.value === "1" ? "bg-green-600" : "bg-red-600"
              }  text-white rounded-md h-[70%]`}
            >
              {params.value == "1" ? "Active" : "Inactive"}
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Updated By",
      flex: 2.2,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-start gap-2 w-full h-full">
            <div className="p-1 rounded-full border border-black h-6 w-6 flex items-center justify-center">
              J
            </div>
            <div className="w-0">JaffarSaleem@gmail.com</div>
          </div>
        );
      },
    },
    {
      headerName: "Updated On",
      filter: false,
      field: "updated_at",
      flex: 1.2,
      valueGetter: (params) => {
        return `${params.data.updated_at}`;
      },
    },
    {
      sortable: false,
      filter: false,
      flex: 0.5,
      cellRenderer: (params) => {
        return (
          <div
            onClick={() => {
              const mark = vehicle_Mark.find((obj) => {
                return obj.id == params.data.transfer_id;
              });
              setOpen(true);
              setStat("Edit");
              setDriverFields({
                name: params.data.name,
                transfer_id: params.data.transfer_id,
                veh_no: params.data.veh_no,
                veh_model: params.data.veh_model,
                veh_color: params.data.veh_color,
                veh_price_ac: params.data.veh_price_non_ac,
                veh_price_non_ac: params.data.veh_price_non_ac,
                veh_img: params.data.veh_img,
                mob_no_1: params.data.mob_no_1,
                mob_no_2: params.data.mob_no_2,
                address: params.data.address,
                aadher_no: params.data.aadher_no,
                driver_img: params.data.driver_img,
                driver_id_card: params.data.driver_id_card,
                license_copy: params.data.licenseCopy,
                status: params.data.status,
              });
              setShowFromDate(
                dayjs(params.data.price_valid_from, "YYYY-MM-DD")
              );
              setShowToDate(dayjs(params.data.price_valid_to, "YYYY-MM-DD"));
              setStat("Edit");
              setvehicleMarkVal(mark.veh_mark);
              setPassengerCapacity(mark.passenger_capacity);
              setId(params.data.id);
            }}
            className="flex items-center justify-center w-full h-full"
          >
            <EditIcon
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
          setDriverPhoto(reader.result);
          console.log(reader.result);
          setDriverFields({ ...driverFields, driver_img: file });
        }
        if (str === "id") {
          setIdCardImg(reader.result);
          setDriverFields({ ...driverFields, driver_id_card: file });
        }
        if (str === "vehicle") {
          setVehiclePhoto(reader.result);
          setDriverFields({ ...driverFields, veh_img: file });
        }
        if (str === "liscense") {
          setLicenseCopy(reader.result);
          setDriverFields({ ...driverFields, license_copy: file });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {};

  const payload = new FormData();

  const handleSave = () => {
    setAble(true);
    if (
      driverFields.name !== "" &&
      driverFields.transfer_id !== "" &&
      driverFields.veh_no !== "" &&
      driverFields.veh_model !== "" &&
      driverFields.veh_color !== "" &&
      driverFields.veh_price_ac !== "" &&
      driverFields.veh_price_non_ac !== "" &&
      driverFields.price_valid_from !== "" &&
      driverFields.price_valid_to !== "" &&
      driverFields.veh_img !== "" &&
      driverFields.mob_no_1 !== "" &&
      driverFields.mob_no_2 !== "" &&
      driverFields.address !== "" &&
      driverFields.aadher_no !== "" &&
      driverFields.driver_img !== "" &&
      driverFields.driver_id_card !== "" &&
      driverFields.license_copy !== "" &&
      driverFields.status !== ""
    ) {
      for (var key in driverFields) {
        if (driverFields.hasOwnProperty(key)) {
          if (driverFields[key] instanceof File) {
            payload.append(key, driverFields[key]);
          } else {
            payload.append(key, driverFields[key]);
          }
        }
      }

      axios
        .post("https://jajasend.site/api/v1/driver", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-rapidapi-host": "file-upload8.p.rapidapi.com",
            "x-rapidapi-key": "your-rapidapi-key-here",
          },
        })
        .then((res) => {
          setAble(false);
          toast.success("Driver Added Successfully");
          setReload(!reload);
          setOpen(false);
        })
        .catch((err) => {
          setAble(false);
          console.log(err);
        });
    } else {
      toast.error("Please Fill All Fields Correctly");
      setAble(false);
    }

    console.log(driverFields);
  };

  const handleDelete = () => {
    const confirmationToastId = toast.warning(
      <div className="flex flex-col">
        <p>You want to delete this item?</p>
        <div className="flex items-center justify-start gap-2">
          <button
            className="w-8 h-6  text-xs bg-red-500 rounded-md text-white"
            onClick={() => {
              axios
                .delete(
                  `https://jajasend.site/api/v1/driver/${id}`
                )
                .then((response) => {
                  toast.dismiss(confirmationToastId);
                  toast.success("Accommodation Deleted Successfully");
                  setReload(!reload);
                  setOpen(false);
                })
                .catch((err) => {
                  console.log(err.response.data);
                });
            }}
          >
            Yes
          </button>
          <button
            className="w-8 h-6 text-xs bg-green-500 rounded-md text-white "
            onClick={() => {
              toast.dismiss(confirmationToastId);
            }}
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const ExportData = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv();
    }
  };

  const showMatches = (input) => {
    return vehicle_Mark.filter((item) => {
      if (input == "") {
        return false;
      }
      return item.veh_mark.toLowerCase().includes(input.toLowerCase());
    });
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

  const matchArr = showMatches(vehicleMarkVal);

  useEffect(() => {
    axios
      .get("https://jajasend.site/api/v1/driver")
      .then((response) => {
        setRow(response.data.reverse());
      })
      .catch((err) => {
        console.log("Error --> ", err);
      });

    const getVehicleMarks = () => {
      axios.get("https://jajasend.site/api/v1/vehicle").then((response) => {
        vehicle_Mark = response.data;
      });
    };

    getVehicleMarks();
  }, [reload]);

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
                setShowFromDate(dayjs());
                setShowToDate(dayjs());
                setvehicleMarkVal("");
                setPassengerCapacity("")
                setDriverFields({
                  name: "",
                  transfer_id: "",
                  veh_no: "",
                  veh_model: "",
                  veh_color: "",
                  veh_price_ac: "",
                  veh_price_non_ac: "",
                  price_valid_from: "",
                  price_valid_to: "",
                  veh_img: "",
                  mob_no_1: "",
                  mob_no_2: "",
                  address: "",
                  aadher_no: "",
                  driver_img: "",
                  driver_id_card: "",
                  license_copy: "",
                  status: "1",
                });
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

      <div className=" h-[91.5%] w-full overflow-x-auto ">
        <div className="ag-theme-quartz h-full w-[2200px] xl:w-full">
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
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[60%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Driver </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>

              <div className="w-full flex justify-between h-[90%] mt-3">
                <div className="flex flex-col items-start justify-center h-full w-[48%]">
                  <div className=" w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Driver Name"
                      name="name"
                      value={driverFields.name}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <PhoneInput
                      defaultCountry="IN"
                      value={driverFields.mob_no_1}
                      onChange={(e) => {
                        setDriverFields({ ...driverFields, mob_no_1: e });
                      }}
                      placeholder="Mobile No"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <PhoneInput
                      defaultCountry="IN"
                      value={driverFields.mob_no_2}
                      onChange={(e) => {
                        setDriverFields({ ...driverFields, mob_no_2: e });
                      }}
                      placeholder="Alternative No"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      value={driverFields.address}
                      name="address"
                      onChange={(e) => {
                        handleChange(e);
                      }}
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
                      name="aadher_no"
                      value={driverFields.aadher_no}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>

                  <div className=" relative mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Vehicle Mark"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      value={vehicleMarkVal}
                      onChange={(e) => {
                        setvehicleMarkVal(e.target.value);
                        setShowPicker(true);
                        setPassengerCapacity("");
                      }}
                    />
                    {showPicker && vehicleMarkVal && matchArr.length > 0 && (
                      <ul className="absolute z-10 bg-[#f9f9f9] h-[100px] overflow-y-auto w-full border rounded-b-lg p-1 border-black">
                        {matchArr.map((match, index) => (
                          <li
                            className="hover:bg-blue-200 cursor-pointer rounded-sm p-1 border-b"
                            key={index}
                            onClick={() => {
                              setvehicleMarkVal(match.veh_mark);
                              setPassengerCapacity(match.passenger_capacity);
                              setDriverFields({
                                ...driverFields,
                                transfer_id: match.id,
                              });
                              setShowPicker(false);
                            }}
                          >
                            {match.veh_mark}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-4 w-full">
                    <input
                      type="number"
                      value={passengerCapacity}
                      className="focus:outline-none w-full border border-[#b9b9b9] h-10 px-2 rounded-md p-1 text-black"
                      placeholder="Passanger Capacity"
                      disabled={true}
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      name="veh_no"
                      value={driverFields.veh_no}
                      onChange={handleChange}
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
                        value={driverFields.veh_model}
                        onChange={handleChange}
                        name="veh_model"
                        label="Vehicle Model"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className=" w-[49%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        value={driverFields.veh_color}
                        onChange={handleChange}
                        name="veh_color"
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
                        value={driverFields.veh_price_ac}
                        name="veh_price_ac"
                        onChange={handleChange}
                        size="small"
                        label={
                          <>
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
                        value={driverFields.veh_price_non_ac}
                        name="veh_price_non_ac"
                        onChange={handleChange}
                        size="small"
                        label={
                          <>
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
                          format="DD-MM-YYYY"
                          label="Price Valid From"
                          value={showFromDate}
                          onAccept={(e) => {
                            const fromDate = dayjs(e).format("YYYY-MM-DD");
                            setShowFromDate(e);
                            setDriverFields({
                              ...driverFields,
                              price_valid_from: fromDate,
                            });
                          }}
                        />
                      </LocalizationProvider>
                    </div>

                    <div className="mt-4 w-[48%] custom-date-picker">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                          format="DD-MM-YYYY"
                          label="Price Valid To"
                          value={showToDate}
                          onAccept={(e) => {
                            const toDate = dayjs(e).format("YYYY-MM-DD");
                            setShowToDate(e);
                            setDriverFields({
                              ...driverFields,
                              price_valid_to: toDate,
                            });
                          }}
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
                        onChange={(e) => handleFileSelect(e, "id")}
                        style={{ display: "none" }}
                      />
                      <div className="flex items-center gap-3">
                        <label htmlFor="file-input1" className="cursor-pointer">
                          <AddPhotoAlternateOutlinedIcon className="text-slate-500 hover:text-slate-950" />
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
                        onChange={(e) => handleFileSelect(e, "vehicle")}
                        style={{ display: "none" }}
                      />
                      <div className="flex items-center gap-3">
                        <label htmlFor="file-input2" className="cursor-pointer">
                          <AddPhotoAlternateOutlinedIcon className="text-slate-500 hover:text-slate-950" />
                        </label>
                        <div className="hidden md:block  text-xs overflow-x-auto">
                          {vehiclePhoto === "" ? `Vehicle Image` : "Selected  "}
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
                        onChange={(e) => handleFileSelect(e, "driver")}
                        style={{ display: "none" }}
                      />
                      <div className="flex items-center gap-3">
                        <label htmlFor="file-input3" className="cursor-pointer">
                          <AddPhotoAlternateOutlinedIcon className="text-slate-500 hover:text-slate-950" />
                        </label>
                        <div className="hidden md:block  text-xs overflow-x-auto">
                          {driverPhoto === "" ? `Driver Image` : "Selected  "}
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
                        onChange={(e) => handleFileSelect(e, "liscense")}
                        style={{ display: "none" }}
                      />
                      <div className="flex items-center gap-3">
                        <label htmlFor="file-input4" className="cursor-pointer">
                          <AddPhotoAlternateOutlinedIcon className="text-slate-500 hover:text-slate-950" />
                        </label>
                        <div className="hidden md:block  text-xs overflow-x-auto">
                          {licenseCopy === "" ? `Liscense Copy` : "Selected  "}
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
                    className="px-2 focus:outline-none mt-4 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md"
                    value={driverFields.status}
                    name="status"
                    onChange={handleChange}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div
                  onClick={
                    stat === "Edit"
                      ? handleDelete
                      : () => {
                          handleClose("modal");
                        }
                  }
                  className=" w-[48%] rounded-md h-10"
                >
                  <button
                    className={` bg-red-600 hover:bg-red-900 w-full rounded-md  text-white h-full flex items-center justify-center`}
                  >
                    {stat === "Edit" ? "Delete" : "Cancel"}
                  </button>
                </div>

                <div className=" w-[48%] rounded-md h-10  ">
                  <button
                    disabled={able}
                    onClick={stat === "Edit" ? handleUpdate : handleSave}
                    className={`w-full rounded-md h-full flex items-center
                         hover:bg-green-900 bg-green-600
                    justify-center text-white`}
                  >
                    {stat === "Edit" ? "Update" : "Save"}
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
