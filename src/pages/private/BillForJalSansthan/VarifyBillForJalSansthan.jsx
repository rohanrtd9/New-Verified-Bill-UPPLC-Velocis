import Header from "../../../component/Header";
import { input, label, btn } from "../../../utils/tailwindClasses";

function VarifyBillForJalSansthan() {
  return (
    <>
      <Header
        title="Upload Varified Bill"
        action={{
          button: "",
          path: "",
        }}
      />

      <div className="mt-8 max-w-xxl p-6 border border-gray-200 rounded-lg shadow mx-auto">
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
            <label className={label}>Amount</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>Varified Amount</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>Remaining Amount</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="file" className={input} placeholder=" " required />
            <label className={label}>Upload Document</label>
          </div>
        </div>

        <button className={btn}>Submit</button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Close
        </button>
      </div>
    </>
  );
}
export default VarifyBillForJalSansthan;
