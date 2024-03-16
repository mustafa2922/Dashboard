import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import "react-phone-number-input/style.css";

const data = [
  {
    id: "89KL12MN0",
    Clientfname: "Ethan",
    Clientlname: "Thompson",
    Hotelname: "The Plaza Hotel",
    mobile: 258369147,
    RoomType: "Penthouse Suite",
    email: "ethanthompson@gmail.com",
    city: "New York",
    status: "Active",
    FromDate: "05-04-2024",
    ToDate: "10-04-2024",
    StartTime: "6:30 PM",
    EndTime: "12:00 PM",
    Vehicle: "Private Car",
    Supplier: "The Plaza Hotel",
    BookingStatus: "Confirmed",
    PaymentStatus: "Amount Paid",
    InvoiceAmount: "80000",
    CancellationDate: "28-03-2024",
    DueDate: "05-04-2024",
    PaidAmount: "80000",
    PendingAmount: "0",
    AdditionalProfit: "16000",
    Remarks: "Celebrating Success",
    GST: "16800",
    by: "SuccessTravelers.com",
    rank: "Mr.",
  },
  {
    id: "12EF34RC1",
    Clientfname: "John",
    Clientlname: "Doe",
    Hotelname: "Burj Khalifa",
    mobile: 123456789,
    RoomType: "Deluxe Room",
    email: "johndoe@gmail.com",
    city: "London",
    status: "Active",
    FromDate: "07-03-2024",
    ToDate: "07-03-2024",
    StartTime: "2:00 PM",
    EndTime: "11:00 AM",
    Vehicle: "Bike",
    Supplier: "Abad Hotels",
    BookingStatus: "Confirmed",
    PaymentStatus: "Amount Paid",
    InvoiceAmount: "20000",
    CancellationDate: "08-03-2024",
    DueDate: "07-03-2024",
    PaidAmount: "15000",
    PendingAmount: "22996",
    AdditionalProfit: "4522",
    Remarks: "Satisfied!!",
    GST: "5290",
    by: "TravBiz.com",
    rank: "Ms.",
  },
  {
    id: "34GH56TR2",
    Clientfname: "Alice",
    Clientlname: "Smith",
    Hotelname: "Marina Bay Sands",
    mobile: 987654321,
    RoomType: "Suite",
    email: "alicesmith@gmail.com",
    city: "New York",
    status: "Pending",
    FromDate: "10-03-2024",
    ToDate: "15-03-2024",
    StartTime: "4:30 PM",
    EndTime: "10:00 AM",
    Vehicle: "Car",
    Supplier: "Hilton Hotels",
    BookingStatus: "Pending Approval",
    PaymentStatus: "Pending",
    InvoiceAmount: "35000",
    CancellationDate: "28-03-2024",
    DueDate: "10-03-2024",
    PaidAmount: "0",
    PendingAmount: "35000",
    AdditionalProfit: "7800",
    Remarks: "Need Special Accommodations",
    GST: "8050",
    by: "TravelSolutions.com",
    rank: "Mr.",
  },
  {
    id: "56IJ78KL3",
    Clientfname: "Emily",
    Clientlname: "Johnson",
    Hotelname: "Atlantis The Palm",
    mobile: 987123456,
    RoomType: "Ocean View Room",
    email: "emilyjohnson@gmail.com",
    city: "Los Angeles",
    status: "Active",
    FromDate: "12-03-2024",
    ToDate: "18-03-2024",
    StartTime: "6:00 PM",
    EndTime: "9:00 AM",
    Vehicle: "Limousine",
    Supplier: "Atlantis Resorts",
    BookingStatus: "Confirmed",
    PaymentStatus: "Amount Paid",
    InvoiceAmount: "45000",
    CancellationDate: "28-03-2024",
    DueDate: "12-03-2024",
    PaidAmount: "45000",
    PendingAmount: "0",
    AdditionalProfit: "9000",
    Remarks: "VIP Guest",
    GST: "9450",
    by: "VacationPlanners.com",
    rank: "Mrs.",
  },
  {
    id: "78MN90OP4",
    Clientfname: "Michael",
    Clientlname: "Williams",
    Hotelname: "The Ritz-Carlton",
    mobile: 741258963,
    RoomType: "Presidential Suite",
    email: "michaelwilliams@gmail.com",
    city: "Paris",
    status: "Pending",
    FromDate: "20-03-2024",
    ToDate: "22-03-2024",
    StartTime: "8:30 PM",
    EndTime: "12:00 PM",
    Vehicle: "Private Jet",
    Supplier: "Ritz-Carlton Hotels",
    BookingStatus: "Pending Confirmation",
    PaymentStatus: "Pending",
    InvoiceAmount: "75000",
    CancellationDate: "19-03-2024",
    DueDate: "20-03-2024",
    PaidAmount: "0",
    PendingAmount: "75000",
    AdditionalProfit: "12500",
    Remarks: "Special Anniversary Celebration",
    GST: "12900",
    by: "LuxuryTravelers.com",
    rank: "Mr.",
  },
  {
    id: "23CD45EF6",
    Clientfname: "Sophia",
    Clientlname: "Brown",
    Hotelname: "Four Seasons Hotel",
    mobile: 147258369,
    RoomType: "Grand Premier Room",
    email: "sophiabrown@gmail.com",
    city: "Tokyo",
    status: "Active",
    FromDate: "25-03-2024",
    ToDate: "28-03-2024",
    StartTime: "7:00 PM",
    EndTime: "10:00 AM",
    Vehicle: "Helicopter",
    Supplier: "Four Seasons Hotels",
    BookingStatus: "Confirmed",
    PaymentStatus: "Amount Paid",
    InvoiceAmount: "55000",
    CancellationDate: "28-03-2024",
    DueDate: "25-03-2024",
    PaidAmount: "55000",
    PendingAmount: "0",
    AdditionalProfit: "11000",
    Remarks: "Luxury Vacation",
    GST: "11550",
    by: "LuxuryTours.com",
    rank: "Ms.",
  },
  {
    id: "67EF89GH0",
    Clientfname: "Daniel",
    Clientlname: "Anderson",
    Hotelname: "Waldorf Astoria",
    mobile: 369852147,
    RoomType: "Royal Suite",
    email: "danielanderson@gmail.com",
    city: "Sydney",
    status: "Active",
    FromDate: "28-03-2024",
    ToDate: "03-04-2024",
    StartTime: "5:30 PM",
    EndTime: "11:30 AM",
    Vehicle: "Yacht",
    Supplier: "Waldorf Astoria Hotels",
    BookingStatus: "Confirmed",
    PaymentStatus: "Amount Paid",
    InvoiceAmount: "65000",
    CancellationDate: "28-03-2024",
    DueDate: "28-03-2024",
    PaidAmount: "65000",
    PendingAmount: "0",
    AdditionalProfit: "13000",
    Remarks: "Executive Retreat",
    GST: "13650",
    by: "ExecutiveTravels.com",
    rank: "Mr.",
  },
];

