import React, { useState, useEffect } from "react";
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
  CInput,
  CCallout,
  CFormGroup,
  CButton,
  CSelect,
} from "@coreui/react";
import PendingTable from "./tables/PendingTable";
import { useSelector } from "react-redux";
import Pickedup from "./tables/PickedupTable";
import Cancelled from "./tables/CancelledTable";
import Delivered from "./tables/DeliveredTable";
import Spinner from "../Spinner";


const Tabs = () => {
  const orders = useSelector((state) => state.orders.orders);

  const [loader, setLoader] = useState(true)
  const [svalue, setsValue] = useState('')
  const [pendingOrder, setPendingOrder] = useState(null)
  const [pPendingOrder, setPpendingOrder] = useState(null)
  const [pickedupOrder, setPickedupOrder] = useState(null)
  const [pPickedupOrder, setpPickedupOrder] = useState(null)
  const [deliveredOrder, setDeliveredOrder] = useState(null)
  const [dDeliveredOrder, setDdeliveredOrder] = useState(null)
  const [cancelledOrder, setCancelledOrder] = useState(null)
  const [ccancelledOrder, setCcancelledOrder] = useState(null)
  const [xR, setXR] = useState([])
  const [xR2, setXR2] = useState([])
  const [xR3, setXR3] = useState([])
  const [xR4, setXR4] = useState([])



  useEffect(() => {

    if (orders) {
      setPendingOrder(orders.pending)
      setPickedupOrder(orders.pickedup)
      setDeliveredOrder(orders.delivered)
      setCancelledOrder(orders.cancelled)
      setLoader(false)
    }

    setTimeout(() => {
      setXR(orders.pending)
      setXR2(orders.pickedup)
      setXR3(orders.delivered)
      setXR4(orders.cancelled)
    }, 2000);

  }, [orders])


  const handleOnChange = (e) => {
    if (e.keyCode === 8) {

      const filteredData = e.target.value.trim().length > 0 && pendingOrder &&
        pendingOrder.filter(entry => {
          return (
            entry.user.firstName   && entry.user.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.user.lastName && entry.user.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.sender.full_name && entry.sender.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.sender.email     && entry.sender.email.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.receiver.full_name && entry.receiver.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.receiver.email && entry.receiver.email.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.package_name && entry.package_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.pickup_address && entry.pickup_address.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.rider_assign && entry.rider_assign.firstName.toLowerCase().indexOf(svalue) > -1
            || entry.rider_assign && entry.rider_assign.lastName.toLowerCase().indexOf(svalue) > -1
            || entry.rider_assign && entry.rider_assign.phone_number.toLowerCase().indexOf(svalue) > -1
            || entry.job_id && entry.job_id.toLowerCase().indexOf(svalue) > -1

          )
        });
      const filteredData2 = e.target.value.trim().length > 0 && pickedupOrder &&
        pickedupOrder.filter(entry => {
          return (
            entry.user.firstName   && entry.user.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.user.lastName && entry.user.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.sender.full_name && entry.sender.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.sender.email     && entry.sender.email.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.receiver.full_name && entry.receiver.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.receiver.email && entry.receiver.email.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.package_name && entry.package_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.pickup_address && entry.pickup_address.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.rider_assign && entry.rider_assign.firstName.toLowerCase().indexOf(svalue) > -1
            || entry.rider_assign && entry.rider_assign.lastName.toLowerCase().indexOf(svalue) > -1
            || entry.rider_assign && entry.rider_assign.phone_number.toLowerCase().indexOf(svalue) > -1
            || entry.job_id && entry.job_id.toLowerCase().indexOf(svalue) > -1

          )
        });
      const filteredData3 = e.target.value.trim().length > 0 && deliveredOrder &&
        deliveredOrder.filter(entry => {
          return (
            entry.user.firstName   && entry.user.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.user.lastName && entry.user.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.sender.full_name && entry.sender.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.sender.email     && entry.sender.email.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.receiver.full_name && entry.receiver.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.receiver.email && entry.receiver.email.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.package_name && entry.package_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.pickup_address && entry.pickup_address.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.rider_assign && entry.rider_assign.firstName.toLowerCase().indexOf(svalue) > -1
            || entry.rider_assign && entry.rider_assign.lastName.toLowerCase().indexOf(svalue) > -1
            || entry.rider_assign && entry.rider_assign.phone_number.toLowerCase().indexOf(svalue) > -1
            || entry.job_id && entry.job_id.toLowerCase().indexOf(svalue) > -1

          )
        });
      const filteredData4 = e.target.value.trim().length > 0 && cancelledOrder &&
        cancelledOrder.filter(entry => {
          return (
            entry.user.firstName   && entry.user.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.user.lastName && entry.user.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.sender.full_name && entry.sender.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.sender.email     && entry.sender.email.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.receiver.full_name && entry.receiver.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.receiver.email && entry.receiver.email.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.package_name && entry.package_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.pickup_address && entry.pickup_address.toLowerCase().includes(e.target.value.trim().toLowerCase())

            || entry.rider_assign && entry.rider_assign.firstName.toLowerCase().indexOf(svalue) > -1
            || entry.rider_assign && entry.rider_assign.lastName.toLowerCase().indexOf(svalue) > -1
            || entry.rider_assign && entry.rider_assign.phone_number.toLowerCase().indexOf(svalue) > -1
            || entry.job_id && entry.job_id.toLowerCase().indexOf(svalue) > -1

          )
        });
      if (filteredData) {
        setPendingOrder(filteredData)
      }
      if (filteredData2) {
        setPickedupOrder(filteredData2)
      }
      if (filteredData3) {
        setDeliveredOrder(filteredData3)
      }
      if (filteredData4) {
        setCancelledOrder(filteredData4)
      }
    }
    setsValue(e.target.value);
    const filteredData = e.target.value.trim().length > 0 && pendingOrder &&
      pendingOrder.filter(entry => {
        return (
          entry.user.firstName        && entry.user.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.user.lastName      && entry.user.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.sender.full_name   && entry.sender.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.sender.email       && entry.sender.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.receiver.full_name && entry.receiver.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.receiver.email     && entry.receiver.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.package_name       && entry.package_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.pickup_address     && entry.pickup_address.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.rider_assign       && entry.rider_assign.firstName.toLowerCase().indexOf(svalue) > -1
          || entry.rider_assign       && entry.rider_assign.lastName.toLowerCase().indexOf(svalue) > -1
          || entry.rider_assign       && entry.rider_assign.phone_number.toLowerCase().indexOf(svalue) > -1
          || entry.job_id             && entry.job_id.toLowerCase().indexOf(svalue) > -1

        )});
    const filteredData2 = e.target.value.trim().length > 0 && pickedupOrder &&
      pickedupOrder.filter(entry => {
        return (
          entry.user.firstName        && entry.user.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.user.lastName      && entry.user.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.sender.full_name   && entry.sender.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.sender.email       && entry.sender.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.receiver.full_name && entry.receiver.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.receiver.email     && entry.receiver.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.package_name       && entry.package_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.pickup_address     && entry.pickup_address.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.rider_assign       && entry.rider_assign.firstName.toLowerCase().indexOf(svalue) > -1
          || entry.rider_assign       && entry.rider_assign.lastName.toLowerCase().indexOf(svalue) > -1
          || entry.rider_assign       && entry.rider_assign.phone_number.toLowerCase().indexOf(svalue) > -1
          || entry.job_id             && entry.job_id.toLowerCase().indexOf(svalue) > -1

        )});
    const filteredData3 = e.target.value.trim().length > 0 && deliveredOrder &&
      deliveredOrder.filter(entry => {
        console.log("&&&&&: ", entry)
        return (
          entry.user.firstName        && entry.user.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.user.lastName      && entry.user.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.sender.full_name   && entry.sender.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.sender.email       && entry.sender.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.receiver.full_name && entry.receiver.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.receiver.email     && entry.receiver.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.package_name       && entry.package_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.pickup_address     && entry.pickup_address.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.rider_assign       && entry.rider_assign.firstName.toLowerCase().indexOf(svalue) > -1
          || entry.rider_assign       && entry.rider_assign.lastName.toLowerCase().indexOf(svalue) > -1
          || entry.rider_assign       && entry.rider_assign.phone_number.toLowerCase().indexOf(svalue) > -1
          || entry.job_id             && entry.job_id.toLowerCase().indexOf(svalue) > -1

        )});
    const filteredData4 = e.target.value.trim().length > 0 && cancelledOrder &&
      cancelledOrder.filter(entry => {
        return (
          entry.user.firstName        && entry.user.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.user.lastName      && entry.user.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.sender.full_name   && entry.sender.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.sender.email       && entry.sender.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.receiver.full_name && entry.receiver.full_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.receiver.email     && entry.receiver.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.package_name       && entry.package_name.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.pickup_address     && entry.pickup_address.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.rider_assign       && entry.rider_assign.firstName.toLowerCase().indexOf(svalue) > -1
          || entry.rider_assign       && entry.rider_assign.lastName.toLowerCase().indexOf(svalue) > -1
          || entry.rider_assign       && entry.rider_assign.phone_number.toLowerCase().indexOf(svalue) > -1
          || entry.job_id             && entry.job_id.toLowerCase().indexOf(svalue) > -1

        )});
   filteredData.length > 0 && setPpendingOrder(pendingOrder)
   filteredData2.length > 0 && setpPickedupOrder(pickedupOrder)
   filteredData3.length > 0 && setDdeliveredOrder(deliveredOrder)
   filteredData4.length > 0 && setCcancelledOrder(cancelledOrder)

    if (filteredData) {
      setPendingOrder(filteredData);
    } else {
     setPendingOrder(xR)
     setPpendingOrder(xR)
    }
    if (filteredData2) {
      setPickedupOrder(filteredData2);
    } else {
     setPickedupOrder(xR2)
     setpPickedupOrder(xR2)
    }
    if (filteredData3) {
      setDeliveredOrder(filteredData3);
    } else {
     setDeliveredOrder(xR3)
     setDdeliveredOrder(xR3)
    }
    if (filteredData4) {
      setCancelledOrder(filteredData4);
    } else {
     setCancelledOrder(xR4)
     setCcancelledOrder(xR4)
    }
  }

  const onKeyUp = (e) => {
    if (e.keyCode === 8) {
      setPendingOrder(pPendingOrder)
      setPickedupOrder(pPickedupOrder)
      setDeliveredOrder(dDeliveredOrder)
      setCancelledOrder(ccancelledOrder)
    }
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 8) {
      handleOnChange(e)
    }
  }

  return (
    <CRow>
      {loader && <Spinner width={20} height={20} />}

      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CFormGroup>
            <div style={{ width: "40%",
             display: "flex",
            flexDirection: 'row',
            padding: "30px" }}>
              <CInput
                placeholder="search"
                style={{ padding: 20 }}
                value={svalue}
                onChange={handleOnChange}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
              />

              <CButton color="primary" style={{ marginLeft: 20, paddingLeft: 20, paddingRight: 20 }}>Search</CButton>
            </div>
          </CFormGroup>
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
                      Pending
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
                      Picked up
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
                      Completed
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
                  <PendingTable pending={pendingOrder} />
                </CTabPane>
                <CTabPane>
                  <Pickedup pickedup={pickedupOrder} />
                </CTabPane>
                <CTabPane>
                  <Delivered delivered={deliveredOrder} />
                </CTabPane>
                <CTabPane>
                  <Cancelled cancelled={cancelledOrder} />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Tabs;
