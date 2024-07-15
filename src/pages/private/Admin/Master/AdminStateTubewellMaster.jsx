import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../../constant";
import Header from "../../../../component/Header";
import { select, label, btn, input } from "../../../../utils/tailwindClasses";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Loader from "../../../../component/Loader";
import { useUserContext } from "../../../../utils/userContext";

function AdminStateTubewellMaster() {
  const [divisions, setDivisions] = useState([]);
  const [localBodyData, setLocalBodyData] = useState({
    divisionName: "",
    tubeWellName: "",
  });
  const [localBodies, setLocalBodies] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useUserContext();

  useEffect(() => {
    const listDivisions = async () => {
      try {
        setLoading(true);
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
        setLoading(false);

        if (response.data && response.data.records) {
          setDivisions(response.data.records);
        } else {
          console.error("Invalid division response structure:", response);
        }
      } catch (error) {
        setLoading(false);
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
        tubeWellName: "",
      }));
    }
  }, [localBodyData.divisionName]);

  const fetchLocalBodies = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}/list-tube-well`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);

      if (response.data && response.data.records) {
        setLocalBodies(response.data.records);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response ? error.response.data : error.message);
      console.error("Error fetching local bodies:", error);
    }
  };

  const saveJalSansthanMaster = () => {
    setLoading(true);
    const data = {
      divisionName: localBodyData.divisionName,
      tubeWellName: localBodyData.tubeWellName,
    };
    axios
      .post(`${apiUrl}/add-tube-well`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        console.log("Response:", response);
        alert("Record Saved Successfully");
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

  const editConnection = (body) => {
    setLocalBodyData({
      divisionName: body.divisionName,
      tubeWellName: body.tubeWellName,
    });
    setIsEdit(true);
    setEditId(body._id);
  };

  const updateConnection = async () => {
    setLoading(true);
    const data = {
      tubeWellID: editId,
      divisionName: localBodyData.divisionName,
      tubeWellName: localBodyData.tubeWellName,
    };
    try {
      const response = await axios.put(`${apiUrl}/update-tube-well`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      console.log("Response:", response);
      alert("Record updated successfully.");
      resetForm();
      fetchLocalBodies();
    } catch (error) {
      setLoading(false);
      alert(error.message);
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteConnection = async (id) => {
    setLoading(true);
    const data = {
      tubeWellID: id,
    };
    axios
      .delete(`${apiUrl}/delete-tube-well`, {
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
      tubeWellName: "",
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
  }, [token]);

  return (
    <>
      <Header
        title="State Tube well Master"
        action={{
          button: "",
          path: "",
        }}
      />
      {loading && <Loader />} {/* Display Loader when loading is true */}
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
              name="tubeWellName"
              className={input}
              placeholder=" "
              value={localBodyData.tubeWellName}
              onChange={handleInputChange}
              required
            />
            <label className={label}>State Tubewell Name</label>
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
                State Tube well Name
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
                  {body.tubeWellName}
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
export default AdminStateTubewellMaster;
