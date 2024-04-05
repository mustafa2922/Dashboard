import React from "react";
import TextField from "@mui/material/TextField";
import email1 from '../../../assets/images/email1.png'
import email2 from '../../../assets/images/email2.png'
import email3 from '../../../assets/images/email3.png'

function MailSetting() {
  return (
    <div className="flex flex-row p-3 w-full h-full justify-between bg-[#f7f9fa] ">
      <div className="w-[49%]  border-slate-300 border rounded-lg p-5 h-fit bg-white">
        <div className="text-black font-bold">SETUP SMTP SETTINGS</div>

        <div className="flex flex-col mt-4 ml-4">
          <div>
            <hr />

            <div className="flex flex-row justify-between py-2">
              <div className="text-sm flex justify-start items-center w-[30%]">
                Name
              </div>

              <div className="w-[70%]">
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Name"
                  name="Name"
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              </div>
            </div>

            <hr />
          </div>
        </div>

        <div className="flex flex-col ml-4">
          <div>
            <div className="flex flex-row justify-between py-2">
              <div className="text-sm flex justify-start items-center w-[30%]">
                Email
              </div>

              <div className="w-[70%]">
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Email"
                  name="Name"
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              </div>
            </div>

            <hr />
          </div>
        </div>

        <div className="flex flex-col ml-4">
          <div>
            <div className="flex flex-row justify-between py-2">
              <div className="text-sm flex justify-start items-center w-[30%]">
                Password
              </div>

              <div className="w-[70%]">
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Password"
                  name="Name"
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              </div>
            </div>

            <hr />
          </div>
        </div>

        <div className="flex flex-col ml-4">
          <div>
            <div className="flex flex-row justify-between py-2">
              <div className="text-sm flex justify-start items-center w-[30%]">
                SMTP Server
              </div>

              <div className="w-[70%]">
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="SMTP Server"
                  name="Name"
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              </div>
            </div>

            <hr />
          </div>
        </div>

        <div className="flex flex-col ml-4">
          <div>
            <div className="flex flex-row justify-between py-2">
              <div className="text-sm flex justify-start items-center w-[30%]">
                Port
              </div>

              <div className="w-[70%]">
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Port"
                  name="Name"
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              </div>
            </div>

            <hr />
          </div>
        </div>

        <div className="flex flex-col ml-4">
          <div>
            <div className="flex flex-row justify-between py-2">
              <div className=" text-sm flex justify-start items-center w-[30%]">
                Security Type
              </div>

              <div className="w-[70%]">
                <select className="hover:border-black w-full border border-[#c4c4c4] h-[40px] rounded-sm active:outline-none focus:outline-none">
                  <option>None</option>
                  <option>SSL</option>
                </select>
              </div>
            </div>

            <hr />
          </div>
        </div>

        <div className="mt-5 w-full px-2 ">
          <button className="w-full rounded-xl font-bold p-2 text-white bg-green-600 hover:bg-green-900 flex justify-center items-center">
            Save
          </button>
        </div>
      </div>

      <div className="w-[49%]  border-slate-300 border rounded-lg h-fit pb-10 bg-white">

        <div className="w-full flex items-center rounded-t-lg justify-start p-3 font-bold text-lg text-white bg-[#6c757d]" > Configure Email </div>

        <div className="mt-5 px-8" >
          <div className="w-full text-center" >Connect your email inbox and transform the way you do sales.</div>

          <div className="flex flex-row w-full justify-evenly mt-5 items-center" >

            <div className="flex flex-col w-[30%] items-center" >
              <div className="w-28" >
                <img className="h-full w-full object-contain" src={email1} />
              </div>
              <div className="text-center text-xs" >
              Access your customer emails with holistic CRM information
              </div>
            </div>
 
            <div className="flex flex-col w-[30%] items-center" >
              <div className="w-28" >
                <img className="h-full w-full object-contain" src={email2} />
              </div>
              <div className="text-center text-xs" >
              Send and receive mails from inside CRM records
              </div>
            </div>
 
            <div className="flex flex-col w-[30%] items-center" >
              <div className="w-28" >
                <img className="h-full w-full object-contain" src={email3} />
              </div>
              <div className="text-center text-xs" >
              Synchronize your email inbox
              </div>
            </div>
 

          </div>
        </div>

        <div className="mt-5 mx-8 bg-[#f5f5f5] p-2 py-5" >
          <div className="text-black font-bold text-sm" >Use the following settings:</div>
          <div className="mt-2" >
            <p className="text-xs" >{`1) Mail.com SMTP server address: smtp.yourdomain.com`}</p>
            <p className="text-xs mt-1" >{`2) Mail.com SMTP username: Your full yourdomain.com email address`}</p>
            <p className="text-xs mt-1" >{`3) Mail.com SMTP password: Your yourdomain.com password`}</p>
            <p className="text-xs mt-1" >{`4) Mail.com SMTP port: 587 (alternatives: 465 and 25)`}</p>
            <p className="text-xs mt-1" >{`5) Mail.com SMTPTLS/SSL required: yes (no can be used as an alternative)`}</p>
          </div>
        </div>

      </div>
    </div>  
  );
}

export default MailSetting;
