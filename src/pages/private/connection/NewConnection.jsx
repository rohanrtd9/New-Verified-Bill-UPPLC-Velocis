import { useEffect, useState } from "react";
import Header from "../../../component/Header";
import { btn, input, label, select } from "../../../utils/tailwindClasses";
import axios from "axios";
import { apiUrl } from "../../../constant";
import Loader from "../../../component/Loader";
import { useNavigate, useParams } from "react-router-dom";

function NewConnection() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [billForData, setBillForData] = useState([]);
  const [categoryTypeData, setCategoryTypeData] = useState([]);
  const [localBodyNameData, setLocalBodyNameData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [connectionData, setConnectionData] = useState({
    billFor: "",
    categoryType: "",
    localBodyName: "",
    connectionDate: "",
    bookNo: "",
    scNo: "",
    billingMode: "Online",
    acId: "",
    name: "",
    address: "",
    billingType: "RDPDRP",
    load: "",
    st: "",
    meterStatus: "Metered",
    meterNo: "",
    meterMake: "",
    mf: "",
  });
  useEffect(() => {
    getBillFor();
  }, []);
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

  const getBillFor = () => {
    axios
      .post(`${apiUrl}list-body-type`)
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
      divisionName: "EDD ANAND NAGAR",
    };
    axios
      .post(`${apiUrl}list-category`, data)
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
      bodyType: connectionData.billFor,
    };
    axios
      .post(`${apiUrl}list-body-name`, data)
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
  const formatDate = (date) => {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, "0");
    const day = dt.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const saveNewConnection = () => {
    setLoading(true);
    const formattedDate = formatDate(connectionData.connectionDate);
    const data = {
      billFor: connectionData.billFor,
      categoryType: connectionData.categoryType,
      categoryBasedName: connectionData.localBodyName,
      name: connectionData.name,
      dateOfConnection: formattedDate,
      bookNo: connectionData.bookNo,
      scNo: connectionData.scNo,
      billingMode: connectionData.billingMode,
      accountID: connectionData.acId,
      address: connectionData.address,
      billingType: connectionData.billingType,
      load: parseInt(connectionData.load),
      st: connectionData.st,
      meterStatus: connectionData.meterStatus,
      meterNo: connectionData.meterNo,
      meterMake: connectionData.meterMake,
      MF: connectionData.mf,
    };
    axios
      .post(`${apiUrl}add-connections`, data)
      .then((response) => {
        console.log("Response:", response);
        setLoading(false);
        alert("Connection Added successfully");
        navigate("/ListConnection");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConnectionData((prev) => ({ ...prev, [name]: value }));
  };
  useState(() => {
    if (id !== "add") {
      const getList = () => {
        const data = {
          billFor: "",
          localBodyName: "",
          categoryType: "",
          connectionID: id,
        };
        axios
          .post(`${apiUrl}list-connection`, data)
          .then((response) => {
            console.log("Response:", response);
            if (response?.data?.connections) {
              const {
                _id,
                billFor,
                categoryType,
                categoryBasedName,
                dateOfConnection,
                bookNo,
                scNo,
                billingMode,
                accountID,
                name,
                address,
                billingType,
                load,
                st,
                meterStatus,
                meterNo,
                meterMake,
                MF,
              } = response?.data?.connections[0];
              setConnectionData({
                billFor: billFor,
                categoryType: categoryType,
                localBodyName: categoryBasedName,
                connectionDate: new Date(dateOfConnection),
                bookNo: bookNo,
                scNo: scNo,
                billingMode: billingMode,
                acId: accountID,
                name: name,
                address: address,
                billingType: billingType,
                load: load,
                st: st,
                meterStatus: meterStatus,
                meterNo: meterNo,
                meterMake: meterMake,
                mf: MF,
              });
            }
          })
          .catch((error) => {
            console.error(
              "Error:",
              error.response ? error.response.data : error.message
            );
          });
      };
      getList();
    }
  }, [id]);

  const updateConnection = () => {
    setLoading(true);
    const formattedDate = formatDate(connectionData.connectionDate);
    const data = {
      connectionID: id,
      billFor: connectionData.billFor,
      categoryType: connectionData.categoryType,
      categoryBasedName: connectionData.localBodyName,
      name: connectionData.name,
      dateOfConnection: formattedDate,
      bookNo: connectionData.bookNo,
      scNo: connectionData.scNo,
      billingMode: connectionData.billingMode,
      accountID: connectionData.acId,
      address: connectionData.address,
      billingType: connectionData.billingType,
      load: parseInt(connectionData.load),
      st: connectionData.st,
      meterStatus: connectionData.meterStatus,
      meterNo: connectionData.meterNo,
      meterMake: connectionData.meterMake,
      MF: connectionData.mf,
    };
    axios
      .put(`${apiUrl}update-connection`, data)
      .then((response) => {
        console.log("Response:", response);

        alert("Record updated successfully.");
        setLoading(false);
        navigate("/ListConnection");
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
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
        title={id === "add" ? "New Connection" : "Update Connection"}
        action={{
          button: "View",
          path: "/ListConnection",
        }}
      />

      <div className="mt-8 max-w-xxl p-6 border border-gray-200 rounded-lg shadow mx-auto">
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
                  <option key={bill} value={bill}>
                    {bill}
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
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="date"
              name="connectionDate"
              onChange={handleChange}
              value={formatDate(connectionData.connectionDate)}
              className={input}
              required
              placeholder=" "
            />
            <label className={label}>Date Of Connection</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="bookNo"
              onChange={handleChange}
              value={connectionData.bookNo}
              className={input}
              required
              placeholder=" "
            />
            <label className={label}>Book No</label>
          </div>
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="scNo"
              onChange={handleChange}
              value={connectionData.scNo}
              className={input}
              required
              placeholder=" "
            />
            <label className={label}>SC No</label>
          </div>

          <div className="relative z-0 w-full col-md-8 mb-4 group">
            <p>Billing Mode</p>
            <div className="w-100 flex">
              <div className="w-1/2">
                <input
                  type="radio"
                  onChange={handleChange}
                  value="Online"
                  placeholder=" "
                  checked={connectionData.billingMode === "Online"}
                  name="billingMode"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Online
                </label>
              </div>
              <div className="w-1/2">
                <input
                  id="inline-2-radio"
                  type="radio"
                  onChange={handleChange}
                  value="Offline"
                  placeholder=" "
                  name="billingMode"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Offline
                </label>
              </div>
            </div>
          </div>

          {connectionData.billingMode === "Online" && (
            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <input
                type="text"
                name="acId"
                onChange={handleChange}
                value={connectionData.acId}
                className={input}
                required
                placeholder=" "
              />
              <label className={label}>Account ID</label>
            </div>
          )}

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={connectionData.name}
              className={input}
              placeholder=" "
              required
            />
            <label className={label}>Name</label>
          </div>
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={connectionData.address}
              className={input}
              required
              placeholder=" "
            />
            <label className={label}>Address</label>
          </div>
          <div className="relative z-0 w-full col-md-8 mb-4 group">
            <p>Billing Type</p>
            <div className="w-100 flex">
              <div className="w-1/2">
                <input
                  type="radio"
                  onChange={handleChange}
                  value="RDPDRP"
                  placeholder=" "
                  checked={connectionData.billingType === "RDPDRP"}
                  name="billingType"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  RDPDRP
                </label>
              </div>
              <div className="w-1/2">
                <input
                  id="inline-2-radio"
                  type="radio"
                  onChange={handleChange}
                  value="Non-RDPDRP"
                  placeholder=" "
                  checked={connectionData.billingType === "Non-RDPDRP"}
                  name="billingType"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Non-RDPDRP
                </label>
              </div>
            </div>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="number"
              name="load"
              onChange={handleChange}
              value={connectionData.load}
              className={input}
              placeholder=" "
              required
            />
            <label className={label}>Load (watt)</label>
          </div>
          <div className="relative z-0 w-full col-md-8 mb-4 group ">
            <p>Meter Status</p>
            <div className="w-100 flex">
              <div className="w-1/2">
                <input
                  type="radio"
                  onChange={handleChange}
                  value="Metered"
                  placeholder=" "
                  checked={connectionData.meterStatus === "Metered"}
                  name="meterStatus"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Metered
                </label>
              </div>
              <div className="w-1/2">
                <input
                  id="inline-2-radio"
                  type="radio"
                  onChange={handleChange}
                  value="Un-Metered"
                  checked={connectionData.meterStatus === "Un-Metered"}
                  placeholder=" "
                  name="meterStatus"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Un-Metered
                </label>
              </div>
            </div>
          </div>
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="st"
              className={input}
              onChange={handleChange}
              value={connectionData.st}
              placeholder=" "
              required
            />
            <label className={label}>ST</label>
          </div>
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="meterNo"
              onChange={handleChange}
              value={connectionData.meterNo}
              className={input}
              placeholder=" "
              required
            />
            <label className={label}>Meter Number</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="meterMake"
              onChange={handleChange}
              value={connectionData.meterMake}
              className={input}
              placeholder=" "
              required
            />
            <label className={label}>Meter Make</label>
          </div>
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="mf"
              onChange={handleChange}
              className={input}
              value={connectionData.mf}
              placeholder=" "
              required
            />
            <label className={label}>MF</label>
          </div>
        </div>
        <button
          className={btn}
          onClick={id === "add" ? saveNewConnection : updateConnection}
        >
          {id === "add" ? "Submit" : "Update"}
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Reset
        </button>
      </div>
    </>
  );
}
export default NewConnection;
