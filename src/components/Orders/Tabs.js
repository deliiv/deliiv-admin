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


const Tabs = () => {
  const orders = useSelector((state) => state.orders.orders);

  const [svalue, setsValue] = useState('')
  const [pendingOrder, setPendingOrder] = useState(null)
  const [pickedupOrder, setPickedupOrder] = useState(null)
  const [deliveredOrder, setDeliveredOrder] = useState(null)
  const [cancelledOrder, setCancelledOrder] = useState(null)

  useEffect(() => {

    if (orders) {
      setPendingOrder(orders.pending)
      setPickedupOrder(orders.pickedup)
      setDeliveredOrder(orders.delivered)
      setCancelledOrder(orders.cancelled)
    }

  }, [orders])


  useEffect(() => {

    if (svalue && pendingOrder.length === 0) {
      setPendingOrder(orders.pending)
    }
    if (svalue && svalue.length === 0) {
      setPendingOrder(orders.pending)
    }
  }, [svalue])
  const onKeyDown = (e) => {
    if (e.keyCode === 8) {
      Search(svalue)
    }
  }



  const SearchHandler = async (searchTerm, trans) => {

   return Object.values(trans).filter(user =>
      user.user.firstName.toLowerCase().indexOf(searchTerm) > -1 ||
      user.user.lastName.toLowerCase().indexOf(searchTerm) > -1 ||
      user.sender.full_name.toLowerCase().indexOf(searchTerm) > -1
      || user.receiver.full_name.toLowerCase().indexOf(searchTerm) > -1
      || user.package_name && user.package_name.toLowerCase().indexOf(searchTerm) > -1
      || user.pickup_address && user.pickup_address.toLowerCase().indexOf(searchTerm) > -1
      || user.rider_assign && user.rider_assign.firstName.toLowerCase().indexOf(searchTerm) > -1
      || user.rider_assign && user.rider_assign.lastName.toLowerCase().indexOf(searchTerm) > -1
      || user.rider_assign && user.rider_assign.phone_number.toLowerCase().indexOf(searchTerm) > -1
      || user.job_id && user.job_id.toLowerCase().indexOf(searchTerm) > -1

    );
  }
  const Search = async (searchTerm) => {
    if(searchTerm.length === 0){
      setPendingOrder(orders.pending)
      setPickedupOrder(orders.pickedup)
      setCancelledOrder(orders.cancelled)
      setDeliveredOrder(orders.delivered)
    }else{

    let cancelHandler = await (SearchHandler(searchTerm, cancelledOrder))
    let pendingHandler = await (SearchHandler(searchTerm, pendingOrder))
    let pickedupHandler = await (SearchHandler(searchTerm, pickedupOrder))
    let deliveredHandler = await (SearchHandler(searchTerm, deliveredOrder))


    setPendingOrder(pendingHandler)
    setCancelledOrder(cancelHandler)
    setDeliveredOrder(deliveredHandler)
    setPickedupOrder(pickedupHandler)
    }
  }

  const inputChangeHandler = async (event) => {
    const { name, value } = event.target;
    setsValue(value.toLowerCase())
    await Search(value.toLowerCase())
  };
  const handleSortType = (item) => {

  }
  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CFormGroup>
            <div style={{ width: "40%", display: "flex", flexDirection: 'row', padding: "30px" }}>
              <CInput placeholder="search" style={{ padding: 20 }} value={svalue} onChange={inputChangeHandler}
                onKeyDown={onKeyDown}
              />

              <CButton color="primary" style={{ marginLeft: 20, paddingLeft: 20, paddingRight: 20 }}>Search</CButton>
            </div>

            <div style={{ width:'150px',margin:'30px' }}>
              <CSelect
                custom value={null} name="creditReason"
                id="creditReason"
                onChange={e => handleSortType(e.target.value)}>
                <option value="customers">Sort By</option>
                <option value="oldest">Date: Oldest to Newest</option>
                <option value="newest">Date: Newest to Oldest</option>
              </CSelect>
            </div>
          </CFormGroup>

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
