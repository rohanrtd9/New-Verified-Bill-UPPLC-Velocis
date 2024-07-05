import { useState } from "react";
import Header from "../../../component/Header";
import { btn, input, label } from "../../../utils/tailwindClasses";

function NewConnection() {
  const [connectionData, setConnectionData] = useState({
    billFor: "",
    connectionDate: "",
    bookNo: "",
    scNo: "",
    billingMode: "",
    acId: "",
    name: "",
    address: "",
    billingType: "",
    load: "",
    st: "",
    meterNo: "",
    meterMake: "",
    mf: "",
  });
  const saveNewConnection = () => {
    alert("clicked save");
    console.log("data: ", connectionData);
  };
  return (
    <>
      <Header
        title="New Connection"
        action={{
          button: "View",
          path: "",
        }}
      />

      <div className="mt-8 max-w-xxl p-6 border border-gray-200 rounded-lg shadow mx-auto">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_first_name"
              onChange={(e) =>
                setConnectionData({
                  ...connectionData,
                  billFor: e.target.value,
                })
              }
              value={connectionData.billFor}
              className={input}
              required
              placeholder=" "
            />
            <label className={label}>Bill For</label>
          </div>
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="date"
              name="floating_last_name"
              onChange={(e) =>
                setConnectionData({
                  ...connectionData,
                  connectionDate: e.target.value,
                })
              }
              value={connectionData.connectionDate}
              className={input}
              required
              placeholder=" "
            />
            <label className={label}>Date Of Connection</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_first_name"
              onChange={(e) =>
                setConnectionData({ ...connectionData, bookNo: e.target.value })
              }
              value={connectionData.bookNo}
              className={input}
              required
              placeholder=" "
            />
            <label className={label}>Book No</label>
          </div>
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_last_name"
              onChange={(e) =>
                setConnectionData({
                  ...connectionData,
                  scNo: e.target.value,
                })
              }
              value={connectionData.scNo}
              className={input}
              required
              placeholder=" "
            />
            <label className={label}>SC No</label>
          </div>

          <div className="relative z-0 w-full col-md-8 mb-4 group flex">
            <div className="w-2/6">
              <p>Billing Mode</p>
            </div>
            <div className="w-2/6">
              <input
                id="inline-radio"
                type="radio"
                onChange={(e) =>
                  setConnectionData({
                    ...connectionData,
                    billingMode: e.target.value,
                  })
                }
                value="Online"
                placeholder=" "
                name="inline-radio-group"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Online
              </label>
            </div>
            <div className="w-2/6">
              <input
                id="inline-2-radio"
                type="radio"
                onChange={(e) =>
                  setConnectionData({
                    ...connectionData,
                    billingMode: e.target.value,
                  })
                }
                value="offline"
                placeholder=" "
                name="inline-radio-group"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Offline
              </label>
            </div>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_last_name"
              onChange={(e) =>
                setConnectionData({ ...connectionData, acId: e.target.value })
              }
              value={connectionData.acId}
              className={input}
              required
              placeholder=" "
            />
            <label className={label}>Account ID</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_last_name"
              onChange={(e) =>
                setConnectionData({ ...connectionData, name: e.target.value })
              }
              value={connectionData.name}
              className={input}
              placeholder=" "
              required
            />
            <label className={label}>Name</label>
          </div>
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_last_name"
              onChange={(e) =>
                setConnectionData({
                  ...connectionData,
                  address: e.target.value,
                })
              }
              value={connectionData.address}
              className={input}
              required
              placeholder=" "
            />
            <label className={label}>Address</label>
          </div>
          <div className="relative z-0 w-full col-md-8 mb-4 group flex">
            <div className="w-2/6">
              <p>Billing Type</p>
            </div>
            <div className="w-2/6">
              <input
                id="inline-radio"
                type="radio"
                onChange={(e) =>
                  setConnectionData({
                    ...connectionData,
                    billingType: e.target.value,
                  })
                }
                value="RDPDRP"
                placeholder=" "
                name="billing-type"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                RDPDRP
              </label>
            </div>
            <div className="w-2/6">
              <input
                id="inline-2-radio"
                type="radio"
                onChange={(e) =>
                  setConnectionData({
                    ...connectionData,
                    billingType: e.target.value,
                  })
                }
                value="Non-RDPDRP"
                placeholder=" "
                name="billing-type"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Non-RDPDRP
              </label>
            </div>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_last_name"
              onChange={(e) =>
                setConnectionData({ ...connectionData, load: e.target.value })
              }
              value={connectionData.load}
              className={input}
              placeholder=" "
              required
            />
            <label className={label}>Load</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_first_name"
              className={input}
              onChange={(e) =>
                setConnectionData({ ...connectionData, st: e.target.value })
              }
              value={connectionData.st}
              placeholder=" "
              required
            />
            <label className={label}>ST</label>
          </div>
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_last_name"
              onChange={(e) =>
                setConnectionData({
                  ...connectionData,
                  meterNo: e.target.value,
                })
              }
              value={connectionData.meterNo}
              className={input}
              placeholder=" "
              required
            />
            <label className={label}>Meter Number</label>
          </div>

          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_first_name"
              onChange={(e) =>
                setConnectionData({
                  ...connectionData,
                  meterMake: e.target.value,
                })
              }
              value={connectionData.meterMake}
              className={input}
              placeholder=" "
              required
            />
            <label className={label}>Meter Make</label>
          </div>
          <div className="relative z-0 w-full col-md-4 mb-4 group">
            <input
              type="text"
              name="floating_last_name"
              onChange={(e) =>
                setConnectionData({ ...connectionData, mf: e.target.value })
              }
              className={input}
              value={connectionData.mf}
              placeholder=" "
              required
            />
            <label className={label}>MF</label>
          </div>
        </div>
        <button className={btn} onClick={saveNewConnection}>
          Submit
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Reset
        </button>
      </div>
    </>
  );
}
export default NewConnection;
