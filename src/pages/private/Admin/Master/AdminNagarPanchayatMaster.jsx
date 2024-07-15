import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../../constant";
import Header from "../../../../component/Header";
import { select, label, btn, input } from "../../../../utils/tailwindClasses";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Loader from "../../../../component/Loader";
import { useUserContext } from "../../../../utils/userContext";

function AdminNagarPanchayatMaster() {
  const [divisions, setDivisions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [nagarPanchayat, setNagarPanchayat] = useState([]);
  const [editId, setEditId] = useState(null);
  const [localBodyData, setLocalBodyData] = useState({
    divisionName: "",
    categoryType: "",
    nagarPanchayatName: "",
  });
  const [localBodies, setLocalBodies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useUserContext();

  useEffect(() => {
    const listDivisions = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/list-divisions`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Division Response:", response);

        if (response.data && response.data.records) {
          setDivisions(response.data.records);
        } else {
          console.error("Invalid division response structure:", response);
        }
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
        console.error("Division Error:", error);
      }
    };
    listDivisions();
  }, [token]);

  useEffect(() => {
    if (localBodyData.divisionName !== "") {
      setLocalBodyData((prevData) => ({
        ...prevData,
        categoryType: "",
        nagarPanchayatName: "",
      }));
      fetchCategories();
    }
  }, [localBodyData.divisionName]);

  useEffect(() => {
    if (localBodyData.categoryType !== "") {
      setLocalBodyData((prevData) => ({
        ...prevData,
        nagarPanchayatName: "",
      }));
    }
  }, [localBodyData.categoryType]);

  useEffect(() => {
    if (localBodyData.categoryType !== "") {
      setLocalBodyData({
        ...localBodyData,
        nagarPanchayatName: "",
      });
      fetchNagarPanchayat();
    }
  }, [localBodyData.categoryType]);

  const fetchCategories = async () => {
    const divisionName = {
      billFor: "Nagar Panchayat",
      masters: 1,
    };
    try {
      const response = await axios.post(
        `${apiUrl}/list-category`,
        divisionName,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Category Response:", response);

      if (response.data && response.data.records) {
        setCategories(response.data.records);
      } else {
        console.error("Invalid category response structure:", response);
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error("Category Error:", error);
    }
  };

  const fetchLocalBodies = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/list-nagar-panchayat`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.records) {
        setLocalBodies(response.data.records);
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error("Error fetching local bodies:", error);
    }
  };

  const fetchNagarPanchayat = async () => {
    const data = {
      divisionName: localBodyData.divisionName,
      categoryType: localBodyData.categoryType,
      bodyType: "Nagar Panchayat",
    };
    try {
      const response = await axios.post(`${apiUrl}list-dropdownNames`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Nagar Palika Response:", response);

      if (response.data && response.data.records) {
        setNagarPanchayat(response.data.records);
      } else {
        console.error("Invalid Nagar Palika response structure:", response);
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error("Nagar Palika Error:", error);
    }
  };

  // Save Nagar Palika Master Data
  const saveNagarPanchayatMaster = () => {
    setLoading(true);
    const data = {
      divisionName: localBodyData.divisionName,
      categoryType: localBodyData.categoryType,
      nagarPanchayatName: localBodyData.nagarPanchayatName,
    };
    axios
      .post(`${apiUrl}/add-nagar-panchayat`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setLoading(false);
        alert("Nagar Panchayat Record Saved Successfully");
        resetForm();
        fetchLocalBodies();
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
        console.error(
          "Error saving Nagar Palika record:",
          error.response ? error.response.data : error.message
        );
      });
  };

  // Edit Nagar Palika Master Data
  const editConnection = (body) => {
    setLocalBodyData({
      divisionName: body.divisionName,
      categoryType: body.categoryType,
      nagarPanchayatName: body.nagarPanchayatName,
    });
    setIsEdit(true);
    setEditId(body._id);
  };

  const updateConnection = async () => {
    setLoading(true);
    const data = {
      nagarPanchayatID: editId,
      divisionName: localBodyData.divisionName,
      categoryType: localBodyData.categoryType,
      nagarPanchayatName: localBodyData.nagarPanchayatName,
    };
    try {
      const response = await axios.put(
        `${apiUrl}/update-nagar-panchayat`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response);
      alert("Record updated successfully.");
      setLoading(false);
      resetForm();
      fetchLocalBodies();
    } catch (error) {
      alert(error.message);
      setLoading(false);
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteConnection = async (id) => {
    setLoading(true);
    const data = {
      nagarPanchayatID: id,
    };
    axios
      .delete(`${apiUrl}/delete-nagar-panchayat`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      })
      .then((response) => {
        setLoading(false);
        console.log("Response:", response);
        alert("Record Deleted Successfully.");
        fetchLocalBodies();
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const resetForm = () => {
    setLocalBodyData({
      divisionName: "",
      categoryType: "",
      nagarPanchayatName: "",
    });
    setIsEdit(false);
    setEditId(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocalBodyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchLocalBodies();
  }, []);

  return (
    <>
      <Header
        title="Nagar Panchayat Master"
        action={{
          button: "",
          path: "",
        }}
      />
      <div className="mt-8 max-w-xxl p-6 bg-white border border-gray-200 rounded-lg shadow">
        <div className="grid md:grid-cols-3 md:gap-6">
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Division Name</label>
            <select
              name="divisionName"
              className={select}
              value={localBodyData.divisionName}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {divisions.map((division, index) => (
                <option key={index} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Category Type</label>
            <select
              name="categoryType"
              className={select}
              value={localBodyData.categoryType}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Nagar Panchayat Name</label>
            <select
              name="nagarPanchayatName"
              className={select}
              value={localBodyData.nagarPanchayatName}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {nagarPanchayat.map((nagarPalika, index) => (
                <option key={index} value={nagarPalika}>
                  {nagarPalika}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className={btn}
          onClick={isEdit ? updateConnection : saveNagarPanchayatMaster}
        >
          {isEdit ? "Update" : "Save"}
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={resetForm}
        >
          Reset
        </button>
      </div>
      {loading && <Loader />} {/* Display loader when loading is true */}
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
                Nagar Panchayat Name
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {localBodies.map((body, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {body.divisionName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {body.categoryType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {body.nagarPanchayatName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => editConnection(body)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <PencilSquareIcon className="h-6 w-6" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => deleteConnection(body._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminNagarPanchayatMaster;
