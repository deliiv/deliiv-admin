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
import PaymentDetails from "./PaymentDetails";
import Tabs from "./PaymentTabs";

const Payment = () => {
  const witdrawal = useSelector((state) => state.transactions.witdrawalRequest);
  const [witdraw, setWitdraw] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [secWitdraw, setSecWitdraw] = useState([]);
  const [secCompleted, setSecCompleted] = useState([]);
  const [secCancelled, setSecCancelled] = useState([]);
  const [search, setSearch] = useState("");
  const [xR, setXR] = useState([]);
  const [xR2, setXR2] = useState([]);
  const [xR3, setXR3] = useState([]);

  useEffect(() => {
    if (witdrawal) {
      setWitdraw(witdrawal.withdraw);
      setCompleted(witdrawal.completedWitdraw);
      setCancelled(witdrawal.cancelledWitdraw);
    }
    setXR(witdrawal.withdraw);
    setXR2(witdrawal.completedWitdraw);
    setXR3(witdrawal.cancelledWitdraw);

  }, []);

  const handleOnChange = (e) => {
    if (e.keyCode === 8) {
      const filteredData = e.target.value.trim().length > 0 && witdraw && witdraw.filter((entry) => {
        return (
          (entry.amount.toString() && entry.amount.toString().includes(e.target.value.trim())) ||
          (entry.reference &&
            entry.reference
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.status &&
            entry.status
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.email
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.phone_number.includes(
              e.target.value.trim().toLowerCase()
            )) ||
          (entry.account_detail &&
            entry.account_detail.account_number.includes(
              e.target.value.trim().toLowerCase()
            )) ||
          (entry.account_detail &&
            entry.account_detail.account_name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.account_detail &&
            entry.account_detail.bank_name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase()))
        );
      });
      if (filteredData) {
        setWitdraw(filteredData);
      }


      const filteredData2 = e.target.value.trim().length > 0 && completed && completed.filter((entry) => {
        return (
          (entry.amount.toString() && entry.amount.toString().includes(e.target.value.trim())) ||
          (entry.reference &&
            entry.reference
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.status &&
            entry.status
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.email
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.phone_number.includes(
              e.target.value.trim().toLowerCase()
            )) ||
          (entry.account_detail &&
            entry.account_detail.account_number.includes(
              e.target.value.trim().toLowerCase()
            )) ||
          (entry.account_detail &&
            entry.account_detail.account_name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.account_detail &&
            entry.account_detail.bank_name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase()))
        );
      });
      if (filteredData) {
        setWitdraw(filteredData);
      }
      if (filteredData2) {
        setCompleted(filteredData2);
      }

      const filteredData3 = e.target.value.trim().length > 0 && cancelled && cancelled.filter((entry) => {
        return (
          (entry.amount.toString() && entry.amount.toString().includes(e.target.value.trim())) ||
          (entry.reference &&
            entry.reference
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.status &&
            entry.status
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.email
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.phone_number.includes(
              e.target.value.trim().toLowerCase()
            )) ||
          (entry.account_detail &&
            entry.account_detail.account_number.includes(
              e.target.value.trim().toLowerCase()
            )) ||
          (entry.account_detail &&
            entry.account_detail.account_name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.account_detail &&
            entry.account_detail.bank_name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase()))
        );
      });
      if (filteredData3) {
        setCancelled(filteredData3);
      }
      if (filteredData3) {
        setCancelled(filteredData3);
      }
    }
    setSearch(e.target.value);
    const filteredData =
      e.target.value.trim().length > 0 &&
      witdraw &&
      witdraw.filter((entry) => {
        console.log(entry);
        return ((entry.amount.toString() && entry.amount.toString().includes(e.target.value.trim().toLowerCase())) ||
          (entry.reference &&
            entry.reference
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.status &&
            entry.status
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.email
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.phone_number.includes(
              e.target.value.trim().toLowerCase()
            )) ||
          (entry.account_detail &&
            entry.account_detail.account_number.includes(
              e.target.value.trim().toLowerCase()
            )) ||
          (entry.account_detail &&
            entry.account_detail.account_name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.account_detail &&
            entry.account_detail.bank_name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase()))
        );
      });
    const filteredData2 =
      e.target.value.trim().length > 0 &&
      completed &&
      completed.filter((entry) => {
        return ((entry.amount.toString() && entry.amount.toString().includes(e.target.value.trim().toLowerCase())) ||
          (entry.reference &&
            entry.reference
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.status &&
            entry.status
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.email
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.phone_number.includes(
              e.target.value.trim().toLowerCase()
            )) ||
          (entry.account_detail &&
            entry.account_detail.account_number.includes(
              e.target.value.trim().toLowerCase()
            )) ||
          (entry.account_detail &&
            entry.account_detail.account_name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.account_detail &&
            entry.account_detail.bank_name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase()))
        );
      });
    const filteredData3 =
      e.target.value.trim().length > 0 && cancelled && cancelled.filter((entry) => {
        return ((entry.amount.toString() && entry.amount.toString().includes(e.target.value.trim().toLowerCase())) ||
          (entry.reference &&
            entry.reference
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.status &&
            entry.status
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.email
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.agency &&
            entry.agency.phone_number.includes(
              e.target.value.trim().toLowerCase()
            )) ||
          (entry.account_detail &&
            entry.account_detail.account_number.includes(
              e.target.value.trim().toLowerCase()
            )) ||
          (entry.account_detail &&
            entry.account_detail.account_name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase())) ||
          (entry.account_detail &&
            entry.account_detail.bank_name
              .toLowerCase()
              .includes(e.target.value.trim().toLowerCase()))
        );
      });

    filteredData && filteredData.length   > 0 && setSecWitdraw(witdraw);
    filteredData2 && filteredData2.length > 0 && setSecCompleted(completed);
    filteredData3 && filteredData3.length > 0 && setSecCancelled(cancelled);

    if (filteredData) {
      setWitdraw(filteredData);
    } else {
      setWitdraw(xR);
      setSecWitdraw(xR2);
      setSecCancelled(xR3);
    }
    if (filteredData2) {
      setCompleted(filteredData2);
    } else {
      setCompleted(xR2);
      setSecCompleted(xR2);

      setCancelled(xR3);
      setSecCancelled(xR3);
    }
    if (filteredData3) {
      setCancelled(filteredData3);
    } else {
      setCancelled(xR3);
      setSecCancelled(xR3);
    }
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 8) {
      setWitdraw(secWitdraw);
      setCompleted(secCompleted);
      setCancelled(secCancelled);
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 8) {
      handleOnChange(e);
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

          <Tabs
          witdrawal={witdrawal}
           witdraw={witdraw}
            completed={completed}
            cancelled={cancelled}/>
        </CCol>
      </CRow>
    </>
  );
};

export default Payment;
