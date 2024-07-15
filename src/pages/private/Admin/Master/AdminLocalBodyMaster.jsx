import Header from "../../../../component/Header";
import { select, input, label, btn } from "../../../../utils/tailwindClasses";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../../constant";
import Loader from "../../../../component/Loader";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../../utils/userContext";

function AdminLocalBodyMaster() {
  const { token } = useUserContext();
  const [localBodyTypes, setLocalBodyTypes] = useState([]);
  const [localBodies, setLocalBodies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const navigate = useNavigate();

  const [localBodyData, setLocalBodyData] = useState({
    bodyType: "",
    bodyName: "",
  });
  const fetchLocalBodyTypes = () => {
    axios
      .post(
        `${apiUrl}list-body-type`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Response:", response);
        if (response.data && response.data.records) {
          setLocalBodyTypes(response.data.records);
        } else {
          console.error("Invalid response structure:", response);
        }
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const fetchLocalBodies = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/list-local-bodies`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response);
      if (response.data && response.data.records) {
        setLocalBodies(response.data.records);
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (token !== "") {
      fetchLocalBodyTypes();
      fetchLocalBodies();
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalBodyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveLocalBodyMaster = () => {
    setLoading(true);
    const data = {
      bodyType: localBodyData.bodyType,
      bodyName: localBodyData.bodyName,
    };
    axios
      .post(`${apiUrl}/add-local-bodies`, data)
      .then((response) => {
        console.log("Response:", response);
        setLoading(false);
        alert("Local Body Record Saved Successfully");
        resetForm();
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
      bodyType: "",
      bodyName: "",
    });
    setIsEdit(false);
    setEditId(null);
  };

  const deleteConnection = async (id) => {
    setLoading(true);
    const data = {
      localBodyID: id,
    };

    axios
      .delete(`${apiUrl}delete-local-bodies`, {
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

  const editConnection = (body) => {
    setLocalBodyData({
      bodyType: body.bodyType,
      bodyName: body.bodyName,
    });
    setIsEdit(true);
    setEditId(body._id);
  };

  const updateConnection = async () => {
    setLoading(true);
    const data = {
      localBodyID: editId,
      bodyType: localBodyData.bodyType,
      bodyName: localBodyData.bodyName,
    };
    axios
      .put(`${apiUrl}/update-local-bodies`, data)
      .then((response) => {
        console.log("Response:", response);
        alert("Record updated successfully.");
        setLoading(false);
        resetForm();
        fetchLocalBodies(); // Refresh the list after updating a local body
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const totalPages = Math.ceil(localBodies.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = localBodies.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <>
      {loading && <Loader />}
      <Header
        title="Local Body Master"
        action={{
          button: "",
          path: "",
        }}
      />

      {error && (
        <div className="text-red-500">
          <p>Error fetching local body types: {error}</p>
        </div>
      )}

      <div
        className="mt-8 max-w-xxl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 
        dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-auto"
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <label className={label}>Local Body Type</label>
            <select
              name="bodyType"
              className={select}
              value={localBodyData.bodyType}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              {localBodyTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="bodyName"
              className={input}
              placeholder=" "
              value={localBodyData.bodyName}
              onChange={handleInputChange}
              required
            />
            <label className={label}>Local Body Name</label>
          </div>
        </div>

        <button
          className={btn}
          onClick={isEdit ? updateConnection : saveLocalBodyMaster}
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
                Local Body Type
              </th>
              <th scope="col" className="px-6 py-3">
                Local Body Name
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
            {currentRecords.length > 0 ? (
              currentRecords.map((body, index) => (
                <tr className="bg-white border-b" key={body._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {indexOfFirstRecord + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {body.bodyType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {body.bodyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex">
                    <button
                      onClick={() => editConnection(body)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilSquareIcon className="h-5 w-5 inline" />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => deleteConnection(body._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5 inline" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b">
                <td colSpan={5} align="center">
                  No record.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} Size Of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminLocalBodyMaster;
