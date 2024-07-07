import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  DocumentCheckIcon,
  BoltIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import uppclLogo from "./../assets/logo.jpeg";
import { NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "../utils/userContext";

export function Sidebar() {
  const { pathname } = useLocation();
  const { userType } = useUserContext();
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="min-h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 sideBar">
      <div className="mb-2 p-4">
        <img className="mx-auto w-60" src={uppclLogo} alt="logo" />
      </div>
      <List>
        <NavLink to="/" activeclassname="activeNav">
          <ListItem>
            <ListItemPrefix>
              <ComputerDesktopIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </NavLink>
        {userType === "public" ? (
          <>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-medium">
                    Masters
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <NavLink to="/NewConnection/add">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      New Connection
                    </ListItem>
                  </NavLink>
                </List>
              </AccordionBody>
            </Accordion>

            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <BoltIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-medium">
                    Trasaction Form
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <NavLink
                    to="/BillForLocalBodies"
                    className={
                      pathname === "/AddNewBill" || pathname === "/VarifyBill"
                        ? "active"
                        : ""
                    }
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Varified Monthly Bill
                    </ListItem>
                  </NavLink>

                  {/* <NavLink
                    to="/BillForIrrigation"
                    className={
                      pathname === "/AddNewBillForIrrigation" ||
                      pathname === "/VarifyBillForIrrigation"
                        ? "active"
                        : ""
                    }
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Varified Monthly Bill for Irrigation
                    </ListItem>
                  </NavLink>

                  <NavLink
                    to="/BillForRiverMaster"
                    className={
                      pathname === "/AddNewBillForRiverMaster" ||
                      pathname === "/VarifyBillForRiverMaster"
                        ? "active"
                        : ""
                    }
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Varified Monthly Bill for River Pollution Control Unit
                      Master
                    </ListItem>
                  </NavLink>

                  <NavLink
                    to="/BillForJalSansthan"
                    className={
                      pathname === "/AddNewBillForJalSansthan" ||
                      pathname === "/VarifyBillForJalSansthan"
                        ? "active"
                        : ""
                    }
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Varified Monthly Bill for Jal Sansthan
                    </ListItem>
                  </NavLink> */}

                  <NavLink
                    to="/AddConsolidatedSummary"
                    className={
                      pathname === "/UploadConsolidatedSummary" ? "active" : ""
                    }
                  >
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Consolidated Summary
                    </ListItem>
                  </NavLink>
                </List>
              </AccordionBody>
            </Accordion>

            <Accordion
              open={open === 3}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 3}>
                <AccordionHeader
                  onClick={() => handleOpen(3)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <DocumentCheckIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-medium">
                    Reports
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <NavLink to="/ReportBillForLocalBodies">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Search Varified Monthly Bill for Local Bodies
                    </ListItem>
                  </NavLink>

                  <NavLink to="/ReportBillForIrrigation">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Search Varified Monthly Bill for Irrigation
                    </ListItem>
                  </NavLink>

                  <NavLink to="/ReportBillForRiverMaster">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Search Varified Monthly Bill for River Pollution Control
                      Unit Master
                    </ListItem>
                  </NavLink>

                  <NavLink to="/ReportBillForJalSansthan">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Search Varified Monthly Bill for Jal Sansthan
                    </ListItem>
                  </NavLink>
                </List>
              </AccordionBody>
            </Accordion>
          </>
        ) : (
          //  Sidebar Start for the admin  On 27/04/2024
          <>
            <Accordion
              open={open === 4}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 4 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 4}>
                <AccordionHeader
                  onClick={() => handleOpen(4)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-medium">
                    Masters
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <NavLink to="/LocalBodyMaster">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Local Body Master
                    </ListItem>
                  </NavLink>

                  <NavLink to="/NagarNigamMaster">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Nagar Nigam Master
                    </ListItem>
                  </NavLink>

                  <NavLink to="/NagarPalikaMaster">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Nagar Palika Master
                    </ListItem>
                  </NavLink>

                  <NavLink to="/NagarPanchayatMaster">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Nagar Panchayat Master
                    </ListItem>
                  </NavLink>

                  <NavLink to="/JalSansthanMaster">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Jal Sansthan Master
                    </ListItem>
                  </NavLink>

                  <NavLink to="/StateTubeWellMaster">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      State Tube Well Master
                    </ListItem>
                  </NavLink>

                  <NavLink to="/SmallPumpCanalMaster">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Small Pump Canal Master
                    </ListItem>
                  </NavLink>

                  <NavLink to="/MediumLargeCanalPumpMaster">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Medium & Large Pump Canal Master
                    </ListItem>
                  </NavLink>

                  <NavLink to="/RiverPollutionMaster">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      River Pollution Master
                    </ListItem>
                  </NavLink>
                </List>
              </AccordionBody>
            </Accordion>

            <Accordion
              open={open === 5}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 5 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 5}>
                <AccordionHeader
                  onClick={() => handleOpen(5)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <DocumentCheckIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-medium">
                    Reports
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <NavLink to="/AdminBillForLocalBodies">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Search Varified Monthly Bill Local Body
                    </ListItem>
                  </NavLink>

                  <NavLink to="/AdminMonthlyBillForIrrigation">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Search Verified Monthly Bill for Irrigation
                    </ListItem>
                  </NavLink>

                  <NavLink to="/AdminBillForRiverMaster">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Search Verified Monthly Bill for River Pollution Control
                      Unit Master
                    </ListItem>
                  </NavLink>

                  <NavLink to="/AdminBillForJalSansthan">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Search Verified Monthly Bill for Jal Sansthan
                    </ListItem>
                  </NavLink>
                </List>
              </AccordionBody>
            </Accordion>
          </>
        )}
      </List>
    </Card>
  );
}
