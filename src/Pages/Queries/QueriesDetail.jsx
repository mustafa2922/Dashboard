import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockIcon from "@mui/icons-material/Lock";
import Textarea from "@mui/joy/Textarea";
import AddIcon from "@mui/icons-material/Add";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PersonIcon from "@mui/icons-material/Person";
import TextsmsIcon from "@mui/icons-material/Textsms";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ArticleIcon from "@mui/icons-material/Article";
import "./queryDetail.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Details from "./pages/Details";
import Billing from "./pages/Billing";
import FollowUps from "./pages/FollowUps";
import GuestDocuments from "./pages/GuestDocuments";
import Mail from "./pages/Mail";
import Voucher from "./pages/Voucher";
import SupplierCommunication from "./pages/SupplierCommunication";
import History from "./pages/History";
import PostSalesSuppliers from "./pages/PostSalesSuppliers";
import Proposals from "./pages/Proposals";
import FeedBack from "./pages/FeedBack";

function QueriesDetail() {
  const querypage = [
    {
      icon: <RecentActorsOutlinedIcon style={{ fontSize: 18 }} />,
      name: "Query Details    ",
      link: "detail",
    },
    {
      icon: <ArticleIcon style={{ fontSize: 18 }} />,
      name: "Proposal",
      link: "proposals",
    },
    {
      icon: <EmailOutlinedIcon style={{ fontSize: 18 }} />,
      name: "Mails",
      link: "mail",
    },
    {
      icon: <AssignmentTurnedInOutlinedIcon style={{ fontSize: 18 }} />,
      name: "Followup's",
      link: "followUps",
    },
    {
      icon: <Diversity3OutlinedIcon style={{ fontSize: 18 }} />,
      name: "Suppliers Communication",
      link: "supplierCommunication",
    },
    {
      icon: <CreditCardOutlinedIcon style={{ fontSize: 18 }} />,
      name: "Post Sales Suppliers",
      link: "postSalesSuppliers",
    },
    {
      icon: <TaskAltOutlinedIcon style={{ fontSize: 18 }} />,
      name: "Voucher",
      link: "voucher",
    },
    {
      icon: <ArticleOutlinedIcon style={{ fontSize: 18 }} />,
      name: "Billing",
      link: "billing",
    },
    {
      icon: <PersonIcon style={{ fontSize: 18 }} />,
      name: "Guest Document",
      link: "guestDocs",
    },
    {
      icon: <TextsmsIcon style={{ fontSize: 18 }} />,
      name: "Feedback",
      link: "feedBack",
    },
    {
      icon: <ScheduleIcon style={{ fontSize: 18 }} />,
      name: "History",
      link: "history",
    },
  ];

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between border-y bg-[#f5f7f9] border-slate-300 px-4">
        <div className="flex flex-row px-1 items-center">
          <div className="font-[500]"> Query ID 12345 </div>
        </div>
        <div className="flex py-2 justify-evenly">
          <button className="text-xs mx-1 border px-4 py-2 hover:drop-shadow-md rounded-md flex items-center gap-1">
            <WhatsAppIcon style={{ fontSize: 18 }} className="text-green-600" />{" "}
            WhatsApp
          </button>
          <button className="text-xs mx-1 border px-4 py-2 hover:drop-shadow-md rounded-md flex items-center gap-1">
            <EmailOutlinedIcon style={{ fontSize: 18 }} /> Email
          </button>
          <button className="text-xs mx-1 border px-4 py-2 hover:drop-shadow-md rounded-md flex items-center gap-1">
            <EventAvailableOutlinedIcon style={{ fontSize: 18 }} /> Task
          </button>
          <button className="text-xs mx-1 border px-4 py-2 hover:drop-shadow-md rounded-md flex items-center gap-1">
            <EditOutlinedIcon style={{ fontSize: 18 }} /> Edit
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-start h-fit items-start mt-2 m-auto border border-slate-200 rounded-lg w-[99%]">
        <div className="border w-full rounded-t-lg py-1 bg-[#f5f7f9]">
          <div className="text-xs px-3 ">
            Created: 19-04-2024 | Last Updated: 19/04/2024 - 10:39 PM
          </div>
          <div className="items--container">
            <div className="item hover:!cursor-pointer group">
              <div className="arrow top group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
              <div className="content">New</div>
              <div className="arrow bottom group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
            </div>
            <div className="item hover:!cursor-pointer group">
              <div className="arrow top group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
              <div className="content">Active</div>
              <div className="arrow bottom group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
            </div>
            <div className="item  hover:!cursor-pointer group">
              <div className="arrow top group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
              <div className="content">No Connect</div>
              <div className="arrow bottom group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
            </div>
            <div className="item hover:!cursor-pointer group">
              <div className="arrow top group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
              <div className="content">Hot Lead</div>
              <div className="arrow bottom group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
            </div>
            <div className="item hover:!cursor-pointer group">
              <div className="arrow top group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
              <div className="content">Proposal Sent</div>
              <div className="arrow bottom group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
            </div>
            <div className="item hover:!cursor-pointer group">
              <div className="arrow top group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
              <div className="content">Follow Up</div>
              <div className="arrow bottom group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
            </div>
            <div className="item hover:!cursor-pointer group">
              <div className="arrow top group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
              <div className="content">Confirmed</div>
              <div className="arrow bottom group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
            </div>
            <div className="item hover:!cursor-pointer group">
              <div className="arrow top group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
              <div className="content">Cancelled</div>
              <div className="arrow bottom group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
            </div>
            <div className="item hover:!cursor-pointer group">
              <div className="arrow top group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
              <div className="content group-hover:bg-[#cecece]">Invalid</div>
              <div className="arrow bottom group-hover:bg-[#cecece] group-hover:!border-[#cecece]" />
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full h-[68vh] "> 
          <div className="w-[20%] h-full flex flex-col border-r py-1 bordr-slate-300 bg-[#f5f7f9]">
            {querypage.map((item, index) => {
              return (
                <Link key={index} to={item.link}>
                  <div
                    className={`mx-2 text-sm px-2 hover:cursor-pointer py-2 rounded-sm border-transparent border-l-[8px] ${
                      window.location.pathname.includes(item.link)
                        ? "shadow-lg border-l-[8px] border-l-green-600 bg-white"
                        : "hover:bg-slate-200"
                    }`}
                  >
                    {item.icon} {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="w-[80%] h-[67vh] overflow-y-auto ">
            <Routes>
              <Route path="/" element={<Details />} />
              <Route path="/detail" element={<Details />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/followUps" element={<FollowUps />} />
              <Route path="/guestDocs" element={<GuestDocuments />} />
              <Route path="/mail" element={<Mail />} />
              <Route path="/voucher" element={<Voucher />} />
              <Route
                path="/supplierCommunication"
                element={<SupplierCommunication />}
              />
              <Route path="/history" element={<History />} />
              <Route
                path="/postSalesSuppliers"
                element={<PostSalesSuppliers />}
              />
              <Route path="/proposals" element={<Proposals />} />
              <Route path="/feedBack" element={<FeedBack />} />
            </Routes>
          </div>
          {/* <div className="w-[80%] ">
            <div className="bg-[#f7f7f7] px-1 rounded-md mx-2 py-1 font-[600] mt-2">
              Client Information
            </div>
            <div className="flex  flex-row w-full items-center justify-start mx-2 ">
              <div className="flex-1 mt-2 text-xs">Clirnt Name</div>
              <div className="flex-1 mt-2 text-xs"> Mobile</div>
              <div className="flex-1 mt-2 text-xs">Email</div>
              <div className="flex-1" ></div>
            </div>
            <div className="flex flex-row w-full items-center justify-start mx-2">
              <div className="flex-1 font-[550] text-sm">Mr. Nayan</div>
              <div className="flex-1 font-[550] text-sm">09608829897</div>
              <div className="flex-1 font-[550] text-sm">
                info@krkhospitality.com
              </div>
              <div className="flex-1" ></div>
            </div>
            <div className="bg-[#f7f7f7] px-1 rounded-md mx-2 py-1 font-[600] mt-4">
              Querry Information
            </div>
            <div className="flex mt-2 flex-row w-full items-center justify-start mx-2">
              <div className="flex-1 text-xs">Destination</div>
              <div className="flex-1 text-xs">From Date</div>
              <div className="flex-1 text-xs">To Date</div>
              <div className="flex-1 text-xs">Travel Month</div>
            </div>
            <div className="flex flex-row w-full items-center justify-start mx-2">
              <div className="flex-1 font-[550] text-sm">Dubai</div>
              <div className="flex-1 font-[550] text-sm">01-05-2024</div>
              <div className="flex-1 font-[550] text-sm">05-05-2024</div>
              <div className="flex-1 font-[550] text-sm">May</div>
            </div>
            <div className="flex mt-4 flex-row w-full items-center justify-start mx-2">
              <div className="flex-1 text-xs"> Lead Source</div>
              <div className="flex-1 text-xs">Services</div>
              <div className="flex-1 text-xs">Pax</div>
              <div className="flex-1 text-xs">Assign To</div>
            </div>
            <div className="flex flex-row w-full items-center justify-start mx-2">
              <div className="flex-1 font-[550] text-sm"> Walk-In</div>
              <div className="flex-1 font-[550] text-sm">Full package</div>
              <div className="flex-1 font-[550] text-sm">
                Adult: 2 - Child: 0 - Infant: 0
              </div>
              <div className="flex-1 font-[550] text-sm">
                TravBizz IT Solutions
              </div>
            </div>
            <div className="bg-[#f7f7f7] px-1 rounded-md mx-2 py-1 font-[600] mt-4 flex flex-row justify-between">
              <div>Notes</div>
              <div>
                {" "}
                <button className="flex items-center text-xs rounded-md bg-[blue] text-white px-2 py-1">
                  <AddIcon style={{ fontSize: 15 }} /> Add Notes{" "}
                </button>{" "}
              </div>
            </div>
            <div className="mx-2 mt-2">
              <Textarea
                name="Outlined"
                placeholder="Type in here…"
                variant="outlined"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default QueriesDetail;
