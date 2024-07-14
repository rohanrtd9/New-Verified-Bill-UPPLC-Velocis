import { useParams } from "react-router-dom";
import Header from "../../../component/Header";
import { input, label, btn } from "../../../utils/tailwindClasses";
import { decrypt } from "../../../utils/cryptoUtils";
import axios from "axios";
import { apiUrl } from "../../../constant";
import { useUserContext } from "../../../utils/userContext";
import { useState } from "react";
import Loader from "../../../component/Loader";

function UploadConsolidatedSummary() {
  const { data } = useParams();
  const decodedData = JSON.parse(decodeURIComponent(data));
  const { verifiedAmount, billMonth, billYear, connectionIDs } = decodedData;
  const { token } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [billData, setBillData] = useState({
    verifiedAmount: verifiedAmount,
    billMonth: billMonth,
    billYear: billYear,
    connectionIDs: JSON.stringify(connectionIDs),
    verifyDocuments: null,
  });
  const uploadConsolidatedBill = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("verifiedAmount", billData.verifiedAmount);
    formData.append("billMonth", billData.billMonth);
    formData.append("billYear", billData.billYear);
    formData.append("connectionIDs", billData.connectionIDs);
    formData.append("verifyDocuments", billData.verifyDocuments);
    axios
      .put(apiUrl + "upload-consolidated-bill", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        alert(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setBillData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setBillData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <>
      {loading && <Loader />}
      <Header
        title="Bill Details"
        action={{
          button: "",
          path: "",
        }}
      />

      <div className="flex mt-4  justify-between">
        <p>Total Uploaded Bill Amount : {verifiedAmount}</p>
      </div>
      <form onSubmit={uploadConsolidatedBill}>
        <div className="mt-8 max-w-xxl p-6 border border-gray-200 rounded-lg shadow mx-auto">
          <div className="grid md:grid-cols-4 md:gap-6">
            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <input
                type="text"
                className={input}
                value={verifiedAmount}
                name="verifiedAmount"
                onChange={handleChange}
                readOnly
                placeholder=" "
                required
              />
              <label className={label}>Varified Amount</label>
            </div>

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <input
                type="file"
                className={input}
                placeholder=" "
                name="verifyDocuments"
                onChange={handleChange}
                required
              />
              <label className={label}>Upload Consolidated Bill</label>
            </div>
          </div>

          <button
            className="bg-blue-500 text-white px-10 py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
export default UploadConsolidatedSummary;
