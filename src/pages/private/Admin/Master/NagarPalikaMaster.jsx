import Header from "../../../../component/Header";
import { select, input, label, btn } from "../../../../utils/tailwindClasses";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

function NagarPalikaMaster() {
  return (
    <>
      <Header
        title="Nagar Palika Master"
        action={{
          button: "",
          path: "",
        }}
      />

      <div
        className="mt-8 max-w-xxl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto"
      >
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Division Name</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="EUDD I Aligarh">EUDD I Aligarh</option>
              <option defaultValue="EUDD II Aligarh">EUDD II Aligarh</option>
              <option defaultValue="EUDD III Aligarh">EUDD III Aligarh</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Category Type</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="Marg Prakash">Marg Prakash</option>
              <option defaultValue="Jalkal">Jalkal</option>
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Nagar Palika Name</label>
            <select id="countries" className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="Aligarh">Aligarh</option>
              <option defaultValue="Agra">Agra</option>
              <option defaultValue="Allahabad">Allahabad</option>
            </select>
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
                Category Type
              </th>
              <th scope="col" className="px-6 py-3">
                Nagar Palika Name
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
              <td className="px-6 py-4">EUDD I Aligarh</td>
              <td className="px-6 py-4">Marg Prakash</td>
              <td className="px-6 py-4">Allahabad</td>
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
              <td className="px-6 py-4">EUDD II Aligarh</td>
              <td className="px-6 py-4">Marg Prakash</td>
              <td className="px-6 py-4">Agra</td>
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
export default NagarPalikaMaster;
