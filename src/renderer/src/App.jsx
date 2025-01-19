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

function App() {
  const { user, login, logout } = useContext(UserContext);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({username: '', password: ''})
  
  useEffect(() => {
      setCurrentUser(user);
      console.log(user);
  }, [location, user]);
  

  return (
    <div>
      {/* <Payment/> */}
      {currentUser.username ? <Navbar></Navbar> : <NavbarWithoutUser></NavbarWithoutUser>}
      <Suspense replace fallback={<Loading />}>
        <Routes>
          <Route index path="/" element={currentUser.username ? <Home /> : <Welcome />} />
          {currentUser.username ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/play/:id" element={<Play />} />
            </>
          ) : null}

          {/* User Page */}
          <Route path="/play/:id" element={<Play />} />
          <Route path="/payment" element={<Payment />} />

          {/* Admin Page */}
          <Route path="/masterfilm" element= {<MasterFilm />} />
          <Route path="/mastercust" element= {<MasterCust />} />
          <Route path="/sales" element= {<Sales />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
