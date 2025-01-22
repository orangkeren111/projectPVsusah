import React, { useState, useEffect, useContext } from "react";

import { Transition } from "@headlessui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

function Navbar(props) {
  const { user, login, logout, search } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [inputSearch, setInputSearch] = useState("");

  const searching = (e) => {
    let input = e.target.value
    setInputSearch(input)
    search(input)
  }

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    console.log("Navbar", user);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const [show, handleShow] = useState(false);
  const transitionNavBar = () => {
    if (window.scrollY > 80) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  const NavBlack = () => {
    handleShow(true);
  };
  const NavTransparent = () => {
    handleShow(false);
  };

  function SignOut(){
    navigate("/")
    logout();
  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '52ch',
      },
      [theme.breakpoints.up('md')]: {
        width: '105ch',
      },
    },
  }));

  return (
    <>
      <header
        className={
          props.playPage
            ? "fixed top-0 z-10 w-full backdrop-blur-sm"
            : "fixed top-0 z-10 w-full"
        }
      >
        <nav
          className={`transition duration-500 ease-in-out  ${
            show && "transition duration-500 ease-in-out bg-black "
          } `}
        >
          <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                {location.pathname === "/" ? (
                  <div className="flex-shrink-0">
                    <h1 className="py-2 font-medium text-white">Welcome, {user.name}</h1>
                  </div>
                ) : (
                  <div className="hidden md:block">
                    <div className="flex items-center ml-10 space-x-4">
                      <Link
                        to={"/"}
                        className="py-2 font-medium text-white transition ease-in-out delay-150 rounded-md cursor-pointer hover:text-red-800 lg:px-3 text-m"
                      >
                        <ArrowBackIcon style={{paddingBottom: "2px"}}></ArrowBackIcon> Back
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className={location.pathname === "/" ? "ms-6" : "hidden"}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={inputSearch}
                    onChange={searching}
                  />
                </Search>
              </div>
              <div className="ml-auto">
                <div className="flex">
                  {/* Search Icon */}
                  {/* <Link to={""}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="items-center w-10 h-10 pr-4 mt-auto mb-auto text-white hover:text-red-800 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </Link> */}

                  {user ? (
                    <a className="items-center hidden pr-4 mt-auto mb-auto text-base font-medium text-white transition ease-in-out delay-150 cursor-pointer hover:text-red-800 md:flex">
                      {user.displayName}
                    </a>
                  ) : null}

                  {/* Notification icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="items-center hidden w-10 h-10 pr-4 mt-auto mb-auto text-white cursor-pointer md:flex"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>

                  <div className="group inline-block relative transition ease-in-out delay-300">
                    <Link>
                      <img
                        className="h-10 w-10 rounded-full cursor-pointer"
                        src={`https://www.citypng.com/public/uploads/preview/profile-user-round-red-icon-symbol-download-png-11639594337tco5j3n0ix.png`}
                        alt="NETFLIX"
                      />
                    </Link>
                    <ul class="absolute hidden text-white pt-1 -ml-20 group-hover:block transition ease-in-out delay-150">
                      <li>
                        <Link
                          className="cursor-pointer rounded-t bg-stone-900 font-bold hover:border-l-4 hover:bg-gradient-to-r from-[#ff000056] border-red-800 py-2 px-4 block whitespace-no-wrap transition ease-in-out delay-150"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <a
                          onClick={()=>SignOut()}
                          className="cursor-pointer rounded-b bg-stone-900 font-bold hover:border-l-4 hover:bg-gradient-to-r from-[#ff000056] border-red-800 py-2 px-4 block whitespace-no-wrap transition ease-in-out delay-150"
                        >
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex pl-4 -mr-2 md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-900 rounded-md hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                      onClick={NavBlack}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                      onClick={NavTransparent}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className="md:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <a
                    onClick={()=>SignOut()}
                    className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-red-800 hover:text-white"
                  >
                    Sign Out
                  </a>
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
