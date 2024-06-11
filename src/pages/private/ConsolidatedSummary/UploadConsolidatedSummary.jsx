import Header from "../../../component/Header";
import { input, label, btn } from "../../../utils/tailwindClasses";

function UploadConsolidatedSummary() {
  return (
    <>
      <Header
        title="Bill Details"
        action={{
          button: "",
          path: "",
        }}
      />

      <div className="flex mt-4  justify-between">
        <p>Total Uploaded Bill Amount : 50367.67</p>
      </div>
      <div className="mt-8 max-w-xxl p-6 border border-gray-200 rounded-lg shadow mx-auto">
        <div className="grid md:grid-cols-4 md:gap-6">
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="text" className={input} placeholder=" " required />
            <label className={label}>Varified Amount</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input type="file" className={input} placeholder=" " required />
            <label className={label}>Upload Consolidated Bill</label>
          </div>
        </div>

        <button className={btn}>Save</button>
      </div>
    </>
  );
}
export default UploadConsolidatedSummary;
