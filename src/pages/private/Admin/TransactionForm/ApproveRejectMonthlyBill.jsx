import Header from "../../../../component/Header";
import { select, input, label, btn } from "../../../../utils/tailwindClasses";
import React, { useState } from "react";

function ApproveRejectMonthlyBill() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <Header
        title="Approve/Reject Monthly Bill"
        action={{
          button: "",
          path: "",
        }}
      />

      <div
        className="mt-8 max-w-xxl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto"
      >
        <div className="grid md:grid-cols-4 md:gap-6">
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Monthly Bill For</label>
            <select id="monthlyBillFor" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="Local Bodies">Local Bodies</option>
              <option defaultValue="Irrigation">Irrigation</option>
              <option defaultValue="River Pollution Control Unit Master">
                River Pollution Control Unit Master
              </option>
              <option defaultValue="Jal Sansthan">Jal Sansthan</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Financial Year</label>
            <select id="financialYear" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="2020-2021">2020-2021</option>
              <option defaultValue="2022-2023">2022-2023</option>
              <option defaultValue="2023-2024">2023-2024</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Discom</label>
            <select id="discom" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="KESCO">KESCO</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Zone</label>
            <select id="zone" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="KESCO">KESCO</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Circle</label>
            <select id="circle" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="Circle-1">Circle-1</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Division</label>
            <select id="division" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="All">All</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Bill Type</label>
            <select id="billType" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="All">All</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Bill For</label>
            <select id="billFor" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="All">All</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Category Type</label>
            <select id="categoryType" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="All">All</option>
            </select>
          </div>
        </div>

        <button className={btn}>Search </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Reset
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
                Discom
              </th>
              <th scope="col" className="px-6 py-3">
                Zone
              </th>
              <th scope="col" className="px-6 py-3">
                Circle
              </th>
              <th scope="col" className="px-6 py-3">
                Division
              </th>
              <th scope="col" className="px-6 py-3">
                Bill Type
              </th>
              <th scope="col" className="px-6 py-3">
                Bill For
              </th>
              <th scope="col" className="px-6 py-3">
                Category Type
              </th>
              <th scope="col" className="px-6 py-3">
                4/23
              </th>
              <th scope="col" className="px-6 py-3">
                5/23
              </th>
              <th scope="col" className="px-6 py-3">
                6/23
              </th>
              <th scope="col" className="px-6 py-3">
                7/23
              </th>
              <th scope="col" className="px-6 py-3">
                8/23
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </td>
              <td className="px-6 py-4">KESCO</td>
              <td className="px-6 py-4">KESCO</td>
              <td className="px-6 py-4">CIRCLE-1</td>
              <td className="px-6 py-4">ALOO MANDI</td>
              <td className="px-6 py-4">MAGAR NIGAM</td>
              <td className="px-6 py-4">MARG PRAKASH</td>
              <td className="px-6 py-4">KANPUR</td>
              <td className="px-6 py-4" onClick={togglePopup}>
                1048320.00
              </td>
              <td
                className="px-6 py-4"
                style={{ color: "green" }}
                onClick={togglePopup}
              >
                1048320.00
              </td>
              <td
                className="px-6 py-4"
                style={{ color: "green" }}
                onClick={togglePopup}
              >
                1048320.00
              </td>
              <td
                className="px-6 py-4"
                style={{ color: "green" }}
                onClick={togglePopup}
              >
                1048320.00
              </td>
              <td
                className="px-6 py-4"
                style={{ color: "green" }}
                onClick={togglePopup}
              >
                1048320.00
              </td>
            </tr>
          </tbody>
        </table>
        {isPopupOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ width: "-webkit-fill-available" }}
          >
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={togglePopup}
            ></div>
            <div
              style={{ width: "-webkit-fill-available" }}
              className="relative p-4 max-w-3xl mx-auto bg-white rounded shadow-lg z-50"
            >
              <button
                className="close-btn absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={togglePopup}
              >
                &times;
              </button>
              <h2 className="text-lg font-bold mb-4">Bill Details</h2>
              <div>
                <p>Verified Amount: 1048320.00</p>
                <p>
                  Bill <a href="/path/to/download">Download</a>
                </p>
              </div>
              <div className="my-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex items-center">
                  <input
                    id="rejected"
                    type="radio"
                    name="status"
                    value="rejected"
                    className="mr-2"
                  />
                  <label htmlFor="rejected" className="mr-4">
                    Rejected
                  </label>
                  <input
                    id="checked-verified"
                    type="radio"
                    name="status"
                    value="checked-verified"
                    className="mr-2"
                  />
                  <label htmlFor="checked-verified">Checked and Verified</label>
                </div>
              </div>
              <div className="my-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                ></textarea>
              </div>
              <button className={btn}>Save </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ApproveRejectMonthlyBill;
