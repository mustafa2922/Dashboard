import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import "react-phone-number-input/style.css";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TextField from "@mui/material/TextField";
import ReactStars from "react-rating-stars-component";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import Textarea from "@mui/joy/Textarea";
import { Input } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import "./Hotel.css";
import HotelPrice from "./HotelTariff";
import ImageModal from "../../../../Components/imageModal";
import axios from "axios";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { toast } from "react-toastify";

let destinations = [];

function Hotel() {
  const [id, setId] = useState("");

  const [hotelFields, setHotelFields] = useState({
    property_type: "DEFAULT",
    name: "",
    category: "DEFAULT",
    destination_id: "",
    address: "",
    contact_no: "",
    details: "",
    // hotelImage: "",  baad may active karni hay
    tarif_valid_from: "",
    tarif_valid_to: "",
    contact_person: "",
    mob_no_1: "",
    mob_no_2: "",
    reservation_email: "",
    website_link: "",
    status: "DEFAULT",
  });

  const [search, setSearch] = useState("");
  const [row, setRow] = useState();
  const [open, setOpen] = useState(false);
  const [tarifOpen, setTarifOpen] = useState(false);
  const [hotelName, sethotelName] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [destinationVal, setDestinationVal] = useState("");

  
  const [reload, setReload] = useState(false);
  const [click, setClick] = useState(true);

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
      field: "property_type",
      flex: 0.8,
    },
    {
      headerName: "Category",
      field: "category",
      flex: 1.18,
      cellRenderer: (params) => {
        return (
          <ReactStars
            count={5}
            value={Number(params.value)}
            edit={false}
            size={20}
            activeColor="#ffd700"
          />
        );
      },
    },
    {
      headerName: "Destination",
      field: `destination.name`,
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
      field: "tarif_valid_from",
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params) => {
        const formattedDate = dayjs(params.value).format("DD-MM-YYYY");
        return (
          <div
            className={`flex items-center justify-center w-28 h-6 text-white font-bold rounded-md ${
              dayjs(params.data.tarif_valid_to, "YYYY-MM-DD").isBefore(
                dayjs(),
                "day"
              )
                ? "bg-red-600"
                : "bg-green-600"
            } `}
          >
            {formattedDate}
          </div>
        );
      },
      flex: 1.35,
    },
    {
      headerName: "Tarif Valid To",
      field: "tarif_valid_to",
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params) => {
        const formattedDate = dayjs(params.value).format("DD-MM-YYYY");
        return (
          <div
            className={`flex items-center justify-center w-28 h-6 text-white font-bold rounded-md ${
              dayjs(params.value, "YYYY-MM-DD").isBefore(dayjs(), "day")
                ? "bg-red-600"
                : "bg-green-600"
            } `}
          >
            {formattedDate}
          </div>
        );
      },
      flex: 1.18,
    },
    {
      headerName: "Bank Details",
      sortable: false,
      filter: false,
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
      flex: 0.83,
    },
    {
      headerName: "Status",
      field: "status",
      flex: 0.7,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
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
      headerName: "Updated On",
      field: "updated_at",
      cellRenderer: (params) => {
        const formattedDate = dayjs(params.value).format("DD-MM-YYYY");
        return <div>{formattedDate}</div>;
      },
    },
    {
      sortable: false,
      filter: false,
      flex: 0.3,
      cellRenderer: (params) => {
        return (
          <div
            onClick={() => {
              const dest = destinations.find(
                (obj) => obj.id == params.data.destination_id
              );
              setHotelFields({
                property_type: params.data.property_type,
                name: params.data.name,
                category: params.data.category,
                destination_id: dest.id,
                address: params.data.address,
                contact_no: params.data.contact_no,
                details: params.data.details,
                // hotelImage: "",  baad may active karni hay
                tarif_valid_from: params.data.tarif_valid_from,
                tarif_valid_to: params.data.tarif_valid_to,
                contact_person: params.data.contact_person,
                mob_no_1: params.data.mob_no_1,
                mob_no_2: params.data.mob_no_2,
                reservation_email: params.data.reservation_email,
                website_link: params.data.website_link,
                status: params.data.status,
              });
              setOpen(true);
              setShowFromDate(
                dayjs(params.data.tarif_valid_from, "YYYY-MM-DD")
              );
              setShowToDate(dayjs(params.data.tarif_valid_to, "YYYY-MM-DD"));
              setStat("Edit");
              setDestinationVal(dest.name);
              setId(params.data.id);
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

  const [showFromDate, setShowFromDate] = useState(dayjs());
  const [showToDate, setShowToDate] = useState(dayjs());

  const showMatches = (input) => {
    return destinations.filter((item) => {
      if (input == "") {
        return false;
      }
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
  };

  const matchArr = showMatches(destinationVal);

  const handleClose = (name) => {
    if (name === "modal") {
      setClick(true);
      setOpen(false);
    } else if (name === "tarif") {
      setTarifOpen(false);
    } else if (name === "bank") {
      setBankOpen(false);
      setClick(true);
    }
  };

  const handleDelete = () => {
    axios
      .delete(`http://test.seoconsole.net/api/v1/accomodation/${id}`)
      .then((response) => {
        toast.success("Accomodation Deleted Successfully");
        setReload(!reload);
        handleClose("modal");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleUpdate = () => {
    axios
      .put(`http://test.seoconsole.net/api/v1/accomodation/${id}`, hotelFields)
      .then((response) => {
        toast.success("Accomodation Updated Successfully");
        setReload(!reload);
        setClick(true);
        handleClose("modal");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const [gridApi, setGridApi] = useState(null);

  const [hotelImage, setHotelImage] = useState("");

  const [stat, setStat] = useState("");

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleChange = (event) => {
    return setHotelFields({
      ...hotelFields,
      [event.target.name]: event.target.value,
    });
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
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setHotelImage(reader.result);
        console.log(reader.result)
      };
      reader.readAsDataURL(file);
    } else {
      setHotelImage("");
    }
  };

  const handleSave = () => {
    if (
      hotelFields.address !== "" &&
      hotelFields.category !== "DEFAULT" &&
      hotelFields.contact_no !== "" &&
      hotelFields.contact_person !== "" &&
      hotelFields.destination_id !== "" &&
      hotelFields.details !== "" &&
      hotelFields.mob_no_1 !== "" &&
      hotelFields.mob_no_2 !== "" &&
      hotelFields.name !== "" &&
      hotelFields.property_type !== "DEFAULT" &&
      hotelFields.reservation_email !== "" &&
      hotelFields.status !== "DEFAULT"
    ) {
      axios
        .post("http://test.seoconsole.net/api/v1/accomodation", hotelFields)
        .then((res) => {
          toast.success("Data Added Successfully");
          setReload(!reload);
          handleClose("modal");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please Fill All Fields Correctly");
    }
  };

  useEffect(() => {
    const getData = () => {
      axios
        .get("http://test.seoconsole.net/api/v1/accomodation")
        .then((response) => {
          setRow(response.data.reverse());
        }),
        [reload];
    };

    const getDestinations = () => {
      axios
        .get("http://test.seoconsole.net/api/v1/destination")
        .then((response) => {
          destinations = response.data;
        });
    };

    getData();
    getDestinations();
  }, [reload]);

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
                setDestinationVal("");
                setShowFromDate(dayjs());
                setShowToDate(dayjs());
                setHotelFields({
                  property_type: "DEFAULT",
                  name: "",
                  category: "DEFAULT",
                  destination_id: "",
                  address: "",
                  contact_no: "",
                  details: "",
                  // hotelImage: "",  baad may active karni hay
                  tarif_valid_from: "",
                  tarif_valid_to: "",
                  contact_person: "",
                  mob_no_1: "",
                  mob_no_2: "",
                  reservation_email: "",
                  website_link: "",
                  status: "DEFAULT",
                });
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

      <div className="h-[92%] w-full overflow-x-auto">
        <div className="ag-theme-quartz h-full xl:w-full  w-[2200px]">
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={column}
            rowData={row}
            defaultColDef={defaultColDef}
            enableBrowserTooltips={true}
            pagination={true}
            paginationPageSize={20}
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
            <div className="p-3 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[90%] lg:w-[55%] h-fit">
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
              <div className="flex justify-between w-full mt-3 h-[90%]">
                <div className="flex flex-col w-[48%]">
                  <select
                    value={hotelFields.property_type}
                    name="property_type"
                    disabled={stat === "Edit" ? click : false}
                    onChange={(e) => {
                      handleChange(e);
                    }}
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
                      disabled={stat === "Edit" ? click : false}
                      name="name"
                      value={hotelFields.name}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <select
                    value={hotelFields.category}
                    disabled={stat === "Edit" ? click : false}
                    name="category"
                    onChange={(e) => {
                      handleChange(e);
                    }}
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
                      disabled={stat === "Edit" ? click : false}
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
                      <ul className="absolute z-10 bg-[#f9f9f9] h-[100px] overflow-y-auto w-full border rounded-b-lg p-1 border-black">
                        {matchArr.map((match, index) => (
                          <li
                            className="hover:bg-blue-200 cursor-pointer rounded-sm p-1 border-b"
                            key={index}
                            onClick={() => {
                              setDestinationVal(match.name);
                              setHotelFields({
                                ...hotelFields,
                                destination_id: match.id,
                              });
                              setShowPicker(false);
                            }}
                          >
                            {match.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className=" mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      disabled={stat === "Edit" ? click : false}
                      name="address"
                      value={hotelFields.address}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      label="Accommodation Address"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div className="mt-4">
                    <PhoneInput
                      international
                      value={hotelFields.contact_no}
                      disabled={stat === "Edit" ? click : false}
                      onChange={(e) => {
                        setHotelFields({ ...hotelFields, contact_no: e });
                      }}
                      placeholder="Accommodation Contact No"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>

                  <div className="mt-4 w-full h-fit">
                    <Textarea
                      placeholder="Accommodation Details"
                      disabled={stat === "Edit" ? click : false}
                      minRows={2}
                      maxRows={5}
                      name="details"
                      value={hotelFields.details}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      sx={{
                        width: "100%",
                        backgroundColor: "#fff",
                        borderColor: "#d3d3d3",
                        height: "100px",
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
                        disabled={stat === "Edit" ? click : false}
                        inputProps={{ multiple: true }}
                        onChange={(e) => handleFileSelect(e)}
                        style={{ display: "none" }}
                      />
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer" htmlFor="file-input">
                          <AddPhotoAlternateOutlinedIcon className="text-slate-500 hover:text-slate-950" />
                        </label>
                        <div className="hidden text-sm md:block overflow-x-auto">
                          {hotelImage === ""
                            ? `Select Hotel Image`
                            : "Selected  "}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setImgModal(true);
                      }}
                      className="border border-slate-300 text-xs rounded-md flex items-center justify-center w-[15%] underline cursor-pointer h-10"
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
                          format="DD-MM-YYYY"
                          label="Tarif Valid From"
                          disabled={stat === "Edit" ? click : false}
                          name="tarif_valid_from"
                          value={showFromDate}
                          onAccept={(e) => {
                            const fromDate = dayjs(e).format("YYYY-MM-DD");
                            setShowFromDate(e);
                            setHotelFields({
                              ...hotelFields,
                              tarif_valid_from: fromDate,
                            });
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="custom-date-picker w-[48%]">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                          format="DD-MM-YYYY"
                          disabled={stat === "Edit" ? click : false}
                          label="Tarif Valid To"
                          value={showToDate}
                          onAccept={(e) => {
                            const toDate = dayjs(e).format("YYYY-MM-DD");
                            setShowToDate(e);
                            setHotelFields({
                              ...hotelFields,
                              tarif_valid_to: toDate,
                            });
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      disabled={stat === "Edit" ? click : false}
                      label="Contact Person"
                      name="contact_person"
                      variant="outlined"
                      value={hotelFields.contact_person}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      sx={{ width: "100%" }}
                    />
                  </div>

                  <div className="mt-4">
                    <PhoneInput
                      disabled={stat === "Edit" ? click : false}
                      international
                      value={hotelFields.mob_no_1}
                      onChange={(e) => {
                        setHotelFields({ ...hotelFields, mob_no_1: e });
                      }}
                      placeholder="Mobile No *"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>
                  <div className="mt-4">
                    <PhoneInput
                      international
                      disabled={stat === "Edit" ? click : false}
                      value={hotelFields.mob_no_2}
                      onChange={(e) => {
                        setHotelFields({ ...hotelFields, mob_no_2: e });
                      }}
                      placeholder="Alternative No"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div className=" mt-4 w-[48%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        disabled={stat === "Edit" ? click : false}
                        label="Reservation Email ID"
                        name="reservation_email"
                        value={hotelFields.reservation_email}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className=" mt-4 w-[48%]">
                      <TextField
                        id="outlined-basic"
                        disabled={stat === "Edit" ? click : false}
                        size="small"
                        name="website_link"
                        value={hotelFields.website_link}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        label="Website Link"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <select
                    disabled={stat === "Edit" ? click : false}
                    value={hotelFields.status}
                    name="status"
                    onChange={(e) => handleChange(e)}
                    className="px-2 focus:outline-none mt-4 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md"
                  >
                    <option value="DEFAULT" disabled={true}>
                      Accommodation Status
                    </option>
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
                    onClick={
                      stat === "Edit"
                        ? click
                          ? () => {
                              setClick(false);
                            }
                          : handleUpdate
                        : handleSave
                    }
                    className={`w-full rounded-md h-full flex ${
                      stat === "Edit"
                        ? click
                          ? "hover:bg-blue-900"
                          : "hover:bg-green-900"
                        : "hover:bg-green-900"
                    } items-center justify-center text-white ${
                      stat === "Edit"
                        ? click
                          ? "bg-blue-600"
                          : "bg-green-600"
                        : "bg-green-600"
                    }`}
                  >
                    {stat === "Edit" ? (click ? "Edit" : "Update") : "Save"}
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
                      disabled={click}
                      label="Account Name"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      disabled={click}
                      label="Account No"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      disabled={click}
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
                      disabled={click}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="IFSCI Code"
                      disabled={click}
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
                      disabled={click}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      disabled={click}
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
                      disabled={click}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      disabled={click}
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
                      disabled={click}
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
                  <button className="hover:bg-red-900 w-full rounded-md  text-white bg-red-600 h-full flex items-center justify-center">
                    Cancel
                  </button>
                </div>

                <div className=" w-[49%] rounded-md h-10  ">
                  <button
                    onClick={() => {
                      setClick(false);
                    }}
                    className={`w-full rounded-md h-full flex ${
                      click
                        ? "hover:bg-blue-900 bg-blue-700"
                        : "hover:bg-green-900 bg-green-700"
                    }  items-center justify-center text-white `}
                  >
                    {click ? "Edit" : "Save"}
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
