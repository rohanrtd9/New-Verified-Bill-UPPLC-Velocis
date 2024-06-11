import Header from "../../../component/Header";
import { select, label, btn } from "../../../utils/tailwindClasses";
import { Link } from "react-router-dom";

function AddConsolidatedSummary() {
  return (
    <>
      <Header
        title="Search Monthly Bill Report For Consolidation Summary"
        action={{
          button: "",
          path: "",
        }}
      />

      <div className="mt-8 max-w-xxl p-6 border border-gray-200 rounded-lg shadow mx-auto">
        <div className="grid md:grid-cols-4 md:gap-6">
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Discom</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="1">Uttaranchal</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Zone</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="1">Kanpur</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Circle</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="1">EDC Kanpur</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Division</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="1">EDC Kanpur</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Department</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="1">Nagar Nigam</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Bill For</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="1">Kanpur</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Category Type</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="1">Jalkal</option>
            </select>
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
        </div>

        <button className={btn}>Search</button>
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
            <tr className="border-b">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </td>
              <td className="px-6 py-4">Divyanshi</td>
              <td className="px-6 py-4">9</td>
              <td className="px-6 py-4">664</td>
              <td className="px-6 py-4">546464</td>
              <td className="px-6 py-4">50367.67</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex mt-4  justify-between">
        <p>Consolidated Varified Amount : 50367.67</p>{" "}
        <Link to="/UploadConsolidatedSummary">
          {" "}
          <button className={btn}>Upload Consolidated Bill</button>
        </Link>
      </div>
    </>
  );
}
export default AddConsolidatedSummary;
