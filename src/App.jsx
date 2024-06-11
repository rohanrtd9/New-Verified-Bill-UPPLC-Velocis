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

import LocalBodyMaster from "./pages/private/Admin/Master/LocalBodyMaster";
import NagarNigamMaster from "./pages/private/Admin/Master/NagarNigamMaster";
import NagarPalikaMaster from "./pages/private/Admin/Master/NagarPalikaMaster";
import NagarPanchayatMaster from "./pages/private/Admin/Master/NagarPanchayatMaster";
import JalSansthanMaster from "./pages/private/Admin/Master/JalSansthanMaster";
import StateTubeWellMaster from "./pages/private/Admin/Master/StateTubeWellMaster";
import SmallPumpCanalMaster from "./pages/private/Admin/Master/SmallPumpCanalMaster";
import MediumLargeCanalPumpMaster from "./pages/private/Admin/Master/MediumLargeCanalPumpMaster";
import RiverPollutionMaster from "./pages/private/Admin/Master/RiverPollutionMaster";
import AdminBillForLocalBodies from "./pages/private/Admin/Report/AdminBillForLocalBodies";
import AdminMonthlyBillForIrrigation from "./pages/private/Admin/Report/AdminMonthlyBillForIrrigation";
import AdminBillForRiverMaster from "./pages/private/Admin/Report/AdminBillForRiverMaster";
import AdminBillForJalSansthan from "./pages/private/Admin/Report/AdminBillForJalSansthan";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/NewConnection" element={<NewConnection />} />

            <Route
              path="/BillForLocalBodies"
              element={<BillForLocalBodies />}
            />
            <Route path="/AddNewBill" element={<AddNewBill />} />
            <Route path="/VarifyBill" element={<VarifyBill />} />
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
              path="/UploadConsolidatedSummary"
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
            <Route path="/LocalBodyMaster" element={<LocalBodyMaster />} />
            <Route path="/NagarNigamMaster" element={<NagarNigamMaster />} />
            <Route path="/NagarPalikaMaster" element={<NagarPalikaMaster />} />
            <Route path="/JalSansthanMaster" element={<JalSansthanMaster />} />
            <Route
              path="/RiverPollutionMaster"
              element={<RiverPollutionMaster />}
            />
            <Route
              path="/MediumLargeCanalPumpMaster"
              element={<MediumLargeCanalPumpMaster />}
            />
            <Route
              path="/SmallPumpCanalMaster"
              element={<SmallPumpCanalMaster />}
            />
            <Route
              path="/NagarPanchayatMaster"
              element={<NagarPanchayatMaster />}
            />
            <Route
              path="/StateTubeWellMaster"
              element={<StateTubeWellMaster />}
            />
            <Route
              path="/AdminBillForLocalBodies"
              element={<AdminBillForLocalBodies />}
            />
            <Route
              path="/AdminMonthlyBillForIrrigation"
              element={<AdminMonthlyBillForIrrigation />}
            />
            <Route
              path="/AdminBillForRiverMaster"
              element={<AdminBillForRiverMaster />}
            />
            <Route
              path="/AdminBillForJalSansthan"
              element={<AdminBillForJalSansthan />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
export default App;
