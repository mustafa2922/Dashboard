import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import "./ProfitLossReport.css";

const data = [
  {
    id: "12EF34RC1",
    fname: "John",
    lname: "Doe",
    date: "25-03-2024",
    number: 123456789,
    email: "johndoe@gmail.com",
    city: "London",
    status: "Active",
    by: "TravBiz.com",
    rank: "Ms.",
    source: "website",
    pax: "1",
    cost: "200",
  },
  {
    id: "12EF34RC2",
    fname: "Jane",
    date: "25-03-2024",
    lname: "Smith",
    number: 987654321,
    email: "janesmith@example.com",
    city: "New York",
    status: "Active",
    by: "TravBiz.com",
    rank: "Prof.",
    source: "website",
    pax: "1",
    cost: "200",
  },
  {
    id: "12EF34RC3",
    fname: "Michael",
    lname: "Johnson",
    number: 456123789,
    email: "michaeljohnson@example.com",
    city: "Los Angeles",
    status: "Active",
    by: "TravBiz.com",
    date: "25-03-2024",
    rank: "Mrs.",
    source: "website",
    pax: "1",
    cost: "200",
  },
  {
    id: "12EF34RC4",
    fname: "Emily",
    lname: "Brown",
    date: "25-03-2024",
    number: 789456123,
    email: "emilybrown@example.com",
    city: "Chicago",
    status: "Active",
    by: "TravBiz.com",
    rank: "Dr.",
    source: "website",
    pax: "1",
    cost: "200",
  },
  {
    id: "12EF34RC5",
    fname: "David",
    lname: "Lee",
    number: 321654987,
    email: "davidlee@example.com",
    date: "25-03-2024",
    city: "San Francisco",
    status: "Active",
    by: "TravBiz.com",
    rank: "Mr.",
    source: "website",
    pax: "1",
    cost: "200",
  },
  {
    id: "12EF34RC6",
    date: "25-03-2024",
    fname: "Sarah",
    lname: "Johnson",
    number: 654789321,
    email: "sarahjohnson@example.com",
    city: "Miami",
    status: "Active",
    by: "TravBiz.com",
    rank: "Ms.",
    source: "website",
    pax: "1",
    cost: "200",
  },
  {
    id: "12EF34RC7",
    fname: "Matthew",
    date: "25-03-2024",
    lname: "Davis",
    number: 987654123,
    email: "matthewdavis@example.com",
    city: "Seattle",
    status: "Active",
    by: "TravBiz.com",
    rank: "Dr.",
    source: "website",
    pax: "1",
    cost: "200",
  },
  {
    id: "12EF34RC8",
    fname: "Olivia",
    lname: "Wilson",
    number: 741852963,
    date: "25-03-2024",
    email: "oliviawilson@example.com",
    city: "Dallas",
    status: "Active",
    by: "TravBiz.com",
    rank: "Ms.",
    source: "website",
    pax: "1",
    cost: "200",
  },
  {
    id: "12EF34RC9",
    date: "25-03-2024",
    fname: "William",
    lname: "Taylor",
    number: 369852147,
    email: "williamtaylor@example.com",
    city: "Houston",
    status: "Active",
    by: "TravBiz.com",
    rank: "Prof.",
    source: "website",
    pax: "1",
    cost: "200",
  },
];

const dateFilterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("-");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

