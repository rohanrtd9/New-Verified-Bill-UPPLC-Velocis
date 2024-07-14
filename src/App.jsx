import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./component/Layout";
import Dashboard from "./pages/private/dashboard";
import NewConnection from "./pages/private/connection/NewConnection";

import BillForLocalBodies from "./pages/private/BillForLocalBodies/BillForLocalBodies";
import AddNewBill from "./pages/private/BillForLocalBodies/AddNewBill";
import VarifyBill from "./pages/private/BillForLocalBodies/VarifyBill";
import BillForIrrigation from "./pages/private/BillForIrrigation/BillForIrrigation";
import AddNewBillForIrrigation from "./pages/private/BillForIrrigation/AddNewBillForIrrigation";
import VarifyBillForIrrigation from "./pages/private/BillForIrrigation/VarifyBillForIrrigation";

import BillForRiverMaster from "./pages/private/BillForRiverMaster/BillForRiverMaster";
import AddNewBillForRiverMaster from "./pages/private/BillForRiverMaster/AddNewBillForRiverMaster";
import VarifyBillForRiverMaster from "./pages/private/BillForRiverMaster/VarifyBillForRiverMaster";
import BillForJalSansthan from "./pages/private/BillForJalSansthan/BillForJalSansthan";
import AddNewBillForJalSansthan from "./pages/private/BillForJalSansthan/AddNewBillForJalSansthan";
import VarifyBillForJalSansthan from "./pages/private/BillForJalSansthan/VarifyBillForJalSansthan";
import AddConsolidatedSummary from "./pages/private/ConsolidatedSummary/AddConsolidatedSummary";
import UploadConsolidatedSummary from "./pages/private/ConsolidatedSummary/UploadConsolidatedSummary";
import ReportBillForLocalBodies from "./pages/private/Report/ReportBillForLocalBodies";
import ReportBillForIrrigation from "./pages/private/Report/ReportBillForIrrigation";
import ReportBillForRiverMaster from "./pages/private/Report/ReportBillForRiverMaster";
import ReportBillForJalSansthan from "./pages/private/Report/ReportBillForJalSansthan";
import { AppProvider } from "./utils/userContext";

// Start Route For Admin On (27/04/2024)

/* import LocalBodyMaster from "./pages/private/Admin/Master/LocalBodyMaster";
import NagarNigamMaster from "./pages/private/Admin/Master/NagarNigamMaster";
import NagarPalikaMaster from "./pages/private/Admin/Master/NagarPalikaMaster";
import NagarPanchayatMaster from "./pages/private/Admin/Master/NagarPanchayatMaster";
import JalSansthanMaster from "./pages/private/Admin/Master/JalSansthanMaster";
import StateTubeWellMaster from "./pages/private/Admin/Master/StateTubeWellMaster";
import SmallPumpCanalMaster from "./pages/private/Admin/Master/SmallPumpCanalMaster";
import MediumLargeCanalPumpMaster from "./pages/private/Admin/Master/MediumLargeCanalPumpMaster";
import RiverPollutionMaster from "./pages/private/Admin/Master/RiverPollutionMaster"; */
// Start route for admin on (06/07/2024)

import AdminLocalBodyMaster from "./pages/private/Admin/Master/AdminLocalBodyMaster";
import AdminNagarNigamMaster from "./pages/private/Admin/Master/AdminNagarNigamMaster";
import AdminNagarPalikaMaster from "./pages/private/Admin/Master/AdminNagarPalikaMaster";
import AdminNagarPanchayatMaster from "./pages/private/Admin/Master/AdminNagarPanchayatMaster";
import AdminJalSansthanMaster from "./pages/private/Admin/Master/AdminJalSansthanMaster";
import AdminStateTubewellMaster from "./pages/private/Admin/Master/AdminStateTubewellMaster";
import AdminSmallPumpCanalMaster from "./pages/private/Admin/Master/AdminSmallPumpCanalMaster";
import AdminMediumLargePumpCanalMaster from "./pages/private/Admin/Master/AdminMediumLargePumpCanalMaster";
import AdminRiverPollutionMaster from "./pages/private/Admin/Master/AdminRiverPollutionMaster";

