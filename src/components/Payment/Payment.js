import {
  CCard,
  CCardBody,
  CButton,
  CCol,
  CRow,
  CFormGroup,
  CInput,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userService from "src/services/user.service";
import PaymentDetails from "./PaymentDetails";
import Tabs from "./PaymentTabs";
import SearchableTable from "./SearchTable";

const Payment = () => {
  const [witdraw, setWitdraw] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [secWitdraw, setSecWitdraw] = useState([]);
  const [secCompleted, setSecCompleted] = useState([]);
  const [secCancelled, setSecCancelled] = useState([]);
  const [search, setSearch] = useState("");

  const [witdrawal, setWitdrawal] = useState([])

  useEffect(() => {
    userService.getAllPayment()
      .then(data => {
        setWitdraw(data.data.withdraw)
      //  setWitdrawal(data.data.withdraw)
        setCompleted(data.data.completedWitdraw);
        setCancelled(data.data.cancelledWitdraw);
      }).catch(err => {
      })

  }, [])

  const handleOnChange=(e)=>{
    setSearch(e.target.value.toLowerCase())
  }

  const pendingPayment = witdraw.filter((item) => {
    return (
      item.account_detail.account_name.toLowerCase().includes(search) ||
      item.account_detail.account_number.toLowerCase().includes(search) ||
      item.account_detail.bank_name.toLowerCase().includes(search) ||
      item.amount.toString().toLowerCase().includes(search) ||
      item.reference.toLowerCase().includes(search) ||
      item.status.toLowerCase().includes(search)
    );
  });
  const completedPayment = completed.filter((item) => {
    return (
      item.account_detail?.account_name.toLowerCase().includes(search) ||
      item.account_detail?.account_number.toLowerCase().includes(search) ||
      item.account_detail?.bank_name.toLowerCase().includes(search) ||
      item.amount.toString().toLowerCase().includes(search) ||
      item.reference.toLowerCase().includes(search) ||
      item.status.toLowerCase().includes(search)
    );
  });

  const onKeyUp = (e) => {
    console.log('Case 1')
    if (e.keyCode === 8) {
      setWitdraw(secWitdraw);
      setCompleted(secCompleted);
      setCancelled(secCancelled);
    }
  };

  const onKeyDown = (e) => {
    console.log('Case 2')

    if (e.keyCode === 8) {
     // handleOnChange(e);
    }
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CFormGroup>
              <div
                style={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "row",
                  padding: "30px",
                }}
              >
                <CInput
                  placeholder="search"
                  style={{ padding: 20 }}
                  value={search}
                  // onChange={(e) => setSearch(e.target.value.toLowerCase())}
                  onChange={handleOnChange}
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                />
                <CButton
                  color="primary"
                  style={{ marginLeft: 20, paddingLeft: 20, paddingRight: 20 }}
                >
                  Search
                </CButton>
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
                        {witdrawal &&
                          witdrawal.total &&
                          witdrawal.total.totalCancelled.length > 0
                          ? witdrawal.total.totalCancelled[0].sum
                          : 0}
                      </strong>
                    </h3>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCard>
          {/* <SearchableTable data={witdraw}/> */}

          <Tabs
          search={search}
          //  witdrawal={witdrawal}
            witdraw={pendingPayment}
            completed={completedPayment}
            cancelled={cancelled} />
        </CCol>
      </CRow>
    </>
  );
};

export default Payment;
