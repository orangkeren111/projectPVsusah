import { useEffect, useContext, lazy, Suspense, useState } from "react";
import "./App.css";

const Home = lazy(() => import("./Pages/Home"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Welcome = lazy(() => import("./Pages/Welcome"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));
const Play = lazy(() => import("./Pages/Play"));
const Payment = lazy(() => import("./Pages/Payment"));

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./Context/UserContext";
import Loading from "./componets/Loading/Loading";
import Navbar from "./componets/Header/Navbar";
import NavbarWithoutUser from "./componets/Header/NavbarWithoutUser";

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
          <Route path="/play/:id" element={<Play />} />
          <Route path="/payment" element={<Payment />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
