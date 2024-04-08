import React, { useState } from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";

const Login = () => {
  const [isActive, setIsActive] = useState(false);

  const [pin, setPin] = useState([]);

  const pass = "1221";

  const handleChange = (value) => {
    if (pin.length < 4) {
      return setPin([...pin, value]);
    }
  };

  const handleDelete = () => {
    pin.pop();
    setPin([...pin]);
  };

  console.log(pin);

  return (
    <div className="w-full h-screen flex justify-center items-center" >
      <div className="!w-[90%] sm:!w-[70%]" id="container">
        <style>{`

      @keyframes shake {
        10%, 90% {
          transform: translateX(-10px);
        }
        
        20%, 80% {
          transform: translateX(10px);
        }
      
        30%, 50%, 70% {
          transform: translateX(-10px);
        }
      
        40%, 60% {
          transform: translateX(10px);
        }
      }
      
      
      .shake {
        animation: shake 0.7s ease-in-out;
      }

        *,*::after,*::before{
          margin: 0;
          padding: 0;
          box-sizing: inherit;
        } 
        html{
          height: 100%;
          font-size: 75.2%;
          box-sizing: border-box;
          font-family: monospace;
          -webkit-font-smoothing: antialiased; 
          font-weight: 400;
        }
        
        h1{
          font-weight: 700;
          font-size: 3.5em;
          text-align: center;
        }
        
        .version{
          position:absolute;
          bottom: 1em;
          right: 2em;
          border-radius: 40px;
          background: #ff4b2b;
          color: #fff;
          font-size: 1em;
          font-weight: bold;
          padding: .8em 2em;
          letter-spacing: 1px;
          transition: transform 80ms ease-in;
        }
        
        form input {
          background: #eee;
          border: none;
          padding: 12px 15px;
          margin: 8px 0;
          width: 100%;
          font-size: 1.4em;
        }
        
        span{
          color: #333;
          font-size: 1.4em;
          display: inline-block;
          margin: 15px auto;
          font-weight: 100;
        }
        
        span.remember{
          float: left;
          &::before{
            content:"";
            display: inline-block;
            width: 1em;
            height: 1em;
            border: 2px solid #999;
            vertical-align: top;
            margin-right: 4px;
          }
        }
        
        span.forget{
          float: right;
        }
        
        span.clearfix{
          clear: both;
          display: table;
        }
        
        span.loginwith{ 
          display: block;
          width: 100%;
          margin-top: 1em;
          white-space: nowrap;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items:center;
          &::before{
            content:"";
            display: inline-block;
            width: 42%; 
            height:1px;
            background: #aaa;
            vertical-align: middle;
            margin-right: 5%;
          }
          &::after{
            content:"";
            display: inline-block;
            width: 45%; 
            height: 1px;
            background: #aaa;
            vertical-align: middle;
            margin-left: 5%;
          }
        }
        
        span.copy{
          display: block;
          position: absolute;
          bottom: 0;
          font-size: 1em;
        }
        
        button {
          display: block;
          margin: 1em auto;
          border-radius: 40px !important;
          border: 1px solid #12344d;
         background-color:#12344d;
          color: #fff;
          font-size: 1.2em;
          font-weight: bold;
          padding: .8em 2em;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: transform 80ms ease-in;
          svg{
            vertical-align: middle;
          }
        } 
        
        button:hover {
          cursor:pointer;
        }
        
        button:active {
          transform: scale(.95);
        }
        
        button:focus {
          outline: none;
        }
        
        #container{
          width: 70%;
          margin:auto;
          position: relative;
          border-radius: 20px;
          box-shadow: 0 28px 28px 10px rgba(0, 0, 0, .2), 0 10px 10px -10px rgba(0, 0, 0, .02);
          transform-style: preserve-3d;
        }
        
        .content{
          width: 100%;
          padding: 4em 4em;
          text-align: center;
          p{
            font-size: 1.4em;
          }
        }
        
        .login{
          left:0;
          background:#FAFAFA;
          border-radius: 20px 0 0 20px;
          button{
            border-radius: 0px;
            width: 100%;
          }
          svg{
            margin: 1em; 
            stroke: #999; 
          }
        }
        
        .register{
          right: 0;
          z-index: 1;
          border-radius: 0 20px 20px 0;
          background:#FAFAFA;
          button{
            border-radius: 0px;
            width: 100%;
          }
          svg{
            margin: 1em; 
            stroke: #999; 
          }
        }
        
        .page{
          right:0; 
          color: #fff;
          border-radius:  0 20px 20px 0; 
          transform-origin: left center;
          transition: animation 1s linear;
          button{
            border-color: #fff;
            background: transparent;
          }
          p{
            margin: 2em auto;
          }
        }
        
        .front{
          background-color : #12344d ;
          padding:20px;
          z-index: 3;
        }
        
        .back{
          z-index: 3;
          padding:20px;
          .content{
            transform: rotateY(180deg)
          }	
        }
        
        .active .front{
          animation: rot-front 0.5s ease-in-out normal forwards;
        }
        
        .active .back {
          animation: rot-back 0.5s ease-in-out normal forwards;
        }
        
        .close .front {
          animation: close-rot-front 0.5s ease-in-out normal forwards;
        }
        
        .close .back{ 
          animation: close-rot-back 0.5s ease-in-out normal forwards;
        }
        
        @keyframes rot-front{ 
          from{
            transform: translateZ(2px) rotateY(0deg); 
          }
          to{
            transform: translateZ(1px) rotateY(-180deg);
          }
        }
        
        @keyframes close-rot-front{ 
          from{
            transform: translateZ(1px) rotateY(-180deg); 
          }
          to{
            transform: translateZ(2px) rotateY(0deg);
          }
        }
        
        @keyframes rot-back{ 
          from{
            transform: translateZ(1px) rotateY(0deg); 
          }
          to{
            transform: translateZ(2px) rotateY(-180deg);
          }
        }
        
        @keyframes close-rot-back{ 
          from{
            transform: translateZ(2px) rotateY(-180deg); 
          }
          to{
            transform: translateZ(1px) rotateY(0deg);
          }
        }
        
        .active .register .content{
          animation: show .7s ease-in-out normal forwards;
        }
        
        .close .register .content{
          animation: hide .7s ease-in-out normal forwards;
        }
        
        .active .login .content{
          animation: hide .7s ease-in-out normal forwards;
        }
        
        .close .login .content{
          animation: show .7s ease-in-out normal forwards;
        }
        
        @keyframes show{
          from{
            opacity: 0;
            transform: scale(0.8)
          }
          to{
            opacity: .99;
            transform: scale(.99)
          }
        } 
        
        @keyframes hide{
          from{
            opacity: .99;
            transform: scale(0.99)
          }
          to{
            opacity: 0;
            transform: scale(0.8)
          }
        }
      `}</style>

        <div className={`flex h-full ${isActive ? "active" : "close"}`}>
          <div className=" w-full lg:w-[50%]">
            <div className=" px-1 lg:px-5  py-5 lg:py-16 w-full">
              <div className="text-slate-800 p-10 text-center text-4xl font-bold">
                Login With Pin
              </div>

              <div
                className={` ${
                  pin.length > 3 ? (pin.join("") === pass ? "" : "shake") : ""
                } flex flex-row w-[45%] sm:w-[30%] lg:w-[40%] m-auto justify-evenly`}
              >
                <div
                  className={` ${
                    pin.length >= 1 ? "bg-black" : "bg-white"
                  }  border  border-black h-7 w-7 rounded-full`}
                ></div>
                <div
                  className={` ${
                    pin.length >= 2 ? "bg-black" : "bg-white"
                  }  border  border-black h-7 w-7 rounded-full`}
                ></div>
                <div
                  className={` ${
                    pin.length >= 3 ? "bg-black" : "bg-white"
                  }  border  border-black h-7 w-7 rounded-full`}
                ></div>
                <div
                  className={` ${
                    pin.length == 4 ? "bg-black" : "bg-white"
                  }  border  border-black h-7 w-7 rounded-full`}
                ></div>
              </div>

              <div className="flex flex-col min-[200px]:w-[70%] w-[50%] sm:w-[40%] lg:w-[50%] m-auto mt-7">
                <div className="flex flex-row justify-evenly mt-2">
                  <div
                    onClick={() => {
                      handleChange("1");
                    }}
                    className="border select-none cursor-pointer border-black rounded-full h-24 w-24 text-3xl flex items-center justify-center"
                  >
                    1
                  </div>
                  <div
                    onClick={() => {
                      handleChange("2");
                    }}
                    className="border select-none cursor-pointer border-black rounded-full h-24 w-24 text-3xl flex items-center justify-center"
                  >
                    2
                  </div>
                  <div
                    onClick={() => {
                      handleChange("3");
                    }}
                    className="border select-none cursor-pointer border-black rounded-full h-24 w-24 text-3xl flex items-center justify-center"
                  >
                    3
                  </div>
                </div>

                <div className="flex flex-row  justify-evenly mt-2">
                  <div
                    onClick={() => {
                      handleChange("4");
                    }}
                    className="border select-none cursor-pointer border-black rounded-full h-24 w-24 text-3xl flex items-center justify-center"
                  >
                    4
                  </div>
                  <div
                    onClick={() => {
                      handleChange("5");
                    }}
                    className="border select-none cursor-pointer border-black rounded-full h-24 w-24 text-3xl flex items-center justify-center"
                  >
                    5
                  </div>
                  <div
                    onClick={() => {
                      handleChange("6");
                    }}
                    className="border select-none cursor-pointer border-black rounded-full h-24 w-24 text-3xl flex items-center justify-center"
                  >
                    6
                  </div>
                </div>

                <div className="flex flex-row justify-evenly  mt-2">
                  <div
                    onClick={() => {
                      handleChange("7");
                    }}
                    className="border select-none cursor-pointer border-black rounded-full h-24 w-24 text-3xl flex items-center justify-center"
                  >
                    7
                  </div>
                  <div
                    onClick={() => {
                      handleChange("8");
                    }}
                    className="border select-none cursor-pointer border-black rounded-full h-24 w-24 text-3xl flex items-center justify-center"
                  >
                    8
                  </div>
                  <div
                    onClick={() => {
                      handleChange("9");
                    }}
                    className="border select-none cursor-pointer border-black rounded-full h-24 w-24 text-3xl flex items-center justify-center"
                  >
                    9
                  </div>
                </div>

                <div className="flex flex-row  justify-evenly mt-2">
                  <div
                    onClick={() => {
                      handleChange("0");
                    }}
                    className="border select-none  cursor-pointer border-black rounded-full h-24 w-24 text-3xl flex items-center justify-center"
                  >
                    0
                  </div>
                  <div
                    onClick={() => {
                      handleDelete();
                    }}
                    className="border cursor-pointer border-black rounded-full h-24 w-24 text-3xl flex items-center justify-center"
                  >
                    <BackspaceOutlinedIcon style={{ fontSize: 20 }} />
                  </div>
                </div>
              </div>

              <div></div>
            </div>
          </div>

          <div className=" page front w-[50%] hidden lg:block ">
            <div
              style={
                isActive
                  ? { opacity: 0, transition: "opacity 0.5s" }
                  : { opacity: 1, transition: "opacity 0.5s" }
              }
              className="content h-full"
            >
              <PersonAddAltOutlinedIcon style={{ fontSize: 100 }} />
              <h1>Hello,friend!</h1>
              <p className="!text-3xl" >Enter your personal details and start your journey with us</p>
              <button
                onClick={(e) => {
                  setIsActive(true);
                }}
                className="flex items-center h-16"
                id="register"
              >
                <span className="text-white text-base">Login</span>
                <ArrowForwardOutlinedIcon />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`flex  lg:block h-full  ${
            isActive ? "active" : "close"
          }`}
        >
          <div className="page back  w-[50%] absolute top-0">
            <div
              style={
                isActive
                  ? { opacity: 1, transition: "opacity 0.5s" }
                  : { opacity: 0, transition: "opacity 0.5s" }
              }
              className=" content"
            >
              <LogoutOutlinedIcon style={{ fontSize: 100 }} />
              <h1>Welcome Back!</h1>
              <p className="!text-3xl" >
                To stay connected with us, please login with your personal info
              </p>
              <button
                onClick={() => {
                  setIsActive(false);
                }}
                className="flex items-center h-16"
                id="register"
              >
                <ArrowBackOutlinedIcon />
                <span className="text-white text-base">Pin Login</span>
              </button>
            </div>
          </div>

          <div className="register w-[50%] absolute top-0 right-0 h-full">
            <div className="h-full content">
              <h1>Log In</h1>
              <form className="mt-10">
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <span className="forget">Forgot password?</span>
                <span className="clearfix"></span>
                <button
                  className="h-20"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
