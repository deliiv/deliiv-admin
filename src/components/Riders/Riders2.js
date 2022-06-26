import { CCard, CCardBody, CButton, CCol, CDataTable, CRow, CInput, CFormGroup, CNavLink, CNavItem, CCallout, CTabPane, CTabContent, CNav, CTabs } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { useRouteMatch, useHistory } from "react-router-dom";
import RidersDetails from "./RiderDetails";
import DemoTable from "./DemoTable";
import Online from "./tables/Online";
import Spinner from "src/Spinner";

const Riders = (props) => {

  const riders = useSelector((state) => state.users.riders);
  const [loader, setLoader] = React.useState(true)

  const [localRiders, setLocalRiders] = useState([])
  const [localOffRiders, setOffLocalRiders] = useState([])
  const [secondaryLocalRiders, setSecondaryLocalRiders] = useState([])
  const [secondaryOffLocalRiders, setSecondaryOffLocalRiders] = useState([])
  const [xR, setXR] = useState([])
  const [xR2, setXR2] = useState([])
  const [search, setSearch] = useState('')

  useEffect(()=>{

    if(riders){
      setLoader(false)
      setLocalRiders(riders && riders.solo && riders.solo.online)
      setOffLocalRiders(riders && riders.solo && riders.solo.offline)
      setLoader(false)
    }
    setXR(riders && riders.solo && riders.solo.online)
    setXR2(riders && riders.solo && riders.solo.offline)

  },[riders])

  const handleOnChange = (e) => {

    if (e.keyCode === 8) {

      const filteredData = e.target.value.trim().length > 0 && localRiders &&
        localRiders.filter(entry => {
          return (
            entry.firstName && entry.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.lastName && entry.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.email && entry.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.phone_number && entry.phone_number.toLowerCase().includes(e.target.value.trim().toLowerCase())
          )
        }
        );
      const filteredData2 = e.target.value.trim().length > 0 && localOffRiders &&
        localOffRiders.filter(entry => {
          return (
            entry.firstName && entry.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.lastName && entry.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.email && entry.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
            || entry.phone_number && entry.phone_number.toLowerCase().includes(e.target.value.trim().toLowerCase())
          )
        }
        );
      if (filteredData) {
        setLocalRiders(filteredData);
      }
      if (filteredData2) {
        setOffLocalRiders(filteredData2);
      }

    }
    setSearch(e.target.value);
    const filteredData = e.target.value.trim().length > 0 && localRiders &&
      localRiders.filter(entry => {
        return (
          entry.firstName && entry.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.lastName && entry.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.email && entry.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.phone_number && entry.phone_number.toLowerCase().includes(e.target.value.trim().toLowerCase())
        )
      }
      );
    const filteredData2 = e.target.value.trim().length > 0 && localOffRiders &&
      localOffRiders.filter(entry => {
        return (
          entry.firstName && entry.firstName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.lastName && entry.lastName.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.email && entry.email.toLowerCase().includes(e.target.value.trim().toLowerCase())
          || entry.phone_number && entry.phone_number.toLowerCase().includes(e.target.value.trim().toLowerCase())
        )
      }
      );

    filteredData && filteredData.length > 0 && setSecondaryLocalRiders(localRiders)
    filteredData2 && filteredData2.length > 0 && setSecondaryOffLocalRiders(localOffRiders)

    if (filteredData) {
      setLocalRiders(filteredData);
    } else {
      setLocalRiders(xR)
      setSecondaryLocalRiders(xR)

    }
    if (filteredData2) {
      setOffLocalRiders(filteredData2);
    } else {
      setOffLocalRiders(xR2)
      setSecondaryOffLocalRiders(xR2)
    }
  }

  const onKeyUp = (e) => {
    if (e.keyCode === 8) {
      setSecondaryLocalRiders()
      setLocalRiders(secondaryLocalRiders)
      setOffLocalRiders(secondaryOffLocalRiders)
    }
  }
  const onKeyDown = (e) => {
    if (e.keyCode === 8) {
      handleOnChange(e)
    }
  }
  return (
    <>
      <CRow>

        <CCol>
        {loader && <Spinner width={20} height={20}/>}

          <CCard>
            <CFormGroup>
              <div style={{ width: "40%", display: "flex", flexDirection: 'row', padding: "30px" }}>
                <CInput placeholder="search" style={{ padding: 20 }}
                 value={search}
                 onChange={handleOnChange}
                 onKeyDown={onKeyDown}
                 onKeyUp={onKeyUp}/>
                <CButton color="primary" style={{ marginLeft: 20, paddingLeft: 20, paddingRight: 20 }}>Search</CButton>
              </div>
            </CFormGroup>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="12" className="mb-4">
                  <CCardBody>
                  <strong><h3>Solo Riders</h3></strong><br/>
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
                              Online
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
                              Offline
                            </CCallout>
                          </CNavLink>
                        </CNavItem>
                      </CNav>
                      <CTabContent>
                        <CTabPane>
                          <Online online={localRiders} />
                          {/* <DemoTable /> */}
                        </CTabPane>
                        <CTabPane>
                        <Online online={localOffRiders} />
                        </CTabPane>

                      </CTabContent>
                    </CTabs>
                  </CCardBody>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

        </CCol>

      </CRow>
    </>
  );
};

export default Riders;
