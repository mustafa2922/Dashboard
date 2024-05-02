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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const BASE_URL = import.meta.env.VITE_BASE_URL;

const email = "jaffarSaleem@gmail.com";

let vehicle_Mark = [];

function Driver() {
  const [able, setAble] = useState(false);
  const [id, setId] = useState("");
  const [reload, setReload] = useState(false);

  const [Editopen, setEditOpen] = useState(false);

  const [errors, setErrors] = useState({ name: null, helperTxt: null });

  const [search, setSearch] = useState("");
  const [row, setRow] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setErrors({ name: null, helperTxt: null });
    setOpen(false);
  };
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

  const [passengerCapacity, setPassengerCapacity] = useState("");

  const [driverFields, setDriverFields] = useState({
    name: "",
    transfer_id: "DEFAULT",
    veh_no: "",
    veh_model: "",
    veh_color: "",
    veh_price_ac: "",
    veh_price_non_ac: "",
    price_valid_from: dayjs().format("YYYY-MM-DD"),
    price_valid_to: dayjs().format("YYYY-MM-DD"),
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

  const validateFields = () => {
    if (driverFields.name.trim() === "") {
      return setErrors({ name: "name", helperTxt: "Name Cannot Be Empty" });
    }

    if (driverFields.mob_no_1.length !== 13) {
      return setErrors({
        name: "mob_no_1",
        helperTxt: "Number Must Contain 10 Digts",
      });
    }
    if (driverFields.mob_no_2.length !== 13) {
      return setErrors({
        name: "mob_no_2",
        helperTxt: "Number Must Conatain 10 Digits",
      });
    }
    if (driverFields.address.trim() === "") {
      return setErrors({
        name: "address",
        helperTxt: "Address Cannot Be Empty",
      });
    }

    if (driverFields.aadher_no.includes(" ") || driverFields.aadher_no === "" || driverFields.aadher_no.length != 14) {
      return setErrors({
        name: "aadher_no",
        helperTxt: "Aadhar No Must Contain 12 Digits",
      });
    }
    if (driverFields.transfer_id === "DEFAULT") {
      return setErrors({
        name: "transfer_id",
        helperTxt: "Please Select Vehicle Mark",
      });
    }
    if (driverFields.veh_no.trim() === "") {
      return setErrors({
        name: "veh_no",
        helperTxt: "Vehicle No Cannot Be Empty",
      });
    }
    if (driverFields.veh_model.trim() === "") {
      return setErrors({
        name: "veh_model",
        helperTxt: "Vehicle Model Cannot Be Empty",
      });
    }
    if (driverFields.veh_color.trim() === "") {
      return setErrors({
        name: "veh_color",
        helperTxt: "Vehicle Color Cannot Be Empty",
      });
    }
    if (driverFields.veh_price_non_ac.trim() === "") {
      return setErrors({
        name: "veh_price_non_ac",
        helperTxt: "Vehicle Price Cannot Be Empty",
      });
    }
    if (driverFields.veh_price_ac.trim() === "") {
      return setErrors({
        name: "veh_price_ac",
        helperTxt: "Vehicle Price Cannot Be Empty",
      });
    }
    return true;
  };

  const handleChange = (event) => {
    setErrors({ name: null, helperTxt: null });
    return setDriverFields({
      ...driverFields,
      [event.target.name]: event.target.value,
    });
  };


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
            <div className="h-full leading-4 w-[60%]  text-[0.95rem] whitespace-pre-wrap font-bold flex items-center ">
              {params.data.name}
            </div>
            <div className="h-full w-20">
              <div className="h-full w-full rounded-md overflow-hidden group relative">
                <div
                  onClick={() => {
                    setEditOpen(true);
                  }}
                  className="cursor-pointer hidden group-hover:flex bg-black h-5 rounded-full p-3 w-5 justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
                >
                  <EditIcon style={{ color: "#fff", fontSize: 18 }} />
                </div>
                <img
                  className="w-full h-full object-contain"
                  src={params.data.driver_img_url}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Mobile",
      field: "mob_no_1",
      flex: 1.5,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-start gap-2 w-full h-full">
            <div className="-ml-2">{params.value}</div>
          </div>
        );
      },
    },
    {
      headerName: "Vehicle Details",
      filter: false,
      flex: 2.5,
      cellRenderer: (params) => {
        return (
          <div className="ml-[-10px] flex items-center justify-between p-1 h-full w-full">
            <div className="w-full items-start justify-center h-full flex flex-col">
              <div className="flex flex-row w-full items-center ">
                <div className="text-sm w-[40%] ">Mark: </div>
                <div className="text-black w-[58%] font-bold">
                  {` ` + params.data.vehicle.veh_mark}
                </div>
              </div>

              <div className="flex flex-row w-full items-center -mt-5">
                <div className="text-sm w-[40%]">Veh No: </div>
                <div className="text-black w-[58%] font-bold">
                  {` ` + params.data.veh_no}
                </div>
              </div>

              <div className="flex flex-row w-full items-center -mt-5">
                <div className="text-sm w-[40%]">Model: </div>
                <div className="text-black w-[58%] font-bold">
                  {` ` + params.data.veh_model}
                </div>
              </div>

              <div className="flex flex-row w-full items-center -mt-5">
                <div className="text-sm w-[40%]">Color: </div>
                <div className="text-black w-[58%] font-bold">
                  {` ` + params.data.veh_color}
                </div>
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
            <div className="flex w-full items-center">
              <div className="text-sm  w-[55%]">Non-AC :</div>
              <div className="text-black  w-[36%]  text-sm font-bold">
                {`₹` + params.data.veh_price_non_ac}
              </div>
            </div>
            <div className="flex w-full items-center">
              <div className="text-sm  w-[55%]">AC : </div>
              <div className="text-black text-sm w-[36%] font-bold">
                {`₹` + params.data.veh_price_ac}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Price Valid From",
      flex: 1.65,
      filter: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
      },
      field: "price_valid_from",
      cellRenderer: (params) => {
        return (
          <div
            className={`flex items-center justify-center w-full h-6 text-white text-sm font-[500] rounded-md ${
              dayjs(params.data.price_valid_to, "YYYY-MM-DD").isBefore(
                dayjs(),
                "day"
              )
                ? "bg-red-600"
                : "bg-green-600"
            } `}
          >
            {dayjs(params.value).format("DD-MM-YYYY")}
          </div>
        );
      },
    },
    {
      headerName: "Price Valid To",
      filter: false,
      flex: 1.5,
      cellStyle: {
        display: "flex",
        alignItems: "center",
      },
      field: "price_valid_to",
      cellRenderer: (params) => {
        return (
          <div
            className={`flex items-center justify-center w-full h-6 text-white text-sm font-[500] rounded-md ${
              dayjs(params.value, "YYYY-MM-DD").isBefore(dayjs(), "day")
                ? "bg-red-600"
                : "bg-green-600"
            } `}
          >
            {dayjs(params.value).format("DD-MM-YYYY")}
          </div>
        );
      },
    },
    {
      headerName: "Status",
      field: "status",
      filter: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
      },
      flex: 0.85,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-[35px]">
            <div
              className={`flex items-center font-[500] justify-center px-1 ${
                params.value == "1" ? "bg-green-600" : "bg-red-600"
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
      filter: false,
      cellStyle: { border: "none", marginTop: "30px" },
      flex: 1.5,
      valueGetter: () => {
        return email;
      },
    },
    {
      headerName: "Updated On",
      filter: false,
      field: "updated_at",
      cellStyle: {
        display: "flex",
        alignItems: "center",
        borderLeft: "1px solid #d9d9db",
      },
      flex: 1.3,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-start gap-2 w-full h-full">
            <div className="-ml-3">
              {dayjs(params.data.updated_at).format("DD-MM-YYYY")}
            </div>
          </div>
        );
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
              setPassengerCapacity(params.data.vehicle.passenger_capacity);
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

  const handleUpdate = () => {
    setAble(true);
    delete driverFields.driver_id_card;
    delete driverFields.driver_img;
    delete driverFields.license_copy;
    delete driverFields.veh_img;

    const validate = validateFields();

    if (validate) {
      axios
        .put(`${BASE_URL}api/v1/driver/${id}`, driverFields)
        .then((response) => {
          toast.success("Driver Updated Successfully");
          setReload(!reload);
          setAble(false);
          setOpen(false);
        })
        .catch((err) => {
          err.response.data.message.includes('drivers_veh_no_unique')
            ? toast.error("Vehivle No must be unique")
            : "";
          setAble(false);
        });
    } else {
      setAble(false);
    }
  };

  const payload = new FormData();

  const handleSave = () => {
    setAble(true);

    const validate = validateFields();

    if (validate) {
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
        .post(`${BASE_URL}api/v1/driver`, payload)
        .then((res) => {
          setAble(false);
          toast.success("Driver Added Successfully");
          setReload(!reload);
          setOpen(false);
        })
        .catch((err) => {
          setAble(false);
          err.response.data == "vehicle number must be unique"
            ? toast.error("Vehivle No must be unique")
            : "";
        });
    } else {
      setAble(false);
    }
  };

  const handleDelete = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        container: "custom-swal-container",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}api/v1/driver/${id}`)
          .then((response) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your Item has been deleted.",
              icon: "success",
            });
            setReload(!reload);
            setOpen(false);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    });
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
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
    },
    flex: 1,
    tooltipField: "name",
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}api/v1/driver`)
      .then((response) => {
        setRow(response.data.reverse());
      })
      .catch((err) => {
        console.log("Error --> ", err);
      });

    const getVehicleMarks = () => {
      axios.get(`${BASE_URL}api/v1/vehicle`).then((response) => {
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
                setPassengerCapacity("");
                setDriverFields({
                  name: "",
                  transfer_id: "DEFAULT",
                  veh_no: "",
                  veh_model: "",
                  veh_color: "",
                  veh_price_ac: "",
                  veh_price_non_ac: "",
                  price_valid_from: dayjs().format("YYYY-MM-DD"),
                  price_valid_to: dayjs().format("YYYY-MM-DD"),
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
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[40%] h-fit">
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
                      error={errors.name === "name"}
                      name="name"
                      value={driverFields.name}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "name" && errors.helperTxt}
                  </p>

                  <div className="mt-3 w-full">
                    <PhoneInput
                      defaultCountry="IN"
                      value={driverFields.mob_no_1}
                      onChange={(e) => {
                        setDriverFields({ ...driverFields, mob_no_1: e });
                        setErrors({ name: null, helperTxt: null });
                      }}
                      onKeyDown={(e) => {
                        if (
                          driverFields.mob_no_1 &&
                          driverFields.mob_no_1.length >= 13 &&
                          e.key !== "Backspace"
                        ) {
                          e.preventDefault();
                        }
                      }}
                      placeholder="Mobile No"
                      className={`border ${
                        errors.name === "mob_no_1"
                          ? "border-red-600"
                          : "hover:border-black border-[#b9b9b9]"
                      }  rounded-sm p-2 h-10`}
                    />
                    <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                      {errors.name === "mob_no_1" && errors.helperTxt}
                    </p>
                  </div>

                  <div className="mt-3 w-full">
                    <PhoneInput
                      defaultCountry="IN"
                      value={driverFields.mob_no_2}
                      onChange={(e) => {
                        setDriverFields({ ...driverFields, mob_no_2: e });
                        setErrors({ name: null, helperTxt: null });
                      }}
                      onKeyDown={(e) => {
                        if (
                          driverFields.mob_no_2 &&
                          driverFields.mob_no_2.length >= 13 &&
                          e.key !== "Backspace"
                        ) {
                          e.preventDefault();
                        }
                      }}
                      placeholder="Alternative No"
                      className={`border ${
                        errors.name === "mob_no_2"
                          ? "border-red-600"
                          : "hover:border-black border-[#b9b9b9]"
                      }  rounded-sm p-2 h-10`}
                    />
                    <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                      {errors.name === "mob_no_2" && errors.helperTxt}
                    </p>
                  </div>

                  <div className="mt-3 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      value={driverFields.address}
                      error={errors.name === "address"}
                      name="address"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      label="Driver Address"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "address" && errors.helperTxt}
                  </p>

                  <div className="mt-3 w-full">
                    <PatternFormat
                      format="####_####_####"
                      className={`focus:outline-none w-full border ${
                        errors.name === "aadher_no"
                          ? "border-red-600"
                          : "border-slate-400"
                      } h-10 px-2 rounded-md p-1 text-black`}
                      placeholder="Aadhar No"
                      name="aadher_no"
                      value={driverFields.aadher_no}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                      {errors.name === "aadher_no" && errors.helperTxt}
                    </p>
                  </div>

                  <div className=" relative mt-4 w-full">
                    <select
                      id="outlined-basic"
                      size="small"
                      label="Vehicle Mark"
                      variant="outlined"
                      className={`px-2 focus:outline-none w-full border h-10  focus:border  ${
                        errors.name === "transfer_id"
                          ? "border-red-600"
                          : "hover:border-black border-[#d8d8d8]"
                      }  rounded-md`}
                      sx={{ width: "100%" }}
                      value={driverFields.transfer_id}
                      onChange={(e) => {
                        handleChange(e);
                        const selectedOption = e.target.value;
                        const selectedVehicle = vehicle_Mark.find((item) => {
                          return item.id == selectedOption;
                        });
                        if (selectedVehicle) {
                          setPassengerCapacity(
                            selectedVehicle.passenger_capacity
                          );
                        }
                      }}
                      name="transfer_id"
                    >
                      <option value="DEFAULT" disabled={true}>
                        Vehicle Mark
                      </option>
                      {vehicle_Mark.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.veh_mark}
                          </option>
                        );
                      })}
                    </select>
                    <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                      {errors.name === "transfer_id" && errors.helperTxt}
                    </p>
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
                      onChange={(e) => {
                        setDriverFields({
                          ...driverFields,
                          veh_no: e.target.value.toUpperCase(),
                        });
                      }}
                      error={errors.name === "veh_no"}
                      label="Vehicle No"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                    <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                      {errors.name === "veh_no" && errors.helperTxt}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center h-full w-[48%]">
                  <div className="flex w-full justify-between items-center">
                    <div className=" w-[49%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        value={driverFields.veh_model}
                        error={errors.name === "veh_model"}
                        onChange={handleChange}
                        name="veh_model"
                        label="Vehicle Model"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                      <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                        {errors.name === "veh_model" && errors.helperTxt}
                      </p>
                    </div>
                    <div className=" w-[49%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        value={driverFields.veh_color}
                        onChange={handleChange}
                        error={errors.name === "veh_color"}
                        name="veh_color"
                        label="Vehicle Color"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                      <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                        {errors.name === "veh_color" && errors.helperTxt}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full mt-3 justify-between items-center">
                    <div className=" w-[50%]">
                      <TextField
                        id="outlined-basic"
                        value={driverFields.veh_price_non_ac}
                        name="veh_price_non_ac"
                        onChange={handleChange}
                        error={errors.name === "veh_price_non_ac"}
                        size="small"
                        label={
                          <>
                            <CurrencyRupeeIcon style={{ fontSize: 14 }} />
                            <span className="text-[0.66rem]">
                              Vehicle Price (Non AC)
                            </span>
                          </>
                        }
                        variant="outlined"
                        sx={{ width: "100%" }}
                        type="number"
                      />
                      <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                        {errors.name === "veh_price_non_ac" && errors.helperTxt}
                      </p>
                    </div>
                    <div className=" w-[49%]">
                      <TextField
                        id="outlined-basic"
                        value={driverFields.veh_price_ac}
                        name="veh_price_ac"
                        onChange={handleChange}
                        error={errors.name === "veh_price_ac"}
                        size="small"
                        label={
                          <>
                            <CurrencyRupeeIcon style={{ fontSize: 14 }} />
                            <span className="text-[0.7rem]">
                              Vehicle Price (AC)
                            </span>
                          </>
                        }
                        variant="outlined"
                        sx={{ width: "100%" }}
                        type="number"
                      />
                      <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                        {errors.name === "veh_price_ac" && errors.helperTxt}
                      </p>
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
                  {stat !== "Edit" && (
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
                          <label
                            htmlFor="file-input3"
                            className="cursor-pointer"
                          >
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
                  )}

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
                    {able
                      ? "Processing..."
                      : stat === "Edit"
                      ? "Update"
                      : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            keepMounted
            open={Editopen}
            onClose={() => {
              setEditOpen(false);
            }}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[70%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> Media Library </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setEditOpen(false);
                  }}
                >
                  <CloseIcon />
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
