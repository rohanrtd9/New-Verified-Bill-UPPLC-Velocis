import { useEffect, useState } from "react";
import Header from "../../../component/Header";
import { select, input, label, btn } from "../../../utils/tailwindClasses";
import { apiUrl } from "../../../constant";
import axios from "axios";
import Loader from "../../../component/Loader";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../utils/userContext";

function ListConnections() {
  const navigate = useNavigate();
  const [billFor, setBillFor] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [localBodyName, setLocalBodyName] = useState("");
  const [connectionID, setConnectionID] = useState("");
  const [connectionData, setConnectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useUserContext();
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    const data = {
      billFor: billFor,
      localBodyName: categoryType,
      categoryType: localBodyName,
      connectionID: connectionID,
    };
    axios
      .post(`${apiUrl}list-connection`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        if (response?.data?.connections) {
          setConnectionData(response?.data?.connections);
        }
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const formatDate = (date) => {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, "0");
    const day = dt.getDate().toString().padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  const deleteConnection = (id) => {
    setLoading(true);
    const data = {
      connectionID: id,
    };

    axios
      .delete(`${apiUrl}delete-connection`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        console.log("Response:", response);
        alert("Connection Deleted Successfully.");
        getList();
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  return (
    <>
      {loading && <Loader />}
      <Header
        title="New Connection List"
        action={{
          button: "Back",
          path: "/NewConnection/add",
        }}
      />

      {/* <div
        className="mt-8 max-w-xxl p-6 bg-white border border-gray-200 rounded-lg shadow  
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto"
      >
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="relative  z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className={input}
              placeholder=" "
              required
            />
            <label className={label}>Bill For</label>
          </div>
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>Local Body Name</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Category Type</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="Jalkal">Jalkal</option>
            </select>
          </div>
        </div>

        <button className={btn}>Search</button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Reset
        </button>
      </div> */}

      <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-50 ">
            <tr>
              <th className="p-2">S.No.</th>
              <th className="p-2 whitespace-nowrap">Bill For</th>
              <th className="p-2 whitespace-nowrap">Category Type</th>
              <th className="p-2 whitespace-nowrap">Local Body Name</th>
              <th className="p-2 whitespace-nowrap">Date of Connection</th>
              <th className="p-2 whitespace-nowrap">Book No.</th>
              <th className="p-2 whitespace-nowrap">SC No.</th>
              <th className="p-2 whitespace-nowrap">Billing Mode</th>
              <th className="p-2 whitespace-nowrap">Account ID</th>
              <th className="p-2 whitespace-nowrap">Name</th>
              <th className="p-2 whitespace-nowrap">Address</th>
              <th className="p-2 whitespace-nowrap">Billing Type</th>
              <th className="p-2 whitespace-nowrap">Load</th>
              <th className="p-2 whitespace-nowrap">Meter Status</th>
              <th className="p-2">ST</th>
              <th className="p-2 whitespace-nowrap">Meter No.</th>
              <th className="p-2 whitespace-nowrap">Meter Make</th>
              <th className="p-2">MF</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {connectionData ? (
              connectionData.map((connection, index) => (
                <tr className="bg-white border-b" key={connection._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{connection.billFor}</td>
                  <td className="p-2">{connection.categoryType}</td>
                  <td className="p-2">{connection.categoryBasedName}</td>
                  <td className="p-2">
                    {formatDate(connection.dateOfConnection)}
                  </td>
                  <td className="p-2">{connection.bookNo}</td>
                  <td className="p-2">{connection.scNo}</td>
                  <td className="p-2">{connection.billingMode}</td>
                  <td className="p-2">
                    {connection.accountID !== "" ? connection.accountID : "NA"}
                  </td>
                  <td className="p-2">{connection.name}</td>
                  <td className="p-2">{connection.address}</td>
                  <td className="p-2">{connection.billingType}</td>
                  <td className="p-2">{connection.load} watt</td>
                  <td className="p-2">{connection.meterStatus}</td>
                  <td className="p-2">{connection.st}</td>
                  <td className="p-2">{connection.meterNo}</td>
                  <td className="p-2">{connection.meterMake}</td>
                  <td className="p-2">{connection.MF}</td>
                  <td className="p-2 flex">
                    <button
                      onClick={() =>
                        navigate("/NewConnection/" + connection._id)
                      }
                      className="bg-blue-500 text-white px-4 py-2 m-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteConnection(connection._id)}
                      className="bg-red-500 text-white px-4 py-2 m-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b">
                <td colSpan={19} align="center">
                  No record.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ListConnections;
