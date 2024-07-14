import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../../constant";
import Header from "../../../../component/Header";
import { select, label, btn, input } from "../../../../utils/tailwindClasses";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Loader from "../../../../component/Loader";

function AdminJalSansthanMaster() {
  const [divisions, setDivisions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nagarPalikas, setNagarPalika] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [localBodyData, setLocalBodyData] = useState({
    divisionName: "",
    jalSansthanName: "",
  });
  const [localBodies, setLocalBodies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const listDivisions = async () => {
      try {
        const response = await axios.post(`${apiUrl}/list-divisions`);
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
  }, []);

  useEffect(() => {
    if (localBodyData.divisionName !== "") {
      setLocalBodyData((prevData) => ({
        ...prevData,
        jalSansthanName: "",
      }));
      fetchCategories();
    }
  }, [localBodyData.divisionName]);

  const fetchCategories = async () => {
    const divisionName = {
      divisionName: localBodyData.divisionName,
    };
    try {
      const response = await axios.post(
        `${apiUrl}/list-category`,
        divisionName
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
      const response = await axios.post(`${apiUrl}/list-jal-sasthan`, {});
      if (response.data && response.data.records) {
        setLocalBodies(response.data.records);
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error("Error fetching local bodies:", error);
    }
  };

  // Save Nagar Palika Master Data
  const saveJalSansthanMaster = () => {
    setLoading(true);
    const data = {
      divisionName: localBodyData.divisionName,
      jalSansthanName: localBodyData.jalSansthanName,
    };
    axios
      .post(`${apiUrl}/add-jal-sasthan`, data)
      .then((response) => {
        console.log("Response:", response);
        setLoading(false);
        alert("Jal Sansthan Record Saved Successfully");
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
      jalSansthanName: body.jalSansthanName,
    });
    setIsEdit(true);
    setEditId(body._id);
  };

  const updateConnection = async () => {
    setLoading(true);
    const data = {
      jalSasthanID: editId,
      divisionName: localBodyData.divisionName,
      jalSansthanName: localBodyData.jalSansthanName,
    };
    try {
      const response = await axios.put(`${apiUrl}/update-jal-sasthan`, data);
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
      jalSasthanID: id,
    };
    axios
      .delete(`${apiUrl}/delete-jal-sasthan`, {
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
      jalSansthanName: "",
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
        title="Jal Sansthan Master"
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
            <input
              type="text"
              name="jalSansthanName"
              className={input}
              placeholder=" "
              value={localBodyData.jalSansthanName}
              onChange={handleInputChange}
              required
            />
            <label className={label}>Nagar Panchayat Name</label>
          </div>
        </div>

        <button
          className={btn}
          onClick={isEdit ? updateConnection : saveJalSansthanMaster}
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
                Jal Sansthan Name
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
                  {body.jalSansthanName}
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
export default AdminJalSansthanMaster;
