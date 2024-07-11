import Header from "../../../component/Header";
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";
import { select, input, label, btn } from "../../../utils/tailwindClasses";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../constant";
import { useUserContext } from "../../../utils/userContext";
import Loader from "../../../component/Loader";

function AddNewBill() {
  const { id, name, bookNo, scNo } = useParams();
  console.log("id: ", id);
  const { token } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [billList, setBillList] = useState([]);
  const [mode, setMode] = useState("add");
  const [billData, setBillData] = useState({
    name: name.replace("-", " "),
    bookNo: bookNo,
    scNo: scNo,
    month: "",
    financialYear: "",
    soldEnergy: "",
    fixedCharge: "",
    energyCharge: "",
    electricityDuty: "",
    miscellaneous: "",
    regulatorySurcharge: "",
    totalAmount: "",
    docFile: null,
    billId: "",
    selectedFile: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("xxxx");
  }, [mode]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setBillData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setBillData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const saveBill = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("connectionID", id);
    formData.append("month", billData.month);
    formData.append("year", billData.financialYear);
    formData.append("soldEnergy", billData.soldEnergy);
    formData.append("fixedCharge", billData.fixedCharge);
    formData.append("energyCharge", billData.energyCharge);
    formData.append("electricityDuty", billData.electricityDuty);
    formData.append("miscellaneous", billData.miscellaneous);
    formData.append("regulatorySurcharge", billData.regulatorySurcharge);
    formData.append("totalAmount", billData.totalAmount);
    formData.append("documents", billData.docFile);
    console.log(billData.docFile);
    axios
      .post(apiUrl + "add-bill", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        alert("Bill Added Successfully.");
        getBill();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        // Handle error, e.g., show an error message
      });
  };
  useEffect(() => {
    getBill();
  }, []);
  const getBill = () => {
    setLoading(true);
    const data = {
      connectionID: id,
      BillID: "",
    };
    axios
      .post(`${apiUrl}list-bill`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        console.log("Response:", response);
        if (response?.data?.connectionBills) {
          setBillList(response?.data?.connectionBills);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const deleteBill = (billId) => {
    setLoading(true);
    const data = {
      billID: billId,
    };
    axios
      .delete(`${apiUrl}delete-bill`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data,
      })
      .then((response) => {
        console.log("Response:", response);
        alert("Bill deleted successfully.");
        setLoading(false);
        getBill();
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const downloadAttachment = (docs) => {
    for (let i = 0; i < docs.length; i++) {
      const link = document.createElement("a");
      link.href = docs[i].documentURL;
      link.setAttribute("download", docs[i].documentName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const updateBill = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("connectionID", id);
    formData.append("month", billData.month);
    formData.append("year", billData.financialYear);
    formData.append("soldEnergy", billData.soldEnergy);
    formData.append("fixedCharge", billData.fixedCharge);
    formData.append("energyCharge", billData.energyCharge);
    formData.append("electricityDuty", billData.electricityDuty);
    formData.append("miscellaneous", billData.miscellaneous);
    formData.append("regulatorySurcharge", billData.regulatorySurcharge);
    formData.append("totalAmount", billData.totalAmount);
    formData.append("documents", billData.docFile);
    formData.append("billID", billData.billId);
    console.log(billData.docFile);
    axios
      .put(apiUrl + "update-bill", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        alert("Bill Updated Successfully.");
        setBillData(() => ({
          ...billData,
          month: "",
          financialYear: "",
          soldEnergy: "",
          fixedCharge: "",
          energyCharge: "",
          electricityDuty: "",
          miscellaneous: "",
          regulatorySurcharge: "",
          totalAmount: "",
          docFile: null,
          billId: "",
          selectedFile: [],
        }));
        setMode("add");
        setLoading(false);
        getBill();
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        // Handle error, e.g., show an error message
      });
  };
  return (
    <>
      {loading && <Loader />}
      <Header
        title={mode === "add" ? "Add New Bill" : "Update Bill"}
        action={{
          button: "",
          path: "",
        }}
      />

      <div className="mt-8 max-w-xxl p-6 border border-gray-200 rounded-lg shadow mx-auto">
        <div className="grid md:grid-cols-4 md:gap-6">
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              className={input}
              placeholder=" "
              required
              value={billData.name}
              readOnly
            />
            <label className={label}>Name</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              className={input}
              placeholder=" "
              required
              value={billData.bookNo}
              readOnly
            />
            <label className={label}>Book No</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              className={input}
              placeholder=" "
              required
              value={billData.scNo}
              readOnly
            />
            <label className={label}>SC No</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Month</label>
            <select
              name="month"
              className={select}
              required
              value={billData.month}
              onChange={handleChange}
            >
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
            <select
              name="financialYear"
              className={select}
              required
              value={billData.financialYear}
              onChange={handleChange}
            >
              <option value="">--Select--</option>
              <option value="2021">2020-21</option>
              <option value="2022">2021-22</option>
              <option value="2023">2022-23</option>
              <option value="2024">2023-24</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="soldEnergy"
              className={input}
              placeholder=" "
              required
              value={billData.soldEnergy}
              onChange={handleChange}
            />
            <label className={label}>Sold Energy</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="fixedCharge"
              className={input}
              placeholder=" "
              required
              value={billData.fixedCharge}
              onChange={handleChange}
            />
            <label className={label}>Fixed Charge</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="energyCharge"
              className={input}
              placeholder=" "
              required
              value={billData.energyCharge}
              onChange={handleChange}
            />
            <label className={label}>Energy Charge</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="electricityDuty"
              className={input}
              placeholder=" "
              required
              value={billData.electricityDuty}
              onChange={handleChange}
            />
            <label className={label}>Electricity Duty</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="miscellaneous"
              className={input}
              placeholder=" "
              required
              value={billData.miscellaneous}
              onChange={handleChange}
            />
            <label className={label}>Miscellaneous</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="regulatorySurcharge"
              className={input}
              placeholder=" "
              required
              value={billData.regulatorySurcharge}
              onChange={handleChange}
            />
            <label className={label}>Regulatory Surcharge</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="totalAmount"
              className={input}
              placeholder=" "
              required
              value={billData.totalAmount}
              onChange={handleChange}
            />
            <label className={label}>Total Amount</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="file"
              name="docFile"
              className={input}
              placeholder=" "
              required
              onChange={handleChange}
            />
            {mode === "edit" &&
              billData.selectedFile.length > 0 &&
              billData.selectedFile.map((file) => (
                <p key={file._id}>{file.documentName}</p>
              ))}
            <label className={label}>Upload Document</label>
          </div>
        </div>

        <button
          className={btn}
          onClick={mode === "add" ? saveBill : updateBill}
        >
          {mode === "add" ? "Save" : "Update"}
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Close
        </button>
      </div>

      <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50 border border-gray-200">
            <tr>
              <th className="p-3 border-b border-gray-200">S.No.</th>
              <th className="p-3 border-b border-gray-200">Year</th>
              <th className="p-3 border-b border-gray-200">Month</th>
              <th className="p-3 border-b border-gray-200 whitespace-nowrap">
                Sold Energy
              </th>
              <th className="p-3 border-b border-gray-200 whitespace-nowrap">
                Fixed Charge
              </th>
              <th className="p-3 border-b border-gray-200 whitespace-nowrap">
                Energy Charge
              </th>
              <th className="p-3 border-b border-gray-200 whitespace-nowrap">
                Electricity Duty
              </th>
              <th className="p-3 border-b border-gray-200 whitespace-nowrap">
                Miscellaneous
              </th>
              <th className="p-3 border-b border-gray-200 whitespace-nowrap">
                Regulatory Surcharge
              </th>
              <th className="p-3 border-b border-gray-200">Attachment</th>
              <th className="p-3 border-b border-gray-200">Action</th>
              <th className="p-3 border-b border-gray-200 whitespace-nowrap">
                Verified and Upload Verified Bill
              </th>
            </tr>
          </thead>
          <tbody>
            {billList.length > 0 ? (
              billList.map((bill, index) => (
                <tr key={bill._id}>
                  <td className="p-3 border-b border-gray-200">{index + 1}</td>
                  <td className="p-3 border-b border-gray-200">{bill.year}</td>
                  <td className="p-3 border-b border-gray-200">{bill.month}</td>
                  <td className="p-3 border-b border-gray-200">
                    {bill.soldEnergy}
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    {bill.fixedCharge}
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    {bill.energyCharge}
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    {bill.electricityDuty}
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    {bill.miscellaneous}
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    {bill.regulatorySurcharge}
                  </td>
                  <td className="p-3 border-b border-gray-200">
                    <button
                      className="bg-blue-500 text-white px-3 p-2 rounded ms-2 flex"
                      onClick={() => downloadAttachment(bill.documents)}
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="P-3 pt-3 border-b border-gray-200 flex">
                    <button
                      className="bg-red-500 text-white px-4 p-2 rounded"
                      onClick={() => deleteBill(bill._id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 p-2 rounded ms-2"
                      onClick={() => {
                        setMode("edit");
                        setBillData(() => ({
                          ...billData,
                          month: bill.month,
                          financialYear: bill.year,
                          soldEnergy: bill.soldEnergy,
                          fixedCharge: bill.fixedCharge,
                          energyCharge: bill.energyCharge,
                          electricityDuty: bill.electricityDuty,
                          miscellaneous: bill.miscellaneous,
                          regulatorySurcharge: bill.regulatorySurcharge,
                          totalAmount: bill.totalAmount,
                          docFile: "",
                          billId: bill._id,
                          selectedFile: bill.documents,
                        }));
                      }}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="P-3" align="center">
                    <Link to="/VarifyBill">
                      <button className="bg-blue-500 text-white px-5 p-2 rounded">
                        Verify
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} align="center">
                  No record found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default AddNewBill;
