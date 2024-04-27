import Header from "../../../../component/Header";
import { select, input, label, btn } from "../../../../utils/tailwindClasses";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

function StateTubeWellMaster() {
  return (
    <>
      <Header
        title="State Tube Well Master"
        action={{
          button: "",
          path: "",
        }}
      />

      <div
        className="mt-8 max-w-xxl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto"
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Division Name</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="Alambagh">Alambagh</option>
              <option defaultValue="Aliganj">Aliganj</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>State Tube Well Name</label>
            <input type="text" className={input} placeholder=" " required />
          </div>
        </div>

        <button className={btn}>Save</button>
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
                Division Name
              </th>
              <th scope="col" className="px-6 py-3">
                State Tube Well Name
              </th>

              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delate
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
              <td className="px-6 py-4">Alambagh</td>
              <td className="px-6 py-4">Kanpur</td>
              <td className="px-6 py-4">
                <PencilSquareIcon className="h-5 w-5 ms-2" />
              </td>
              <td className="px-6 py-4">
                <TrashIcon className="h-5 w-5" />{" "}
              </td>
            </tr>

            <tr className="bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                2
              </td>
              <td className="px-6 py-4">Aliganj</td>
              <td className="px-6 py-4">Kanpur</td>
              <td className="px-6 py-4">
                <PencilSquareIcon className="h-5 w-5 ms-2" />
              </td>
              <td className="px-6 py-4">
                <TrashIcon className="h-5 w-5" />{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default StateTubeWellMaster;