function ProfitLossReport() {
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(data);
  const [gridApi, setGridApi] = useState(null);

  const [startDate, setStartDate] = useState("");

  const [column, setColumn] = useState([
    {
      headerName: "Query ID",
      width: 110,
      cellStyle: { display: "flex", alignItems: "center" },
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
      field: "date",
      cellRenderer: (params) => {
        return (
          <Link>
            <div className="cursor-pointer flex flex-col justify-center mt-2">
              <div className="text-sm text-black">{params.data.id}</div>
              <div className="text-xs text-slate-800">{params.data.date}</div>
            </div>
          </Link>
        );
      },
    },
    {
      headerName: "Client",
      cellStyle: { display: "flex", alignItems: "center" },
      width: 220,
      cellRenderer: (params) => {
        return (
          <div className="flex flex-col">
            <div className="text-black font-bold">
              {params.data.rank} {params.data.fname} {params.data.lname}
            </div>
            <div className="flex items-center gap-1  text-xs mt-[-10px]">
              <PhoneAndroidIcon style={{ fontSize: 12 }} /> {params.data.number}{" "}
            </div>
            <div className="flex items-center gap-1 text-xs mt-[-2px]">
              <MailOutlineIcon style={{ fontSize: 12 }} /> {params.data.email}{" "}
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Source",
      cellStyle: { display: "flex", alignItems: "center" },
      field: "source",
      width: 110,
    },
    {
      headerName: "Package",
      cellStyle: { display: "flex", alignItems: "center" },
      field: "source",
      width: 110,
    },
    {
      headerName: "Destination",
      field: "city",
      cellStyle: { display: "flex", alignItems: "center" },
      width: 150,
      cellRenderer: (params) => {
        return (
          <div className="flex justify-center items-center h-full w-full">
            <div className=" text-white bg-slate-900 rounded-md h-7 flex justify-center items-center w-24">
              {params.value}
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Pax",
      field: "pax",
      width: 80,
    },
    {
      headerName: "Buying",
      field: "cost",
      width: 100,
    },
    {
      headerName: "Selling",
      field: "cost",
      width: 100,
    },
    {
      headerName: "Profit",
      field: "cost",
      width: 120,
    },
    {
      headerName: "Assinged To",
      field: "by",
    },
  ]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setRow(data);
  };

  const FromRangeDateFilter = (startDate) => {
    console.log(`startDate : ${startDate}`);
    if (gridApi) {
      gridApi
        .setColumnFilterModel("date", {
          type: "greaterThan",
          dateFrom: startDate,
          dateTo: null,
        })
        .then(() => {
          gridApi.onFilterChanged();
        });
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
    width: 191,
    tooltipField: "name",
  };
  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-14 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Profit / Loss Report </div>
        <div className="flex justify-center  w-[100%] sm:w-[40%] items-center gap-3 h-full">
          <div className="custom-date-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                label="From Date"
                defaultValue={dayjs("2022-04-17")}
                onAccept={(date) => {
                  setStartDate(
                    dayjs(date).subtract(1, "day").format("YYYY-MM-DD")
                  );
                  FromRangeDateFilter(
                    dayjs(date).subtract(1, "day").format("YYYY-MM-DD")
                  );
                }}
              />
            </LocalizationProvider>
          </div>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              quickFilter();
            }}
            className="border border-slate-300 h-[80%] px-2 rounded-md text-sm w-[50%] focus:outline-none focus:border focus:border-black"
            placeholder="Search by anything...."
          />
        </div>
      </div>

      <div className="flex sm:flex-row flex-col justify-evenly px-2 py-1 items-center h-fit sm:h-[4.5rem]">
        <div className="sm:mt-0 mt-3 w-[95%] sm:w-[32%] h-[80%] flex flex-col justify-center items-center bg-[#655be6] rounded-md">
          <div className="text-white font-bold text-2xl">₹1,637,211</div>
          <div className="text-white font-bold text-[0.6rem]">TOTAL BUYING</div>
        </div>
        <div className="sm:mt-0 mt-3  w-[95%] sm:w-[32%] h-[80%] flex flex-col justify-center items-center bg-[#0cb5b5] rounded-md">
          <div className="text-white font-bold text-2xl">₹1,637,211</div>
          <div className="text-white font-bold text-[0.6rem]">TOTAL BUYING</div>
        </div>
        <div className="sm:mt-0 mt-3  w-[95%] sm:w-[32%] h-[80%] flex flex-col justify-center items-center bg-[#e45555] rounded-md">
          <div className="text-white font-bold text-2xl">₹1,637,211</div>
          <div className="text-white font-bold text-[0.6rem]">TOTAL BUYING</div>
        </div>
      </div>

      <div className="h-full w-full">
        <div
          className="ag-theme-quartz"
          style={{ height: "100%", width: "100%" }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={column}
            rowData={row}
            defaultColDef={defaultColDef}
            enableBrowserTooltips={true}
            pagination={true}
            rowHeight={70}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfitLossReport;
