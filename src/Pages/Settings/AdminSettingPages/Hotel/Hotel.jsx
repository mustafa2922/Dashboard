import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import "react-phone-number-input/style.css";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
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
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const MySwal = withReactContent(Swal);

const email = "jaffarSaleem@gmail.com";

let destinations = [];

function Hotel() {
  const [able, setAble] = useState(false);
  const [BankId, setBankId] = useState("");

  const [Editopen, setEditOpen] = useState(false);

  const [id, setId] = useState("");
  const [ShowTariffModal, setShowTariffModal] = useState(false);

  const [bankFirst, setBankFirst] = useState(true);

  const [hotelFields, setHotelFields] = useState({
    property_type: "DEFAULT",
    name: "",
    category: "DEFAULT",
    destination_id: "DEFAULT",
    address: "",
    contact_no: "",
    details: "",
    hotel_img: "",
    tarif_valid_from: dayjs().format("YYYY-MM-DD"),
    tarif_valid_to: dayjs().format("YYYY-MM-DD"),
    contact_person: "",
    mob_no_1: "",
    mob_no_2: "",
    reservation_email: "",
    website_link: "",
    status: "1",
  });

  const [bankFields, setBankFields] = useState({
    accomodation_id: "",
    account_name: "",
    account_no: "",
    bank_name: "",
    branch_name: "",
    ifsci_code: "",
    account_name_sec: "",
    account_no_sec: "",
    bank_name_sec: "",
    branch_name_sec: "",
    ifsci_code_sec: "",
  });

  const [search, setSearch] = useState("");
  const [row, setRow] = useState();
  const [open, setOpen] = useState(false);
  const [tarifOpen, setTarifOpen] = useState(false);
  const [hotelName, sethotelName] = useState("");
  const [bankOpen, setBankOpen] = useState(false);
  const [imgModal, setImgModal] = useState(false);

  const [reload, setReload] = useState(false);
  const [click, setClick] = useState(true);

  const [column, setColumn] = useState([
    {
      headerName: "#",
      field: "serialNumber",
      sortable: false,
      flex: 0.25,
      filter: false,
      cellRenderer: (params) => {
        return <div className="ml-[-10px]">{params.rowIndex + 1}</div>;
      },
    },
    {
      headerName: "Name",
      field: "name",
      flex: 2.1,
      cellStyle: { display: "flex", alignItems: "center" },
      cellRenderer: (params) => {
        return (
          <div className="flex items-center w-full gap-4">
            <div className=" w-24 h-full">
              <div className="group w-full rounded-lg overflow-hidden !h-20  relative">
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
                  src={params.data.hotel_img_url}
                />
                {/* <Blurhash  className="w-full h-full object-contain" hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" /> */}
              </div>
            </div>
            <div className="h-full font-bold leading-4 w-[40%] text-[0.95rem] whitespace-pre-wrap flex items-center ">
              {" "}
              {params.value}{" "}
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Type",
      field: "property_type",
      flex: 0.8,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-start gap-2 w-full h-full">
            <div className="-ml-2">{params.value}</div>
          </div>
        );
      },
    },
    {
      headerName: "Category",
      field: "category",
      flex: 1.05,
      cellStyle: { display: "flex", alignItems: "center" },
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
      filter: false,
      cellStyle: { display: "flex", alignItems: "center" },
      field: "destination.name",
      flex: 0.95,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-start gap-2 w-full h-full">
            <div className="-ml-2">{params.value}</div>
          </div>
        );
      },
    },
    {
      headerName: "Tarif",
      sortable: false,
      filter: false,
      cellStyle: { display: "flex", alignItems: "center" },
      flex: 0.55,
      cellRenderer: (params) => {
        return (
          <div
            onClick={() => {
              setTarifOpen(true);
              sethotelName(params.data.name);
              setId(params.data.id);
              setShowTariffModal(true);
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
      filter: false,
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
      flex: 1.2,
    },
    {
      headerName: "Tarif Valid To",
      field: "tarif_valid_to",
      filter: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params) => {
        const formattedDate = dayjs(params.value).format("DD-MM-YYYY");
        return (
          <div
            className={`flex items-center justify-center w-32 h-6 text-white font-bold rounded-md ${
              dayjs(params.value, "YYYY-MM-DD").isBefore(dayjs(), "day")
                ? "bg-red-600"
                : "bg-green-600"
            } `}
          >
            {formattedDate}
          </div>
        );
      },
      flex: 1,
    },
    {
      headerName: "Bank Details",
      field: "bank",
      sortable: false,
      filter: false,
      valueFormatter: Object,
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
              params.value ? setBankFirst(false) : setBankFirst(true);
              setBankId(params.value ? params.value.id : "");
              params.value
                ? setBankFields({
                    accomodation_id: params.data.id,
                    account_name: params.value.account_name,
                    account_no: params.value.account_no,
                    bank_name: params.value.bank_name,
                    branch_name: params.value.branch_name,
                    ifsci_code: params.value.ifsci_code,
                    account_name_sec: params.value.account_name_sec,
                    account_no_sec: params.value.account_no_sec,
                    bank_name_sec: params.value.bank_name_sec,
                    branch_name_sec: params.value.branch_name_sec,
                    ifsci_code_sec: params.value.ifsci_code_sec,
                  })
                : setBankFields({
                    accomodation_id: params.data.id,
                    account_name: "",
                    account_no: "",
                    bank_name: "",
                    branch_name: "",
                    ifsci_code: "",
                    account_name_sec: "",
                    account_no_sec: "",
                    bank_name_sec: "",
                    branch_name_sec: "",
                    ifsci_code_sec: "",
                  });
            }}
            className="underline cursor-pointer font-bold"
          >
            View
          </div>
        );
      },
      flex: 0.9,
    },
    {
      headerName: "Status",
      field: "status",
      filter:false,
      flex: 0.7,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div
              className={`flex items-center justify-center !h-6  w-14 px-8 ${
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
      cellStyle: { marginTop: "24px", border: "none" },
      flex: 0.85,
      valueGetter: () => {
        return email;
      },
    },
    {
      headerName: "Updated On",
      filter: false,
      flex: 0.87,
      field: "updated_at",
      cellStyle: {
        display: "flex",
        alignItems: "center",
        borderLeft: "1px solid #d9d9db",
      },
      cellRenderer: (params) => {
        const formattedDate = dayjs(params.value).format("DD-MM-YYYY");
        return <div className="-ml-2">{formattedDate}</div>;
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
              setHotelFields({
                property_type: params.data.property_type,
                name: params.data.name,
                category: params.data.category,
                destination_id: params.data.destination_id,
                address: params.data.address,
                contact_no: params.data.contact_no,
                details: params.data.details,
                hotel_img: "",
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

  const [showFromDate, setShowFromDate] = useState(dayjs());
  const [showToDate, setShowToDate] = useState(dayjs());

  const [errors, setErrors] = useState({ name: null, helperTxt: null });

  const ValidateFields = (MODE) => {
    // === Accommodation ===

    if (MODE === "Accommodation") {
      // property Type
      if (hotelFields.property_type === "DEFAULT") {
        return setErrors({
          name: "property_type",
          helperTxt: "Please Select Property Type",
        });
      }
      // hotel name
      if (
        hotelFields.name.trim() === "" ||
        hotelFields.name.split(" ").length < 2
      ) {
        return setErrors({
          name: "name",
          helperTxt: "Name Must Contain 2 Words",
        });
      }
      // category
      if (hotelFields.category === "DEFAULT") {
        return setErrors({
          name: "category",
          helperTxt: "Please Select Category",
        });
      }
      // destination
      if (hotelFields.destination_id === "DEFAULT") {
        return setErrors({
          name: "destination_id",
          helperTxt: "Please Select Destination",
        });
      }
      // address
      if (hotelFields.address.trim() === "") {
        return setErrors({
          name: "address",
          helperTxt: "Address Cannot Be Empty",
        });
      }
      // contact no
      if (hotelFields.contact_no.length !== 13) {
        return setErrors({
          name: "contact_no",
          helperTxt: "Number Must Contain 10 Digits",
        });
      }
      // contact person
      if (hotelFields.contact_person.trim() === "") {
        return setErrors({
          name: "contact_person",
          helperTxt: "Contact Person Cannot Be Empty",
        });
      }
      // mobile no
      if (hotelFields.mob_no_1.length !== 13) {
        return setErrors({
          name: "mob_no_1",
          helperTxt: "Number Must Contain 10 Digits",
        });
      }
      // alternative no
      if (hotelFields.mob_no_2.length !== 13) {
        return setErrors({
          name: "mob_no_2",
          helperTxt: "Number Must Contain 10 Digits",
        });
      }
      // reservation email id
      if (hotelFields.reservation_email.trim() === "") {
        return setErrors({
          name: "reservation_email",
          helperTxt: "Reservation Email Id Cannot Be Empty",
        });
      }
      // website link
      if (hotelFields.website_link.trim() === "") {
        return setErrors({
          name: "website_link",
          helperTxt: "Website Link Cannot Be Empty",
        });
      }
    }

    // === Bank ===

    if (MODE === "Bank") {
      if (bankFields.account_name.trim() === "") {
        return setErrors({
          name: "account_name",
          helperTxt: "Account Name Cannot Be Empty",
        });
      }
      if (bankFields.account_no.length !== 16) {
        return setErrors({
          name: "account_no",
          helperTxt: "Account No Must Contain 16 Digits",
        });
      }
      if (bankFields.bank_name.trim() === "") {
        return setErrors({
          name: "bank_name",
          helperTxt: "Bank Name Cannot Be Empty",
        });
      }
      if (bankFields.branch_name.trim() === "") {
        return setErrors({
          name: "branch_name",
          helperTxt: "Branch Name Cannot Be Empty",
        });
      }
      if (bankFields.ifsci_code.length !== 11) {
        return setErrors({
          name: "ifsci_code",
          helperTxt: "IFSCI Code Must Contain 11 Characters",
        });
      }
      if (bankFields.account_name_sec.trim() === "") {
        return setErrors({
          name: "account_name_sec",
          helperTxt: "Account Name Cannot Be Empty",
        });
      }
      if (bankFields.account_no_sec.length !== 16) {
        return setErrors({
          name: "account_no_sec",
          helperTxt: "Account No Must Contain 16 Digits",
        });
      }
      if (bankFields.bank_name_sec.trim() === "") {
        return setErrors({
          name: "bank_name_sec",
          helperTxt: "Bank Name Cannot Be Empty",
        });
      }
      if (bankFields.branch_name_sec.trim() === "") {
        return setErrors({
          name: "branch_name_sec",
          helperTxt: "Branch Name Cannot Be Empty",
        });
      }
      if (bankFields.ifsci_code_sec.length !== 11) {
        return setErrors({
          name: "ifsci_code_sec",
          helperTxt: "IFSCI Code Must Contain 11 Characters",
        });
      }
    }

    return true;
  };

  const handleClose = (name) => {
    if (name === "modal") {
      setClick(true);
      setErrors({ name: null, helperTxt: null });
      setOpen(false);
    } else if (name === "tarif") {
      setTarifOpen(false);
      setShowTariffModal(false);
    } else if (name === "bank") {
      setErrors({ name: null, helperTxt: null });
      setBankOpen(false);
      setClick(true);
    } else if (name === "media") {
      setEditOpen(false);
    }
  };

  // function to delete accommodation

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
          .delete(`${BASE_URL}api/v1/accomodation/${id}`)
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

  // function to update accommodation

  const handleUpdate = () => {
    setAble(true);
    delete hotelFields.hotel_img;
    // const validate = ValidateFields("Accommodation");
    if (
      // validate
      true // bank details removed by admin
    ) {
      axios
        .put(`${BASE_URL}api/v1/accomodation/${id}`, hotelFields)
        .then((response) => {
          toast.success("Accomodation Updated Successfully");
          setReload(!reload);
          setAble(false);
          setClick(true);
          handleClose("modal");
        })
        .catch((err) => {
          err.response.data.message.includes("accomodations_name_unique")
            ? toast.error("Accomodation Name must be unique")
            : "";
          setAble(false);
        });
    } else {
      setAble(false);
    }
  };

  const [gridApi, setGridApi] = useState(null);

  const [hotelImage, setHotelImage] = useState("");

  const [stat, setStat] = useState("");

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleChange = (event) => {
    setErrors({ name: null, helperTxt: null });
    return setHotelFields({
      ...hotelFields,
      [event.target.name]: event.target.value,
    });
  };

  const handlebankChange = (event) => {
    setErrors({ name: null, helperTxt: null });
    return setBankFields({
      ...bankFields,
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
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setHotelImage(reader.result);
        setHotelFields({ ...hotelFields, hotel_img: file });
      };
      reader.readAsDataURL(file);
    } else {
      setHotelImage("");
    }
  };

  const handleBankDelete = () => {
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
          .delete(`${BASE_URL}api/v1/accomodation-bank/${BankId}`)
          .then((response) => {
            setBankOpen(false);
            Swal.fire({
              title: "Deleted!",
              text: "Your Item has been deleted.",
              icon: "success",
              customClass: {
                container: "custom-swal-container",
              },
            });
            setReload(!reload);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      }
    });
  };

  const payload = new FormData();

  const handleSave = () => {
    setAble(true);
    const validate = ValidateFields("Accommodation");

    if (validate) {
      for (var key in hotelFields) {
        if (hotelFields.hasOwnProperty(key)) {
          if (hotelFields[key] instanceof File) {
            payload.append(key, hotelFields[key]);
          } else {
            payload.append(key, hotelFields[key]);
          }
        }
      }

      axios
        .post(`${BASE_URL}api/v1/accomodation`, payload)
        .then((res) => {
          setAble(false);
          toast.success("Accomodation Added Successfully");
          setReload(!reload);
          handleClose("modal");
        })
        .catch((err) => {
          setAble(false);
          console.log(err.response.data);
          err.response.data == "name must be unique"
            ? toast.error("Accommodation name must be unique")
            : "";
        });
    } else {
      setAble(false);
    }
  };

  const handlebankSave = () => {
    setAble(true);

    // const validate = ValidateFields("Bank");

    if (
      // validate
      true // bank details removed by admin
    ) {
      axios
        .post(`${BASE_URL}api/v1/accomodation-bank`, bankFields)
        .then((res) => {
          setAble(false);
          toast.success("Bank Details Added Successfully");
          setReload(!reload);
          handleClose("bank");
        })
        .catch((err) => {
          setAble(false);
          console.log(err);
        });
    } else {
      setAble(false);
    }
  };

  const handleBankUpdate = () => {
    setAble(true);
    axios
      .put(`${BASE_URL}api/v1/accomodation-bank/${BankId}`, bankFields)
      .then((response) => {
        toast.success("Bank Updated Successfully");
        setReload(!reload);
        setAble(false);
        setClick(true);
        handleClose("bank");
      })
      .catch((err) => {
        console.log(err.response.data);
        setAble(false);
      });
  };

  useEffect(() => {
    const getData = () => {
      axios.get(`${BASE_URL}api/v1/accomodation`).then((response) => {
        setRow(response.data.reverse());
      });
    };

    const getDestinations = () => {
      axios.get(`${BASE_URL}api/v1/destination`).then((response) => {
        destinations = response.data;
      });
    };

    getData();
    getDestinations();
  }, [reload]);

  return (
    <div className="h-[99%]">
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
                setShowFromDate(dayjs());
                setShowToDate(dayjs());
                setHotelFields({
                  property_type: "DEFAULT",
                  name: "",
                  category: "DEFAULT",
                  destination_id: "DEFAULT",
                  address: "",
                  contact_no: "",
                  details: "",
                  hotel_img: "",
                  tarif_valid_from: dayjs().format("YYYY-MM-DD"),
                  tarif_valid_to: dayjs().format("YYYY-MM-DD"),
                  contact_person: "",
                  mob_no_1: "",
                  mob_no_2: "",
                  reservation_email: "",
                  website_link: "",
                  status: "1",
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
            rowHeight={90}
          />

          <Modal
            keepMounted
            open={open}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-3 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[90%] lg:w-[48%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Accommodation </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleClose("modal");
                  }}
                >
                  <CloseIcon />
                </div>
              </div>
              <div className="flex justify-between w-full mt-2 h-[90%]">
                <div className="flex flex-col w-[48%]">
                  {/* Pre-defined */}
                  <select
                    value={hotelFields.property_type}
                    name="property_type"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className={`px-2 focus:outline-none w-full border h-10  focus:border  ${
                      errors.name === "property_type"
                        ? "border-red-600"
                        : "hover:border-black border-[#d8d8d8]"
                    }  rounded-md`}
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
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "property_type" && errors.helperTxt}
                  </p>
                  <div className="mt-3 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Name"
                      error={errors.name === "name"}
                      autoComplete="off"
                      name="name"
                      value={hotelFields.name}
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
                  <select
                    value={hotelFields.category}
                    name="category"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className={`px-2 focus:outline-none w-full border h-10 mt-2 focus:border  ${
                      errors.name === "category"
                        ? "border-red-600"
                        : "hover:border-black border-[#d8d8d8]"
                    }  rounded-md`}
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
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "category" && errors.helperTxt}
                  </p>
                  <div className="relative mt-2 w-full">
                    <select
                      id="outlined-basic"
                      className={`px-2 focus:outline-none w-full border h-10  focus:border  ${
                        errors.name === "destination_id"
                          ? "border-red-600"
                          : "hover:border-black border-[#d8d8d8]"
                      }  rounded-md`}
                      size="small"
                      label="Destination"
                      variant="outlined"
                      name="destination_id"
                      sx={{ width: "100%" }}
                      value={hotelFields.destination_id}
                      onChange={handleChange}
                    >
                      <option disabled={true} value={"DEFAULT"}>
                        Destination
                      </option>
                      {destinations.map((item, index) => {
                        return (
                          item.status == "1" && (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          )
                        );
                      })}
                    </select>
                    <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                      {errors.name === "destination_id" && errors.helperTxt}
                    </p>
                  </div>
                  <div className=" mt-2 w-full">
                    <textarea
                      placeholder="Address"
                      name="address"
                      autoComplete="off"
                      className="border border-slate-400 !h-14 rounded-sm p-1 focus:outline-none active:outline-none resize-none w-full"
                      value={hotelFields.address}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                      {errors.name === "address" && errors.helperTxt}
                    </p>
                  </div>
                  <div className="mt-2">
                    <PhoneInput
                      defaultCountry="IN"
                      autoComplete=""
                      value={hotelFields.contact_no}
                      onChange={(e) => {
                        setErrors({ name: null, helperTxt: null });
                        setHotelFields({ ...hotelFields, contact_no: e });
                      }}
                      onKeyDown={(e) => {
                        if (
                          hotelFields.contact_no &&
                          hotelFields.contact_no.length >= 13 &&
                          e.key !== "Backspace"
                        ) {
                          e.preventDefault();
                        }
                      }}
                      placeholder="Contact No"
                      className={`border ${
                        errors.name === "contact_no"
                          ? "border-red-600"
                          : "hover:border-black border-[#b9b9b9]"
                      }  rounded-sm p-2 h-10`}
                    />
                    <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                      {errors.name === "contact_no" && errors.helperTxt}
                    </p>
                  </div>
                  <div className="mt-3 w-full h-fit">
                    <textarea
                      placeholder="Details"
                      className="border border-slate-400 !h-20 rounded-sm p-1 focus:outline-none active:outline-none resize-none w-full"
                      autoComplete="off"
                      name="details"
                      value={hotelFields.details}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-[48%]">
                  {stat === "Edit" ? (
                    ""
                  ) : (
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
                          <label
                            className="cursor-pointer"
                            htmlFor="file-input"
                          >
                            <AddPhotoAlternateOutlinedIcon className="text-slate-500 hover:text-slate-950" />
                          </label>
                          <div className="hidden text-sm md:block overflow-x-auto">
                            {hotelImage === "" ? "Select Hotel" : "Selected  "}
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
                  )}

                  <div
                    className={`flex ${
                      stat === "Edit" ? "mt-0" : "mt-5"
                    } items-center w-full justify-between`}
                  >
                    <div className="custom-date-picker w-[48%]">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                          format="DD-MM-YYYY"
                          label="Tarif Valid From"
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
                      autoComplete="off"
                      error={errors.name === "contact_person"}
                      label="Contact Person"
                      name="contact_person"
                      variant="outlined"
                      value={hotelFields.contact_person}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      sx={{ width: "100%" }}
                    />
                    <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                      {errors.name === "contact_person" && errors.helperTxt}
                    </p>
                  </div>

                  <div className="mt-2">
                    <PhoneInput
                      defaultCountry="IN"
                      value={hotelFields.mob_no_1}
                      autoComplete="off"
                      onChange={(e) => {
                        setErrors({ name: null, helperTxt: null });
                        setHotelFields({ ...hotelFields, mob_no_1: e });
                      }}
                      onKeyDown={(e) => {
                        if (
                          hotelFields.mob_no_1 &&
                          hotelFields.mob_no_1.length >= 13 &&
                          e.key !== "Backspace"
                        ) {
                          e.preventDefault();
                        }
                      }}
                      placeholder="Mobile No *"
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
                  <div className="mt-2">
                    <PhoneInput
                      defaultCountry="IN"
                      value={hotelFields.mob_no_2}
                      autoComplete="off"
                      onChange={(e) => {
                        setErrors({ name: null, helperTxt: null });
                        setHotelFields({ ...hotelFields, mob_no_2: e });
                      }}
                      onKeyDown={(e) => {
                        if (
                          hotelFields.mob_no_2 &&
                          hotelFields.mob_no_2.length >= 13 &&
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
                  <div className="w-full mt-2">
                    <TextField
                      id="outlined-basic"
                      error={errors.name === "reservation_email"}
                      size="small"
                      label="Reservation Email ID"
                      autoComplete="off"
                      name="reservation_email"
                      value={hotelFields.reservation_email}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "reservation_email" && errors.helperTxt}
                  </p>
                  <div className="w-full mt-2">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      error={errors.name === "website_link"}
                      name="website_link"
                      autoComplete="off"
                      value={hotelFields.website_link}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      label="Website Link"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "website_link" && errors.helperTxt}
                  </p>
                  <select
                    value={hotelFields.status}
                    name="status"
                    onChange={(e) => handleChange(e)}
                    className="px-2 focus:outline-none mt-3 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center">
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

          {ShowTariffModal && (
            <Modal
              keepMounted
              open={tarifOpen}
              onClose={() => {
                handleClose("tarif");
              }}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[80%] md:w-[90%] h-fit">
                <div className="h-full overflow-x-auto">
                  <HotelPrice
                    name={hotelName}
                    MainSetOpen={handleClose}
                    hotelId={id}
                  />
                </div>
              </div>
            </Modal>
          )}

          <Modal
            keepMounted
            open={bankOpen}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[50%] h-fit">
              <div className="flex justify-between text-3xl items-center px-1">
                <div className="font-bold text-lg">
                  {" "}
                  {hotelName} - Bank Details
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
                      error={errors.name === "account_name"}
                      disabled={bankFirst ? false : click}
                      label="Account Name"
                      autoComplete="off"
                      variant="outlined"
                      name="account_name"
                      value={
                        bankFields.account_name ? bankFields.account_name : ""
                      }
                      onChange={handlebankChange}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "account_name" && errors.helperTxt}
                  </p>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      autoComplete="off"
                      disabled={bankFirst ? false : click}
                      label="Account No"
                      error={errors.name === "account_no"}
                      variant="outlined"
                      name="account_no"
                      value={bankFields.account_no ? bankFields.account_no : ""}
                      type="number"
                      onChange={handlebankChange}
                      // Not needed
                      // onKeyDown={(e) => {
                      //   if (
                      //     bankFields.account_no &&
                      //     bankFields.account_no.length >= 16 &&
                      //     e.key !== "Backspace"
                      //   ) {
                      //     e.preventDefault();
                      //   }
                      // }}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "account_no" && errors.helperTxt}
                  </p>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      autoComplete="off"
                      disabled={bankFirst ? false : click}
                      label="Bank Name"
                      variant="outlined"
                      error={errors.name === "bank_name"}
                      name="bank_name"
                      value={bankFields.bank_name ? bankFields.bank_name : ""}
                      onChange={handlebankChange}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "bank_name" && errors.helperTxt}
                  </p>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="Branch Name"
                      disabled={bankFirst ? false : click}
                      variant="outlined"
                      autoComplete="off"
                      name="branch_name"
                      error={errors.name === "branch_name"}
                      value={
                        bankFields.branch_name ? bankFields.branch_name : ""
                      }
                      onChange={handlebankChange}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "branch_name" && errors.helperTxt}
                  </p>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="IFSCI Code"
                      disabled={bankFirst ? false : click}
                      variant="outlined"
                      autoComplete="off"
                      name="ifsci_code"
                      value={bankFields.ifsci_code ? bankFields.ifsci_code : ""}
                      error={errors.name === "ifsci_code"}
                      onChange={handlebankChange}
                      // Not needed
                      // onKeyDown={(e) => {
                      //   if (
                      //     bankFields.ifsci_code &&
                      //     bankFields.ifsci_code.length >= 11 &&
                      //     e.key !== "Backspace"
                      //   ) {
                      //     e.preventDefault();
                      //   }
                      // }}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "ifsci_code" && errors.helperTxt}
                  </p>
                </div>
                <div className="flex flex-col w-[49%]">
                  <div className="font-bold   text-black ">Bank 2</div>
                  <div className="mt-2 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      autoComplete="off"
                      error={errors.name === "account_name_sec"}
                      label="Account Name"
                      disabled={bankFirst ? false : click}
                      variant="outlined"
                      name="account_name_sec"
                      value={
                        bankFields.account_name_sec
                          ? bankFields.account_name_sec
                          : ""
                      }
                      onChange={handlebankChange}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "account_name_sec" && errors.helperTxt}
                  </p>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      error={errors.name === "account_no_sec"}
                      size="small"
                      disabled={bankFirst ? false : click}
                      label="Account No"
                      autoComplete="off"
                      variant="outlined"
                      name="account_no_sec"
                      type="number"
                      value={
                        bankFields.account_no_sec
                          ? bankFields.account_no_sec
                          : ""
                      }
                      onChange={handlebankChange}
                      // Not needed
                      // onKeyDown={(e) => {
                      //   if (
                      //     bankFields.account_no_sec &&
                      //     bankFields.account_no_sec.length >= 16 &&
                      //     e.key !== "Backspace"
                      //   ) {
                      //     e.preventDefault();
                      //   }
                      // }}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "account_no_sec" && errors.helperTxt}
                  </p>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      autoComplete="off"
                      label="Bank Name"
                      disabled={bankFirst ? false : click}
                      variant="outlined"
                      name="bank_name_sec"
                      error={errors.name === "bank_name_sec"}
                      value={
                        bankFields.bank_name_sec ? bankFields.bank_name_sec : ""
                      }
                      onChange={handlebankChange}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "bank_name_sec" && errors.helperTxt}
                  </p>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      disabled={bankFirst ? false : click}
                      label="Branch Name"
                      autoComplete="off"
                      variant="outlined"
                      error={errors.name === "branch_name_sec"}
                      name="branch_name_sec"
                      value={
                        bankFields.branch_name_sec
                          ? bankFields.branch_name_sec
                          : ""
                      }
                      onChange={handlebankChange}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "branch_name_sec" && errors.helperTxt}
                  </p>
                  <div className="mt-4 w-full">
                    <TextField
                      id="outlined-basic"
                      size="small"
                      error={errors.name === "ifsci_code_sec"}
                      label="IFSCI Code"
                      disabled={bankFirst ? false : click}
                      variant="outlined"
                      autoComplete="off"
                      name="ifsci_code_sec"
                      value={
                        bankFields.ifsci_code_sec
                          ? bankFields.ifsci_code_sec
                          : ""
                      }
                      onChange={handlebankChange}
                      // Not needed
                      // onKeyDown={(e) => {
                      //   if (
                      //     bankFields.ifsci_code_sec &&
                      //     bankFields.ifsci_code_sec.length >= 11 &&
                      //     e.key !== "Backspace"
                      //   ) {
                      //     e.preventDefault();
                      //   }
                      // }}
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <p className="text-[0.6rem] text-red-600 h-2 flex items-start">
                    {errors.name === "ifsci_code_sec" && errors.helperTxt}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div
                  onClick={() => {
                    bankFirst ? handleClose("bank") : handleBankDelete();
                  }}
                  className=" w-[49%] rounded-md h-10"
                >
                  <button className="hover:bg-red-900 w-full rounded-md  text-white bg-red-600 h-full flex items-center justify-center">
                    {bankFirst ? "Cancel" : "Delete"}
                  </button>
                </div>

                <div className=" w-[49%] rounded-md h-10  ">
                  <button
                    onClick={() => {
                      setClick(false);
                      bankFirst
                        ? handlebankSave()
                        : click
                        ? ""
                        : handleBankUpdate();
                    }}
                    className={`w-full rounded-md h-full flex ${
                      bankFirst
                        ? "hover:bg-green-900 bg-green-700"
                        : click
                        ? "hover:bg-blue-900 bg-blue-700"
                        : "hover:bg-green-900 bg-green-700"
                    }  items-center justify-center text-white `}
                  >
                    {able
                      ? "Processing..."
                      : bankFirst
                      ? "Save"
                      : click
                      ? "Edit"
                      : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            keepMounted
            open={Editopen}
            onClose={() => {
              handleClose("media");
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
                    handleClose("media");
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

export default Hotel;
