import Header from "../../../component/Header";
import { select, label, btn } from "../../../utils/tailwindClasses";
import Loader from "../../../component/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../constant";
import { useUserContext } from "../../../utils/userContext";
import { encrypt } from "../../../utils/cryptoUtils";
import { useNavigate } from "react-router-dom";

function AddConsolidatedSummary() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token } = useUserContext();
  const [discomList, setDiscomList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [circleList, setCircleList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [billForData, setBillForData] = useState([]);
  const [categoryTypeData, setCategoryTypeData] = useState([]);
  const [localBodyNameData, setLocalBodyNameData] = useState([]);
  const [result, setResult] = useState([]);
  const [uploadData, setUploadData] = useState({
    verifiedAmount: 105,
    billMonth: "",
    billYear: "",
    connectionIDs: [],
  });
  const [verifiedAmt, setVerifiedAmt] = useState("");
  const [summaryData, setSummaryData] = useState({
    discom: "",
    zone: "",
    circle: "",
    division: "",
    department: "",
    billFor: "",
    category: "",
    localBodyName: "",
    month: "",
    year: "",
  });
  useEffect(() => {
    if (token !== "") {
      getDiscom();
      getBillFor();
    }
  }, [token]);

  useEffect(() => {
    if (summaryData.discom !== "") {
      getZone();
      setCircleList([]);
      setDivisionList([]);
      setDepartmentList([]);
      setSummaryData((prev) => ({
        ...prev,
        zone: "",
        circle: "",
        division: "",
        department: "",
      }));
    }
  }, [summaryData.discom]);

  useEffect(() => {
    if (summaryData.zone !== "") {
      getCircle();
      setDivisionList([]);
      setDepartmentList([]);
      setSummaryData((prev) => ({
        ...prev,
        circle: "",
        division: "",
        department: "",
      }));
    }
  }, [summaryData.zone]);

  useEffect(() => {
    if (summaryData.circle !== "") {
      getDivision();
      setDepartmentList([]);
      setSummaryData((prev) => ({
        ...prev,
        department: "",
      }));
    }
  }, [summaryData.circle]);
  useEffect(() => {
    if (summaryData.division !== "") {
      getDepartment();
    }
  }, [summaryData.division]);

  const getDiscom = () => {
    setLoading(true);
    axios
      .post(apiUrl + "list-discom", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setDiscomList(response.data.records);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const getZone = () => {
    setLoading(true);
    const data = {
      discom_id: summaryData.discom,
    };
    axios
      .post(apiUrl + "list-zones", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setZoneList(response.data.records);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const getCircle = () => {
    setLoading(true);
    const data = {
      ZONE_ID: summaryData.zone,
    };
    axios
      .post(apiUrl + "list-circles", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setCircleList(response.data.records);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const getDivision = () => {
    setLoading(true);
    const data = {
      CIRCLE_ID: summaryData.circle,
    };
    axios
      .post(apiUrl + "list-division", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setDivisionList(response.data.records);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const getDepartment = () => {
    setLoading(true);
    const data = {
      DIVISION_ID: summaryData.division,
    };
    axios
      .post(apiUrl + "list-sub-division", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setDepartmentList(response.data.records);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSummaryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const searchSummary = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      discom: summaryData.discom,
      zone: summaryData.zone,
      circle: summaryData.circle,
      division: summaryData.division,
      billFor: summaryData.billFor,
      categoryType: summaryData.category,
      subCategoryType: summaryData.localBodyName,
      month: parseInt(summaryData.month),
      year: parseInt(summaryData.year),
    };
    axios
      .post(apiUrl + "list-consolidated-bill", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setResult(response.data.result);
        setVerifiedAmt(response.data.totalVerifiedAmount);
        setUploadData((prev) => ({
          ...prev,
          verifiedAmount: response?.data?.totalVerifiedAmount,
          connectionIDs: response?.data?.result.map(
            (connection) => connection.connectionID
          ),
        }));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
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
      billFor: summaryData.billFor,
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
  useEffect(() => {
    if (summaryData.category !== "") {
      getLocalBodyName();
    }
  }, [summaryData.category]);

  useEffect(() => {
    if (summaryData.billFor !== "") {
      getCtegoryType();
    }
  }, [summaryData.billFor]);

  const getLocalBodyName = () => {
    const data = {
      categoryType: summaryData.category,
      billFor: summaryData.billFor,
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
  const redirectToUpload = () => {
    const encodedData = encodeURIComponent(JSON.stringify(uploadData));
    console.log(encodedData);
    //const url = encrypt(encodedData);
    navigate(`/UploadConsolidatedSummary/${encodedData}`);
  };
  return (
    <>
      {loading && <Loader />}
      <Header
        title="Search Monthly Bill Report For Consolidation Summary"
        action={{
          button: "",
          path: "",
        }}
      />
      <form onSubmit={searchSummary}>
        <div className="mt-8 max-w-xxl p-6 border border-gray-200 rounded-lg shadow mx-auto">
          <div className="grid md:grid-cols-4 md:gap-6">
            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label className={label}>Discom</label>
              <select className={select} onChange={handleChange} name="discom">
                <option value="">--Select--</option>

                {discomList.length > 0 &&
                  discomList.map((discom) => (
                    <option key={discom._id} value={discom._id}>
                      {discom.DISCOM_NAME}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label className={label}>Zone</label>
              <select className={select} onChange={handleChange} name="zone">
                <option value="">--Select--</option>
                {zoneList.length > 0 &&
                  zoneList.map((zone) => (
                    <option key={zone.zoneID} value={zone.zoneID}>
                      {zone.zones}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label className={label}>Circle</label>
              <select className={select} onChange={handleChange} name="circle">
                <option value="">--Select--</option>
                {circleList.length > 0 &&
                  circleList.map((circle) => (
                    <option key={circle.circleID} value={circle.circleID}>
                      {circle.circle}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label className={label}>Division</label>
              <select
                className={select}
                onChange={handleChange}
                name="division"
              >
                <option defaultValue="">--Select--</option>
                {divisionList.length > 0 &&
                  divisionList.map((division) => (
                    <option
                      key={division.divisionID}
                      value={division.divisionID}
                    >
                      {division.division}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label className={label}>Department</label>
              <select
                className={select}
                onChange={handleChange}
                name="department"
              >
                <option defaultValue="">--Select--</option>
                {departmentList.length > 0 &&
                  departmentList.map((department) => (
                    <option
                      key={department.subDivisionID}
                      value={department.subDivisionID}
                    >
                      {department.subDivision}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label className={label}>Bill For</label>
              <select className={select} onChange={handleChange} name="billFor">
                <option defaultValue="">--Select--</option>
                {billForData.length > 0 &&
                  billForData.map((bill) => (
                    <option key={bill._id} value={bill.billFor}>
                      {bill.billFor}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label className={label}>Category Type</label>
              <select
                className={select}
                onChange={handleChange}
                name="category"
              >
                <option defaultValue="">--Select--</option>
                {categoryTypeData.length > 0 &&
                  categoryTypeData.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>
            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <select
                className={select}
                name="localBodyName"
                onChange={handleChange}
                value={summaryData.localBodyName}
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
            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label className={label}>Month</label>
              <select className={select} onChange={handleChange} name="month">
                <option value="">--Select--</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label className={label}>Financial Year</label>
              <select className={select} onChange={handleChange} name="year">
                <option value="">--Select--</option>
                <option value="2021">2020-21</option>
                <option value="2022">2021-22</option>
                <option value="2023">2022-23</option>
                <option value="2024">2023-24</option>
              </select>
            </div>
          </div>

          <button
            className="bg-blue-500 text-white px-5 py-1 hover:bg-blue-600 rounded me-3"
            type="submit"
          >
            Search
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-5 py-1 hover:bg-red-600 rounded"
          >
            Reset
          </button>
        </div>
      </form>
      <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                New Connection ID
              </th>
              <th scope="col" className="px-6 py-3">
                Load
              </th>
              <th scope="col" className="px-6 py-3">
                Energy Consumption
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {result.length > 0 ? (
              result.map((summary, index) => (
                <tr className="border-b" key={summary.connectionID}>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{summary.connection.name}</td>
                  <td className="p-3">{summary.connection.accountID}</td>
                  <td className="p-3">{summary.totalLoad}</td>
                  <td className="p-3">NA</td>
                  <td className="p-3">{summary.totalVerifiedAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-5 border-t" colSpan={6} align="center">
                  No record found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex mt-4  justify-between">
        <p>Consolidated Varified Amount : {verifiedAmt}</p>{" "}
        {/* <Link to="/UploadConsolidatedSummary">
          <button className={btn} onClick={redirectToUpload}>
            Upload Consolidated Bill
          </button>
        </Link> */}
        <button className={btn} onClick={redirectToUpload}>
          Upload Consolidated Bill
        </button>
      </div>
    </>
  );
}
export default AddConsolidatedSummary;
