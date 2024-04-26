import { Link } from "react-router-dom";
import { btn } from "../utils/tailwindClasses";

function Header({ title, action }) {
  const { button, path } = action;
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-3 p-4">
        <p className="font-semibold">{title}</p>
        {
          button !=='' && 
          <Link to={path}>
          <button className={btn}>{button}</button>
        </Link>
        }
        
      </div>
      <hr />
    </div>
  );
}
export default Header;
