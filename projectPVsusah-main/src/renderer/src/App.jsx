import { useEffect, useContext, lazy, Suspense, useState } from "react";
import "./App.css";

const Home = lazy(() => import("./UserPage/Pages/Home"));
const SignIn = lazy(() => import("./UserPage/Pages/SignIn"));
const SignUp = lazy(() => import("./UserPage/Pages/SignUp"));
const Welcome = lazy(() => import("./UserPage/Pages/Welcome"));
const ErrorPage = lazy(() => import("./UserPage/Pages/ErrorPage"));
const Play = lazy(() => import("./UserPage/Pages/Play"));
const Payment = lazy(() => import("./UserPage/Pages/Payment"));

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Loading from "./UserPage/componets/Loading/Loading";
import NavbarWithoutUser from "./UserPage/componets/Header/NavbarWithoutUser";
import Navbar from "./UserPage/componets/Header/Navbar";
import { UserContext } from "./UserPage/Context/UserContext";
import DashboardPage from "./AdminPage/DashboardPage";
import MasterFilm from "./AdminPage/MasterFilm";
import MasterCust from "./AdminPage/MasterCust";
import Sales from "./AdminPage/Sales";
import Layout from "./AdminPage/Layout";

function App() {
  const { user, login, logout, setSearchData, film } = useContext(UserContext);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({username: '', password: ''})
  const [backgroundColor, setBackgroundColor] = useState("bg-user-bg");
  
  useEffect(() => {
      setCurrentUser(user);
      setSearchData(film);
      console.log(user);
      if(currentUser.username === "admin@gmail.com") {
        setBackgroundColor("bg-admin-bg")
      } else{
        setBackgroundColor("bg-user-bg")
      }
  }, [location, user]);
  

  return (
    <div className={`${backgroundColor}`}>
      {/* <Payment/> */}
      {currentUser.username ? (
        currentUser.username === "admin@gmail.com" ? (
          ""
        ) : (
          <Navbar />
        )
      ) : <NavbarWithoutUser></NavbarWithoutUser>}
      <Suspense replace fallback={<Loading />}>
        <Routes>
          <Route index path="/" element={currentUser.username ? (
            currentUser.username === "admin@gmail.com" ? (
              <DashboardPage />
              // console.log(location)
            ) : (
              <Home />
            )
          ) : <Welcome />} />
          {currentUser.username ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/play/:id" element={<Play />} />
              </>
          ) : null }

          {/* User Page */}
          <Route path="/play/:id" element={<Play />} />
          <Route path="/payment" element={<Payment />} />


          {/* Admin Page */}
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element= {<DashboardPage />} />
            <Route path="/masterfilm" element= {<MasterFilm />} />
            <Route path="/mastercust" element= {<MasterCust />} />
            <Route path="/sales" element= {<Sales />} />
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
