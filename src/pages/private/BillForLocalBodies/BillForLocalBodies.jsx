import { useEffect, useState } from "react";
import Header from "../../../component/Header";
import { select, input, label, btn } from "../../../utils/tailwindClasses";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../../constant";
import Loader from "../../../component/Loader";
import { useUserContext } from "../../../utils/userContext";

function BillForLocalBodies() {
  const [billForData, setBillForData] = useState([]);
  const [categoryTypeData, setCategoryTypeData] = useState([]);
  const [localBodyNameData, setLocalBodyNameData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connectionData, setConnectionData] = useState({
    billFor: "",
    categoryType: "",
    localBodyName: "",
  });
  const { token } = useUserContext();
  const [connectionList, setConnectionList] = useState([]);

  useEffect(() => {
    if (token !== "") {
      getBillFor();
    }
  }, [token]);
  useEffect(() => {
    if (connectionData.categoryType !== "") {
      getLocalBodyName();
    }
  }, [connectionData.categoryType]);

  useEffect(() => {
    if (connectionData.billFor !== "") {
      getCtegoryType();
    }
  }, [connectionData.billFor]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConnectionData((prev) => ({ ...prev, [name]: value }));
  };
  const getBillFor = () => {
    axios
      .post(`${apiUrl}list-billfor`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        if (response?.data?.records.length > 0) {
          setBillForData(response?.data?.records);
        }
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const getCtegoryType = () => {
    const data = {
      billFor: connectionData.billFor,
      masters: 0,
    };
    axios
      .post(`${apiUrl}list-category`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        if (response?.data?.records.length > 0) {
          setCategoryTypeData(response.data.records);
        }
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const getLocalBodyName = () => {
    const data = {
      categoryType: connectionData.categoryType,
      billFor: connectionData.billFor,
    };
    axios
      .post(`${apiUrl}list-sub-category`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        if (response?.data?.records.length > 0) {
          setLocalBodyNameData(response.data.records);
        }
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const search = () => {
    const data = {
      billFor: connectionData.billFor,
      categoryBasedName: connectionData.localBodyName,
      categoryType: connectionData.categoryType,
      connectionID: "",
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
        if (response?.data?.connections.length > 0) {
          setConnectionList(response.data.connections);
        } else {
          setConnectionList([]);
        }
      })
      .catch((error) => {
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
        title="Varified Monthly Bill For Local Bodies"
        action={{
          button: "",
          path: "",
        }}
      />

      <div
        className="mt-8 max-w-xxl p-6 bg-white border border-gray-200 rounded-lg shadow  
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto"
      >
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <select
              className={select}
              name="billFor"
              onChange={handleChange}
              value={connectionData.billFor}
            >
              <option value={""}>Select Bill for</option>
              {billForData.length > 0 &&
                billForData.map((bill) => (
                  <option key={bill._id} value={bill.billFor}>
                    {bill.billFor}
                  </option>
                ))}
            </select>
            <label className={label}>Bill For</label>
          </div>
          {connectionData.billFor !== "" && (
            <>
              <div className="relative z-0 w-full col-md-4 mb-4 group">
                <select
                  className={select}
                  name="categoryType"
                  onChange={handleChange}
                  value={connectionData.categoryType}
                >
                  <option value={""}>Select Category Type</option>
                  {categoryTypeData.length > 0 &&
                    categoryTypeData.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
                <label className={label}>Category Type</label>
              </div>
              <div className="relative z-0 w-full col-md-4 mb-4 group">
                <select
                  className={select}
                  name="localBodyName"
                  onChange={handleChange}
                  value={connectionData.localBodyName}
                >
                  <option value={""}>Select Local Body Name</option>
                  {localBodyNameData.length > 0 &&
                    localBodyNameData.map((local) => (
                      <option value={local} key={local}>
                        {local}
                      </option>
                    ))}
                </select>
                <label className={label}>Local Body Name</label>
              </div>
            </>
          )}
        </div>
        <button className={btn} onClick={search} disabled={loading}>
          Search
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Reset
        </button>
      </div>

      <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Book No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Load
              </th>
              <th scope="col" className="px-6 py-3">
                ST
              </th>
              <th scope="col" className="px-6 py-3">
                Metering Status
              </th>

              <th scope="col" className="px-6 py-3">
                Meter No
              </th>
              <th scope="col" className="px-6 py-3">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Add New
              </th>
            </tr>
          </thead>
          <tbody>
            {connectionList.length > 0
              ? connectionList.map((connection, index) => (
                  <tr className="bg-white border-b" key={connection._id}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{connection.bookNo}</td>
                    <td className="px-6 py-4">{connection.name}</td>
                    <td className="px-6 py-4">{connection.address}</td>
                    <td className="px-6 py-4">{connection.load}</td>
                    <td className="px-6 py-4">{connection.st}</td>
                    <td className="px-6 py-4">{connection.meterStatus}</td>
                    <td className="px-6 py-4">{connection.meterNo}</td>
                    <td className="px-6 py-4">NA</td>
                    <td className="px-6 py-4">
                      {" "}
                      <Link to={`/AddNewBill/${connection._id}`}>
                        {" "}
                        <button className={btn} style={{ width: "100px" }}>
                          Add Bill
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              : "no record"}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default BillForLocalBodies;
