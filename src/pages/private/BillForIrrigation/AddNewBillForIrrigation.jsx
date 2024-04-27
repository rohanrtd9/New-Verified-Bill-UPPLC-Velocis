import Header from "../../../component/Header";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { select, input, label, btn } from "../../../utils/tailwindClasses";
import { Link } from "react-router-dom";

function AddNewBillForIrrigation() {
  return (
    <>
      <Header
        title="Add New Bill"
        action={{
          button: "",
          path: "",
        }}
      />

      <div className="mt-8 max-w-xxl p-6 bg-gray-200 border border-gray-200 rounded-lg shadow mx-auto">
        <div className="grid md:grid-cols-4 md:gap-6">
          <div className="relative  z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className={input}
              placeholder=" "
              required
            />
            <label className={label}>Name</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>Book No</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>SC No</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Month</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="1">January</option>
              <option defaultValue="2">February</option>
              <option defaultValue="3">March</option>
              <option defaultValue="4">April</option>
              <option defaultValue="5">May</option>
              <option defaultValue="6">June</option>
              <option defaultValue="7">July</option>
              <option defaultValue="8">August</option>
              <option defaultValue="9">September</option>
              <option defaultValue="10">October</option>
              <option defaultValue="11">November</option>
              <option defaultValue="12">December</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Financial Year</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="1">2020-21</option>
              <option defaultValue="2">2021-22</option>
              <option defaultValue="3">2022-23</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>Sold Energy</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>Fixed Charge</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>Energy Charge</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>Electricity Duty</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>Miscellanious</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>Regulatory Surcharge</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>Total Amount</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="file" className={input} placeholder=" " required />
            <label className={label}>Upload Document</label>
          </div>
        </div>

        <button className={btn}>Save</button>
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
                Miscellanious
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
                Varified and Upload Varified Bill
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-200 border-b ">
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
                <Link to="/VarifyBillForIrrigation">
                  {" "}
                  <button className={btn}>Varify</button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default AddNewBillForIrrigation;
