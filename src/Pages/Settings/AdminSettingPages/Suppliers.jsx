import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import IosShareIcon from "@mui/icons-material/IosShare";
import "react-phone-number-input/style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TextField from "@mui/material/TextField";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Suppliers() {
  const [able, setAble] = useState(false);
  const [search, setSearch] = useState("");
  const [row, setRow] = useState();
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [gridApi, setGridApi] = useState(null);
  const [id, setId] = useState();

  const [stat, setStat] = useState("");

  const [fields, setFields] = useState({
    title: "DEFAULT",
    first_name: "",
    last_name: "",
    email: "",
    number: "",
    city: "",
    company: "",
    address: "",
    status: "1",
  });

  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    if (
      fields.status === "" ||
      fields.first_name === "" ||
      fields.title === "DEFAULT" ||
      fields.last_name === "" ||
      fields.company === "" ||
      fields.city === "" ||
      fields.address === "" ||
      fields.email === "" ||
      fields.number === ""
    ) {
      toast.error("Please Fill All the Fields Correctly");
      setAble(false);
    } else {
      if (stat == "Add") {
        setAble(true);
        axios
          .post(`${BASE_URL}api/v1/supplier`, fields)
          .then((response) => {
            if (response.data == "success") {
              setReload(!reload);
              toast.success("Supplier Added Successfully");
              setOpen(false);
              setAble(false);
            }
          })
          .catch((error) => {
            setAble(false);
            console.log(error);
          });
      }
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
          .delete(`${BASE_URL}api/v1/supplier/${id}`)
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

  const handleUpdate = () => {
    setAble(true);
    axios
      .put(`${BASE_URL}api/v1/supplier/${id}`, fields)
      .then((response) => {
        toast.success("Supplier Updated Successfully");
        setAble(false);
        setReload(!reload);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setAble(false);
      });
  };

  const [column, setColumn] = useState([
    {
      headerName: "#",
      field: "serialNumber",
      flex: 0.2,
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        return <div className="ml-[-8px]">{params.rowIndex + 1}</div>;
      },
    },
    {
      headerName: "Company",
      field: "company",
    },
    {
      headerName: "Name",
      valueGetter: (params) => {
        return `${params.data.title} ${params.data.first_name} ${params.data.last_name}`;
      },
    },
    {
      headerName: "Email",
      field: "email",
    },
    {
      headerName: "Mobile",
      field: "number",
    },
    {
      headerName: "Location",
      field: "city",
      flex: 0.8,
    },
    {
      headerName: "Status",
      field: "status",
      flex: 0.8,
      cellRenderer: (params) => {
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div
              className={`flex items-center justify-center w-14 ${
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
      flex: 1.35,
      field: "by",
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
      headerName: "Created At",
      field: "created_at",
      flex: 0.7,
      valueGetter: (params) => {
        return `${dayjs(params.data.created_at).format("DD-MM-YYYY")}`;
      },
    },
    {
      sortable: false,
      filter: false,
      flex: 0.2,
      cellRenderer: (params) => {
        return (
          <div
            onClick={() => {
              setOpen(true);
              setStat("Edit");
              setId(params.data.id);
              setFields({
                title: params.data.title,
                first_name: params.data.first_name,
                last_name: params.data.last_name,
                email: params.data.email,
                number: params.data.number,
                city: params.data.city,
                company: params.data.company,
                address: params.data.address,
                status: params.data.status,
              });
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
    cellStyle: { borderRight: "1px solid #d9d9db" },
    tooltipField: "name",
    flex: 1,
  };

  useEffect(() => {
    const getData = () => {
      axios.get(`${BASE_URL}api/v1/supplier`).then((response) => {
        setRow(response.data.reverse());
      });
    };

    getData();
  }, [reload]);

  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Suppliers </div>
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
                setFields({
                  title: "DEFAULT",
                  first_name: "",
                  last_name: "",
                  email: "",
                  number: "",
                  city: "",
                  company: "",
                  address: "",
                  status: "1",
                });
              }}
              className="border w-[100%] border-slate-300 h-full bg-[#1d3f5a] text-white text-xs rounded-md px-2 "
            >
              <span className="sm:block hidden">Add Supplier</span>
              <span className="sm:hidden block">
                <AddRoundedIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="h-[91.5%] w-full overflow-x-auto">
        <div className="ag-theme-quartz w-[1500px] h-full xl:w-full">
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
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div className="p-4 rounded-md absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[95%] md:w-[50%] h-fit">
              <div className="flex justify-between text-3xl items-center h-[10%] px-2">
                <div className="font-bold text-lg"> {stat} Supplier </div>
                <div className="cursor-pointer" onClick={handleClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="flex justify-between mt-4 h-[90%]">
                <div className="w-[49%] ">
                  <select
                    value={fields.title}
                    name="title"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="px-2 focus:outline-none w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md"
                  >
                    <option value="DEFAULT">Title</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>

                  <div className="flex flex-row items-center justify-between mt-4 w-full">
                    <div className="w-[49%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label="First Name"
                        name="first_name"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        value={fields.first_name}
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                    <div className="w-[49%]">
                      <TextField
                        id="outlined-basic"
                        size="small"
                        label="Last Name"
                        value={fields.last_name}
                        onChange={(e) => handleChange(e)}
                        name="last_name"
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <select
                    name="status"
                    value={fields.status}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="px-2 focus:outline-none mt-4 w-full border h-10 hover:border-black focus:border border-[#d8d8d8] rounded-md"
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      size="small"
                      label="Email"
                      name="email"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={fields.email}
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="w-[49%]">
                  <div className="">
                    <PhoneInput
                      defaultCountry="IN"
                      value={fields.number}
                      onChange={(e) => {
                        setFields({ ...fields, number: e });
                      }}
                      placeholder="Number"
                      className="border border-[#b9b9b9] rounded-sm p-2 hover:border-black h-10"
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      name="city"
                      value={fields.city}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      size="small"
                      label="City"
                      variant="outlined"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      name="company"
                      value={fields.company}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      size="small"
                      label="Company"
                      variant="outlined"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      size="small"
                      name="address"
                      value={fields.address}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      label="Address"
                      variant="outlined"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div
                  onClick={stat === "Edit" ? handleDelete : handleClose}
                  className=" w-[49%] rounded-md h-10"
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
        </div>
      </div>
    </div>
  );
}

export default Suppliers;
