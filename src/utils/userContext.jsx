import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userType, setUserType] = useState("public");
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState("");
  return (
    <AppContext.Provider
      value={{ userType, setUserType, userData, setUserData, token, setToken }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => useContext(AppContext);
