import React, { useEffect, useState } from "react";
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
import userService from "src/services/user.service";

const PaymentTabs = ({witdraw,completed, cancelled}) => {
  const [payment, setPayment] = useState([])

  useEffect(()=>{

    (async function anyNameFunction() {
      let pay=  await userService.getAllPayment();
      setPayment(pay)
    })();

   console.log('>>',payment)
  },[])

  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>

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
                  <Pending pending={witdraw} />
                </CTabPane>

                <CTabPane>
                  <CompletedTable completed={completed} />
                </CTabPane>

                <CTabPane>
                  <Cancelled cancelled={cancelled} />
                </CTabPane>
                <CTabPane>
                  <DemoTable />
                </CTabPane>
                <CTabPane>
                  <DemoTable />
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
