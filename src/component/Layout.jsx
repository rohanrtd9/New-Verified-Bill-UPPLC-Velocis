import React, { useState } from "react";
import PropTypes from "prop-types";
import { Sidebar } from "./Sidebar";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Popper from "popper.js";
import { useUserContext } from "../utils/userContext";

const Dropdown = ({ color }) => {
  const navigate = useNavigate();
  const { userType, setUserType } = useUserContext();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      setUser(JSON.parse(data));
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  let bgColor;
  color === "white"
    ? (bgColor = "bg-gray-800")
    : (bgColor = "bg-" + color + "-500");
  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
          <div className="relative inline-flex align-middle w-full">
            <button
              className={
                "text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 " +
                bgColor
              }
              style={{ transition: "all .15s ease" }}
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {user?.CIRCLE_NAME}
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                (color === "white" ? "bg-white " : bgColor + " ") +
                "text-base z-50 float-right py-2 list-none text-left rounded shadow-lg mt-1"
              }
              style={{ minWidth: "12rem" }}
            >
              <button
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                  (color === "white" ? " text-gray-800" : "text-white")
                }
                onClick={logout}
              >
                Logout
              </button>
              <hr />
              <button
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                  (color === "white" ? " text-gray-800" : "text-white")
                }
                onClick={() => {
                  setDropdownPopoverShow(false);
                  setUserType(userType === "division" ? "admin" : "division");
                }}
              >
                Change user type
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setUserData, setToken } = useUserContext();
  useEffect(() => {
    const data = localStorage.getItem("userData");
    const token = localStorage.getItem("token");
    if (data === null && token === null) {
      navigate("/login", { replace: true });
    } else {
      setUserData(JSON.parse(data));
      setToken(token);
    }
  }, [pathname]);
  if (pathname !== "/login") {
    return (
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-200">
          <Sidebar />
        </div>
        <div className="w-3/4 bg-white overflow-y-auto">
          <div className="flex p-3 border-b justify-end">
            <Dropdown color={"blue"} />
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    );
  } else {
    return <div className="h-screen w-screen">{children}</div>;
  }
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