function LedgerReport() {
  const [row, setRow] = useState(data);
  const [gridApi, setGridApi] = useState(null);

  const [column, setColumn] = useState([
    {
      headerName: "Sr.",
      field: "serialNumber",
      width: 50,
      sortable: false,
      filter: false,
      cellRenderer: (params) => {
        return params.rowIndex + 1;
      },
    },
    {
      headerName: "Name",
      field: "Hotelname",
    },
    {
      headerName: "Room Type",
      field: "RoomType",
    },
    {
      headerName: "From Date",
      field: "FromDate",
    },
    {
      headerName: "To Date",
      field: "ToDate",
    },
    {
      headerName: "Start Time",
      field: "StartTime",
    },
    {
      headerName: "End Time	",
      field: "EndTime",
    },
    {
      headerName: "Vehicle",
      field: "Vehicle",
    },
    {
      headerName: "Supplier",
      field: "Supplier",
    },
    {
      headerName: "Booking Status",
      field: "BookingStatus",
    },
    {
      headerName: "Payment Status",
      field: "PaymentStatus",
    },
    {
      headerName: "Invoice Amount",
      field: "InvoiceAmount",
    },
    {
      headerName: "Cancellation Date",
      field: "CancellationDate",
    },
    {
      headerName: "Due Date	",
      field: "DueDate",
    },
    {
      headerName: "Paid Amount",
      field: "PaidAmount",
    },
    {
      headerName: "Pending Amount",
      field: "PendingAmount",
    },
    {
      headerName: "Additional Profit	",
      field: "AdditionalProfit",
    },
    {
      headerName: "GST",
      field: "GST",
    },
    {
      headerName: "Client Name",
      valueGetter: (params) => {
        return `${params.data.rank} ${params.data.fname} ${params.data.lname}`;
      },
    },
    {
      headerName: "Mobile",
      field: "mobile",
    },
    {
      headerName: "	Email",
      field: "email",
    },
    {
      headerName:'Remarks',
      field:'Remarks'
    },
  ]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setRow(data);
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    cellStyle: { borderRight: "1px solid #d9d9db" },
    width: 191,
    tooltipField: "name",
  };
  return (
    <div className="h-full">
      <div className="flex justify-between items-center h-16 sm:h-12 sm:flex-row flex-col px-2 border-t border-slate-300 border-b bg-[#eff3f7]">
        <div className="font-bold"> Ledger Report </div>
        <div className="flex justify-center items-center gap-3 h-full">
          <button
            onClick={() => {
              ExportData();
            }}
            className="px-2 bg-[#1d3f5a] text-white rounded-md flex items-center h-[80%]"
          >
            <IosShareIcon style={{ fontSize: "20" }} />
          </button>
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
          />
        </div>
      </div>
    </div>
  );
}

export default LedgerReport;
