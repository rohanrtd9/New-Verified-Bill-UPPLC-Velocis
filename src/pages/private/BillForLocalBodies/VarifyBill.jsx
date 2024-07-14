import { useEffect, useState } from "react";
import Header from "../../../component/Header";
import { input, label, btn } from "../../../utils/tailwindClasses";
import { useNavigate, useParams } from "react-router-dom";
import { decrypt } from "../../../utils/cryptoUtils";
import axios from "axios";
import { apiUrl } from "../../../constant";
import { useUserContext } from "../../../utils/userContext";

function VarifyBill() {
  const { amount, billId } = useParams();
  const navigate = useNavigate();
  const { token } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [verifyData, setVerifyData] = useState({
    totalAmount: "",
    verifyAmount: "",
    remainingAmount: "",
    verifyDoc: null,
  });
  console.log(verifyData);
  useEffect(() => {
    let jsonString = decodeURIComponent(amount);
    jsonString = decrypt(jsonString);
    try {
      const jsonData = JSON.parse(jsonString);
      console.log("Valid JSON:", jsonData);
      setVerifyData((prev) => ({
        ...prev,
        totalAmount: jsonData,
      }));
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setVerifyData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      if (name === "verifyAmount") {
        if (value !== "") {
          setVerifyData((prevData) => ({
            ...prevData,
            remainingAmount: parseInt(verifyData.totalAmount) - parseInt(value),
            [name]: value,
          }));
        } else {
          console.log("in blank");
          setVerifyData((prevData) => ({
            ...prevData,
            remainingAmount: "",
            [name]: value,
          }));
        }
      }
    }
  };
  const verifyBill = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("verifiedAmount", verifyData.verifyAmount);
    formData.append("billID", billId);
    formData.append("verifyDocuments", verifyData.verifyDoc);
    axios
      .put(apiUrl + "uplod-verify-bill", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        alert(response.data.message);
        navigate(-1);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
        title="Upload Verified Bill"
        action={{
          button: "",
          path: "",
        }}
      />
      <form onSubmit={verifyBill}>
        <div className="mt-8 max-w-xxl p-6  border border-gray-200 rounded-lg shadow mx-auto">
          <div className="grid md:grid-cols-4 md:gap-6">
            <div className="relative  z-0 w-full col-md-4 mb-4 group">
              <input
                type="text"
                name="amount"
                onChange={handleChange}
                value={verifyData.totalAmount}
                className={input}
                placeholder=" "
                readOnly
              />
              <label className={label}>Amount</label>
            </div>

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <input
                type="number"
                className={input}
                placeholder=" "
                name="verifyAmount"
                onChange={handleChange}
                value={verifyData.verifyAmount}
                required
              />
              <label className={label}>Verified Amount</label>
            </div>

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <input
                type="text"
                className={input}
                placeholder=" "
                name="remainingAmount"
                value={verifyData.remainingAmount}
                readOnly
                onChange={handleChange}
              />
              <label className={label}>Remaining Amount</label>
            </div>

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <input
                type="file"
                className={input}
                placeholder=" "
                name="verifyDoc"
                onChange={handleChange}
              />
              <label className={label}>Upload Document</label>
            </div>
          </div>

          <button
            className="bg-blue-500 text-white px-5 p-2 rounded"
            disabled={loading}
            type="submit"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-5 p-2 rounded ms-2"
          >
            Close
          </button>
        </div>
      </form>
    </>
  );
}
export default VarifyBill;
