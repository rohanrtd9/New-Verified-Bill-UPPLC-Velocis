import Header from "../../../component/Header";
import { select, input, label, btn } from "../../../utils/tailwindClasses";

function ReportBillForJalSansthan() {
  return (
    <>
      <Header
        title="Search Verified Monthly Bill for Jal Sansthan"
        action={{
          button: "",
          path: "",
        }}
      />

      <div className="mt-8 max-w-xxl p-6 bg-gray-200 border border-gray-200 rounded-lg shadow mx-auto">
        <div className="grid md:grid-cols-4 md:gap-6">

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label  className={label}>Financial Year</label>
              <select  className={select}>
              <option defaultValue="">--Select--</option>
                <option defaultValue="1" >2020-21</option>
                <option defaultValue="2" >2021-22</option>
                <option defaultValue="3" >2022-23</option>
              </select>
            </div>
          
            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label  className={label}>Discom</label>
              <select  className={select}>
              <option defaultValue="">--Select--</option>
                <option defaultValue="1">Uttaranchal</option>              
              </select>
            </div>
                  

            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label  className={label}>Zone</label>
              <select  className={select}>
              <option defaultValue="">--Select--</option>
                <option defaultValue="1">Kanpur</option>
              </select>
            </div>
            
            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label  className={label}>Circle</label>
              <select  className={select}>
              <option defaultValue="">--Select--</option>
                <option defaultValue="1">EDC Kanpur</option>
              </select>
            </div>
            
            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label  className={label}>Division</label>
              <select  className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="1">EDC Kanpur</option>
              </select>
            </div>
            
            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label  className={label}>Bill Type</label>
              <select  className={select}>
              <option defaultValue="">--Select--</option>
              <option defaultValue="1">All</option>

              </select>
            </div>
            
            
            
            <div className="relative z-0 w-full col-md-4 mb-4 group">
              <label  className={label}>Jal Sansthan Name</label>
              <select  className={select}>
              <option defaultValue="">--Select--</option>
                <option defaultValue="1" >All</option>
              </select>
            </div>
        </div>

        <button className={btn}>Search</button>
        <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reset</button>
      </div>

      
      <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-2">
                Discom
              </th>
              <th scope="col" className="p-2">
                Zone
              </th>
              <th scope="col" className="p-2">
                Circle
              </th>
              <th scope="col" className="p-2">
                Division
              </th>
              <th scope="col" className="p-2">
                Bill Type
              </th>
              <th scope="col" className="p-2">
                Jal Sansthan Name
              </th>
              <th scope="col" className="p-2">
                3/18
              </th>
              <th scope="col" className="p-2">
                4/18  
              </th>
              <th scope="col" className="p-2">
                5/18 
              </th>
              <th scope="col" className="p-2">
                6/18
              </th>
              <th scope="col" className="p-2">
                7/18
              </th>
              <th scope="col" className="p-2">
                8/18
              </th>
              <th scope="col" className="p-2">
                9/18
              </th>
              <th scope="col" className="p-2">
                10/18
              </th>
              <th scope="col" className="p-2">
                11/18
              </th>
              <th scope="col" className="p-2">
                12/18
              </th>
              <th scope="col" className="p-2">
                1/19
              </th>
              <th scope="col" className="p-2">
                2/19
              </th>
              <th scope="col" className="p-2">
                3/19
              </th>
              <th scope="col" className="p-2">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b ">
              <td className="p-2">1</td>
              <td className="p-2">2</td>
              <td className="p-2">3</td>
              <td className="p-2">4</td>
              <td className="p-2">5</td>
              <td className="p-2">6</td>
              <td className="p-2">7</td>
              <td className="p-2">8</td>
              <td className="p-2">9</td>
              <td className="p-2">10</td>
              <td className="p-2">11</td>
              <td className="p-2">12</td>
              <td className="p-2">13</td>
              <td className="p-2">14</td>
              <td className="p-2">15</td>
              <td className="p-2">16</td>
              <td className="p-2">17</td>
              <td className="p-2">18</td>
              <td className="p-2">19</td>
              <td className="p-2">20</td>
            </tr>
            <tr className="bg-gray-200 border-b ">
              <td className="p-2">Dakshinanchal</td>
              <td className="p-2">Kanpur</td>
              <td className="p-2">EDC Kanpur</td>
              <td className="p-2">EDD Kanpur</td>
              <td className="p-2">Jal Sansthan</td>
              <td className="p-2">Kanpur Jal Sansthan</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">600.00</td>

            </tr>
            <tr className="border-b ">
              <td className="p-2">Dakshinanchal</td>
              <td className="p-2">Kanpur</td>
              <td className="p-2">EDC Kanpur</td>
              <td className="p-2">EDD Kanpur</td>
              <td className="p-2">Jal Sansthan</td>
              <td className="p-2">Kanpur Jal Sansthan</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">600.00</td>

            </tr>


            <tr className="bg-gray-200 border-b ">
              <td className="p-2">Total</td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2"></td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">0.00</td>
              <td className="p-2">1200.00</td>

            </tr>
            </tbody>
            </table>   
          </div>
    </>
  );
}
export default ReportBillForJalSansthan;
