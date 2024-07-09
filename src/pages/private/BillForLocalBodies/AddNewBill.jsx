import Header from "../../../component/Header";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { select, input, label, btn } from "../../../utils/tailwindClasses";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../constant";
import { useUserContext } from "../../../utils/userContext";

function AddNewBill() {
  const { id } = useParams();
  console.log("id: ", id);
  const { token } = useUserContext();
  const [billData, setBillData] = useState({
    name: "",
    bookNo: "",
    scNo: "",
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
  });

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
    console.log(token);
    axios
      .post(apiUrl + "add-bill", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        // Handle success, e.g., clear the form or show a success message
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        // Handle error, e.g., show an error message
      });
  };

  return (
    <>
      <Header
        title="Add New Bill"
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
              name="name"
              className={input}
              placeholder=" "
              required
              value={billData.name}
              onChange={handleChange}
            />
            <label className={label}>Name</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="bookNo"
              className={input}
              placeholder=" "
              required
              value={billData.bookNo}
              onChange={handleChange}
            />
            <label className={label}>Book No</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="scNo"
              className={input}
              placeholder=" "
              required
              value={billData.scNo}
              onChange={handleChange}
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
            <label className={label}>Upload Document</label>
          </div>
        </div>

        <button className={btn} onClick={saveBill}>
          Save
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Close
        </button>
      </div>

      <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Year
              </th>
              <th scope="col" className="px-6 py-3">
                Month
              </th>
              <th scope="col" className="px-6 py-3">
                Sold Energy
              </th>
              <th scope="col" className="px-6 py-3">
                Fixed Charge
              </th>
              <th scope="col" className="px-6 py-3">
                Energy Charge
              </th>
              <th scope="col" className="px-6 py-3">
                Electricity Duty
              </th>

              <th scope="col" className="px-6 py-3">
                Miscellaneous
              </th>
              <th scope="col" className="px-6 py-3">
                Regulatory Surcharge
              </th>
              <th scope="col" className="px-6 py-3">
                Attachment
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Verified and Upload Verified Bill
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b ">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </td>
              <td className="px-6 py-4">678</td>
              <td className="px-6 py-4">5654</td>
              <td className="px-6 py-4">UPPCL</td>
              <td className="px-6 py-4">Lucknow</td>
              <td className="px-6 py-4">678.67</td>
              <td className="px-6 py-4">678.67</td>
              <td className="px-6 py-4">678.67</td>
              <td className="px-6 py-4">678.67</td>
              <td className="px-6 py-4">
                {" "}
                <button className={btn}>Download</button>
              </td>
              <td className="px-6 py-4 flex">
                <TrashIcon className="h-5 w-5" />{" "}
                <PencilSquareIcon className="h-5 w-5 ms-2" />
              </td>
              <td className="px-6 py-4">
                {" "}
                <Link to="/VarifyBill">
                  {" "}
                  <button className={btn}>Verify</button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default AddNewBill;