import AdminBillForLocalBodies from "./pages/private/Admin/Report/AdminBillForLocalBodies";
import AdminMonthlyBillForIrrigation from "./pages/private/Admin/Report/AdminMonthlyBillForIrrigation";
import AdminBillForRiverMaster from "./pages/private/Admin/Report/AdminBillForRiverMaster";
import AdminBillForJalSansthan from "./pages/private/Admin/Report/AdminBillForJalSansthan";
import ListConnections from "./pages/private/connection/ListConnection";
import Login from "./pages/public/Login";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/NewConnection/:id" element={<NewConnection />} />
            <Route path="/ListConnection" element={<ListConnections />} />
            <Route
              path="/BillForLocalBodies"
              element={<BillForLocalBodies />}
            />
            <Route
              path="/AddNewBill/:id/:name/:bookNo/:scNo"
              element={<AddNewBill />}
            />
            <Route path="/AddNewBill" element={<AddNewBill />} />
            <Route
              path="/VarifyBill/:amount/:billId"
              element={<VarifyBill />}
            />
            <Route path="/BillForIrrigation" element={<BillForIrrigation />} />
            <Route
              path="/AddNewBillForIrrigation"
              element={<AddNewBillForIrrigation />}
            />
            <Route
              path="/VarifyBillForIrrigation"
              element={<VarifyBillForIrrigation />}
            />
            <Route
              path="/BillForRiverMaster"
              element={<BillForRiverMaster />}
            />
            <Route
              path="/AddNewBillForRiverMaster"
              element={<AddNewBillForRiverMaster />}
            />
            <Route
              path="/VarifyBillForRiverMaster"
              element={<VarifyBillForRiverMaster />}
            />
            <Route
              path="/BillForJalSansthan"
              element={<BillForJalSansthan />}
            />
            <Route
              path="/AddNewBillForJalSansthan"
              element={<AddNewBillForJalSansthan />}
            />
            <Route
              path="/VarifyBillForJalSansthan"
              element={<VarifyBillForJalSansthan />}
            />
            <Route
              path="/AddConsolidatedSummary"
              element={<AddConsolidatedSummary />}
            />
            <Route
              path="/UploadConsolidatedSummary/:data"
              element={<UploadConsolidatedSummary />}
            />
            <Route
              path="/ReportBillForLocalBodies"
              element={<ReportBillForLocalBodies />}
            />
            <Route
              path="/ReportBillForIrrigation"
              element={<ReportBillForIrrigation />}
            />
            <Route
              path="/ReportBillForRiverMaster"
              element={<ReportBillForRiverMaster />}
            />
            <Route
              path="/ReportBillForJalSansthan"
              element={<ReportBillForJalSansthan />}
            />
            {/* Admin Route Here */}

            {/* <Route
              path="/MediumLargeCanalPumpMaster"
              element={<MediumLargeCanalPumpMaster />}
            /> */}

            <Route
              path="/AdminLocalBodyMaster"
              element={<AdminLocalBodyMaster />}
            />
            <Route
              path="/AdminNagarNigamMaster"
              element={<AdminNagarNigamMaster />}
            />
            <Route
              path="/AdminNagarPalikaMaster"
              element={<AdminNagarPalikaMaster />}
            />
            <Route
              path="/AdminNagarPanchayatMaster"
              element={<AdminNagarPanchayatMaster />}
            />
            <Route
              path="/AdminJalSansthanMaster"
              element={<AdminJalSansthanMaster />}
            />
            <Route
              path="/AdminStateTubewellMaster"
              element={<AdminStateTubewellMaster />}
            />
            <Route
              path="/AdminSmallPumpCanalMaster"
              element={<AdminSmallPumpCanalMaster />}
            />
            <Route
              path="/AdminMediumLargePumpCanalMaster"
              element={<AdminMediumLargePumpCanalMaster />}
            />
            <Route
              path="/AdminRiverPollutionMaster"
              element={<AdminRiverPollutionMaster />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
export default App;
