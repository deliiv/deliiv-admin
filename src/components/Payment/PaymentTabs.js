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

const PaymentTabs = ({ paystack, adminTopups, topusers }) => {
  const [active, setActive] = useState(1);
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.";

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>


          {/* <CCardHeader>Table represents transactions in last 24hrs</CCardHeader> */}
          <CCardBody>
            <CTabs >
              <CNav variant="tabs">
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
                      Completed Payments
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
                      Pending Payments
                    </CCallout>
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <DemoTable />
                  {/* <DemoTable /> */}
                </CTabPane>
                <CTabPane>
                  <DemoTable />

                  {/* <AdminTopup adminTopups={adminTopups} /> */}
                </CTabPane>
                <CTabPane>
                  <DemoTable />

                  {/* <PayStack paystack={paystack} /> */}
                </CTabPane>
                <CTabPane>
                  <DemoTable />

                  {/* <TopUsers topusers={topusers} /> */}
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default PaymentTabs;
