import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Fade } from "react-reveal";
import { ClipLoader } from "react-spinners";
import { UserContext } from "../Context/UserContext";

import GoogleLogo from "../images/GoogleLogo.png";
import WelcomePageBanner from "../images/WelcomePageBanner.jpeg";
import { Box, Typography } from "@mui/material";

function SignIn() {
  const {login} = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const [errName, setErrName] = useState("")
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password){
      let success = login(email, password);
      // Tambahan logic dari aku
      if (email === "admin@gmail.com" && password === "admin"){
        console.log("Masuk admin harusnya")
        setLoader(true);
        navigate('/dashboard')
      }
      else if (success){
        setLoader(true);
        navigate('/');
      }
      else{
        setErrName("Error")
        setErrorMessage("Error")
      }
    } else{
      setErrName("Error")
      setErrorMessage("Error")
    }
  }

  return (
    <section
      style={{
          width: "100%", 
          height:"120%",
          background: `linear-gradient(0deg, hsl(0deg 0% 0% / 50%) 0%, hsl(0deg 0% 0% / 50%) 35%),url(${WelcomePageBanner})`,
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat", 
          position: "relative", 
          backgroundColor: "#1e293b",
      }}
    >
      <Box      
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}>  
        <Box 
        sx={{
          width: '50%',
          backgroundColor: '#000000a2',
          borderRadius: '8px',
          border: '2px solid #2f2f2f', 
        }}>
          
          <Fade>
            <Box>
              <Box sx={{padding:5}}>
                <Typography 
                sx={{      
                  fontSize:"24px", 
                  fontWeight: 'bold',
                  color: 'white',}}>
                  Log in to your account
                </Typography>
                <form
                  onSubmit={handleSubmit}
                  style={{
                    paddingTop:"32px",
                    paddingBottom:"32px"
                  }}
                >
                  <div>
                    <label
                      for="email"
                      className="block mb-4 text-sm font-medium text-white dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className={
                        ErrorMessage
                          ? "bg-stone-700 text-white sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-2 border-red-700  dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white"
                          : "bg-stone-700 text-white sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white"
                      }
                      placeholder="name@email.com"
                      required=""
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mt-4 mb-4 text-sm font-medium text-white dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className={ `mb-0.5 ${
                        ErrorMessage
                          ? "bg-stone-700 text-white sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  border-2 border-red-700 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white"
                          : "bg-stone-700 text-white sm:text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white"
                      }`}
                      required=""
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    {ErrorMessage && (
                      <h1 className="flex text-white font-bold p-4 bg-red-700 rounded text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                        {ErrorMessage}
                      </h1>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          required=""
                        ></input>
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          for="remember"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`w-full text-white mt-4 ${
                      loader
                        ? `bg-stone-700`
                        : `bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300`
                    } transition ease-in-out font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                  >
                    {loader ? <ClipLoader color="#ff0000" /> : `Log in`}
                  </button>
                  <button
                    className={`flex justify-center items-center w-full text-white mt-2 ${
                      loader
                        ? `bg-stone-700`
                        : `bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300`
                    } transition ease-in-out font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:focus:ring-primary-800`}
                  >
                    {loader ? (
                      <ClipLoader color="#ff0000" />
                    ) : (
                      <>
                        <img className="w-8" src={GoogleLogo}></img>{" "}
                        <p className="ml-1">Log in with Google</p>
                      </>
                    )}
                  </button>
                  {errName!="" && (
                    <a style={{textAlign: 'center', color: "red"}}>Username/Password invalid!</a>
                  )}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      className="font-medium text-white hover:underline dark:text-primary-500"
                      to={"/signup"}
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </Box>
            </Box>
          </Fade>
        </Box>
      </Box>
    </section>
  );
}

export default SignIn;
