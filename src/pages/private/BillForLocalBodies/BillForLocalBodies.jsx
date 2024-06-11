import Header from "../../../component/Header";
import { select, input, label, btn } from "../../../utils/tailwindClasses";
import { Link } from "react-router-dom";

function BillForLocalBodies() {
  return (
    <>
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
      </div>

      <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">
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
                <Link to="/AddNewBill">
                  {" "}
                  <button className={btn} style={{ width: "100px" }}>
                    Add Bill
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default BillForLocalBodies;
