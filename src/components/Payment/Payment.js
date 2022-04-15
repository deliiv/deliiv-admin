import { CCard, CCardBody, CButton, CCol, CRow, CFormGroup, CInput } from "@coreui/react";
import React from "react";
import { useSelector } from "react-redux";
import PaymentDetails from "./PaymentDetails";
import Tabs from './PaymentTabs'

const Payment = (props) => {

  const witdrawal = useSelector((state) => state.transactions.witdrawalRequest);



  return (
    <>


      <CRow>

        <CCol>

          <CCard>
            <CFormGroup>
              <div style={{ width: "40%", display: "flex", flexDirection: 'row', padding: "30px" }}>
                <CInput placeholder="search" style={{ padding: 20 }} />
                <CButton color="primary" style={{ marginLeft: 20, paddingLeft: 20, paddingRight: 20 }}>Search</CButton>
              </div>
            </CFormGroup>


            <CRow>
              <CCol xs="12" md="6">
                <PaymentDetails />
              </CCol>
              <CCol xs="12" md="3">
                <CCard style={{ padding: 10 }}>
                  Total Cancelled
                  <CCardBody>

                    <h3>
                      <strong>
                        {witdrawal && witdrawal.total &&  witdrawal.total.totalCancelled.length > 0 ?  witdrawal.total.totalCancelled[0].sum : 0}
                      </strong>
                    </h3>
                  </CCardBody>
                </CCard>

              </CCol>
            </CRow>


          </CCard>

          <Tabs />


        </CCol>

      </CRow>
    </>
  );
};

export default Payment;
