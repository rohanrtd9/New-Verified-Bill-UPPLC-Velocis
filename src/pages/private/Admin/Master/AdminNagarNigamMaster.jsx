import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../../constant";
import Header from "../../../../component/Header";
import { select, label, btn } from "../../../../utils/tailwindClasses";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Loader from "../../../../component/Loader";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../../utils/userContext";

function AdminNagarNigamMaster() {
  const [divisions, setDivisions] = useState([]);
  const { token } = useUserContext();
  const [categories, setCategories] = useState([]);
  const [nagarNigams, setNagarNigams] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [localBodyData, setLocalBodyData] = useState({
    divisionName: "",
    categoryType: "",
    nagarNigamName: "",
  });
  const [localBodies, setLocalBodies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listDivisions = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}list-divisions`,
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
  useEffect(() => {
    if (token !== "") {
      listDivisions();
    }
  }, [token]);

  useEffect(() => {
    if (localBodyData.divisionName !== "") {
      setLocalBodyData({
        ...localBodyData,
        categoryType: "",
        nagarNigamName: "",
      });
      fetchCategories();
    }
  }, [localBodyData.divisionName]);
  useEffect(() => {
    if (localBodyData.categoryType !== "") {
      setLocalBodyData({
        ...localBodyData,
        nagarNigamName: "",
      });
      fetchNagarNigams();
    }
  }, [localBodyData.categoryType]);

  const fetchCategories = async () => {
    const divisionName = {
      divisionName: localBodyData.divisionName,
    };
    try {
      const response = await axios.post(
        `${apiUrl}list-category`,
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

  const fetchNagarNigams = async () => {
    const data = {
      divisionName: localBodyData.divisionName,
      categoryType: localBodyData.categoryType,
    };
    try {
      const response = await axios.post(`${apiUrl}list-nigam-name`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Nagar Nigam Response:", response);

      if (response.data && response.data.records) {
        setNagarNigams(response.data.records);
      } else {
        console.error("Invalid nagar nigam response structure:", response);
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error("Nagar Nigam Error:", error);
    }
  };

  const fetchLocalBodies = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}list-nagar-nigam`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Local Bodies Response:", response);
      if (response.data && response.data.records) {
        setLocalBodies(response.data.records);
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error("Error fetching local bodies:", error);
    }
  };

  // Save Nagar Nigam Master Data
  const saveNagarNigamMaster = () => {
    setLoading(true);
    const data = {
      divisionName: localBodyData.divisionName,
      categoryType: localBodyData.categoryType,
      nagarNigamName: localBodyData.nagarNigamName,
    };
    axios
      .post(`${apiUrl}add-nagar-nigam`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        setLoading(false);
        alert("Nagar Nigam Record Saved Successfully");
        resetForm();
        // After saving, refresh the local bodies list
        fetchLocalBodies();
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
        console.error(
          "Error saving Nagar Nigam record:",
          error.response ? error.response.data : error.message
        );
      });
  };

  // Edit Nagar Nigam Master Data

  const editConnection = (body) => {
    setLocalBodyData({
      divisionName: body.divisionName,
      categoryType: body.categoryType,
      nagarNigamName: body.nagarNigamName,
    });
    setIsEdit(true);
    setEditId(body._id); // Assuming body._id is correct for your data structure
  };

  const updateConnection = async () => {
    setLoading(true);
    const data = {
      nagarNigamID: editId,
      divisionName: localBodyData.divisionName,
      categoryType: localBodyData.categoryType,
      nagarNigamName: localBodyData.nagarNigamName,
    };
    try {
      const response = await axios.put(`${apiUrl}update-nagar-nigam`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", response);
      alert("Record updated successfully.");
      setLoading(false);
      resetForm();
      fetchLocalBodies(); // Refresh the list after updating a local body
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
      nagarNigamID: id,
    };

    axios
      .delete(
        `${apiUrl}delete-nagar-nigam`,
        {
          data: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
      nagarNigamName: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocalBodyData({
      ...localBodyData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchLocalBodies();
  }, []); // Fetch local bodies on component mount

  return (
    <>
      <Header
        title="Nagar Nigam Master"
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
            <label className={label}>Nagar Nigam Name</label>
            <select
              name="nagarNigamName"
              className={select}
              value={localBodyData.nagarNigamName}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              {nagarNigams.map((nagarNigam, index) => (
                <option key={index} value={nagarNigam}>
                  {nagarNigam}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className={btn}
          onClick={isEdit ? updateConnection : saveNagarNigamMaster}
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
                Category Type
              </th>
              <th scope="col" className="px-6 py-3">
                Nagar Nigam Name
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
                  {body.nagarNigamName}
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

export default AdminNagarNigamMaster;
