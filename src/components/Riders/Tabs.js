import React, { useState } from "react";
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader,
  CTextarea,
  CInput,
  CCallout,
  CFormGroup,
  CLabel,
  CValidFeedback,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import DemoTable from "./DemoTable";
import Pending from "./tables/PendingTable";
import Pickedup from "./tables/PickedupTable";
import Delivered from "./tables/DeliveredTable";
import Cancelled from "./tables/CancelledTable";

const Tabs = ({ jobs }) => {
  const [active, setActive] = useState(1);
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.";

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
                    <CCardBody>
            <CTabs >
              <CNav variant="tabs">

              <CNavItem>
                  <CNavLink>
                    <CCallout
                      color="success"
                      style={{
                        height: "50px",
                        width: "250px",
                        paddingTop: "20px",
                      }}
                    >
                      Completed Orders
                    </CCallout>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CCallout
                      color="warning"
                      style={{
                        height: "50px",
                        width: "250px",
                        paddingTop: "20px",
                      }}
                    >
                      Pending Orders
                    </CCallout>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CCallout
                      color="dark"
                      style={{
                        height: "50px",
                        width: "250px",
                        paddingTop: "20px",
                      }}
                    >
                      Pickedup Orders
                    </CCallout>
                  </CNavLink>
                </CNavItem>


                <CNavItem>
                  <CNavLink>
                    <CCallout
                      color="danger"
                      style={{
                        height: "50px",
                        width: "250px",
                        paddingTop: "20px",
                      }}
                    >
                      Cancelled
                    </CCallout>
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
              <CTabPane>
                  <Delivered delivered={jobs.delivered}/>
                </CTabPane>
                <CTabPane>
                  <Pending  pending={jobs.pending}/>
                </CTabPane>
                <CTabPane>
                  <Pickedup pickedup={jobs.pickedup}/>
                </CTabPane>

                <CTabPane>
                  <Cancelled cancelled={jobs.cancelled}/>
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
      </CCol>
    </CRow>
  );
};

export default Tabs;
