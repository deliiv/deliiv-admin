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
import PendingTable from "./tables/PendingTable";
import { useSelector } from "react-redux";
import Pickedup from "./tables/PickedupTable";


const Tabs = () => {
  const orders = useSelector((state) => state.orders.orders);

  const [svalue, setsValue] = useState('')
  const [pendingOrder, setPendingOrder] = useState(null)

  useEffect(() => {

    if (orders) {
      setPendingOrder(orders.pending)
    }

  }, [orders])


  useEffect(() =>{

    if(svalue && pendingOrder.length === 0){
      console.log('~~~~~~~~~~~~~~', svalue)
      setPendingOrder(orders.pending)
    }
    if(svalue.length === 0){
      setPendingOrder(orders.pending)
    }
  },[svalue])
  const onKeyDown = (e) =>{
    if (e.keyCode === 8) {
        console.log('delete: ', svalue);
        Search(svalue)
    }
}


  const Search = async (searchTerm) => {

    const search = Object.values(pendingOrder).filter( user =>
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
    setPendingOrder(search)
    console.log(search);
  }

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setsValue(value.toLowerCase())
    Search(value.toLowerCase())
    console.log(value)
  };
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
                  <Pickedup pickedup={orders.pickedup} />
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

export default Tabs;
