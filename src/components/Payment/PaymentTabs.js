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
import { useSelector } from "react-redux";
import CompletedTable from "./tables/CompletedTable";
import Pending from "./tables/PendingTable";
import Cancelled from "./tables/CancelledTable";

const PaymentTabs = ({ paystack, adminTopups, topusers }) => {

  const witdrawal = useSelector((state) => state.transactions.witdrawalRequest);

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
                      Pending Payments
                    </CCallout>
                  </CNavLink>
                </CNavItem>
                
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
                      Cancelled Payments
                    </CCallout>
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
              <CTabPane>
                  <Pending pending={witdrawal && witdrawal.withdraw}/>
                </CTabPane>

                <CTabPane>
                  <CompletedTable completed={witdrawal && witdrawal.completedWitdraw}/>
                </CTabPane>

                <CTabPane>
                  <Cancelled cancelled={witdrawal && witdrawal.cancelledWitdraw}/>
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
