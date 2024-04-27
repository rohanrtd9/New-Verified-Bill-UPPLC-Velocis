import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { btn } from "../utils/tailwindClasses";
import { useUserContext } from "../utils/userContext";

function Header({ title, action }) {
  const { userType, setUserType } = useUserContext();

  const { button, path } = action;
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-3 p-4">
        <p className="font-semibold">{title}</p>
        {button !== "" && (
          <Link to={path}>
            <button className={btn}>{button}</button>
          </Link>
        )}
        <button
          className={btn}
          onClick={() =>
            setUserType(userType === "public" ? "admin" : "public")
          }
        >
          Change {userType}
        </button>
      </div>
      <hr />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.shape({
    button: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
};

export default Header;
