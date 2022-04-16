import { CCard, CCardBody, CButton, CCol, CDataTable, CRow, CInput, CFormGroup, CNavLink, CNavItem, CCallout, CTabPane, CTabContent, CNav, CTabs } from "@coreui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { useRouteMatch, useHistory } from "react-router-dom";
import RidersDetails from "./RiderDetails";
import DemoTable from "./DemoTable";
import Online from "./tables/Online";
import Spinner from "src/Spinner";

const Customers = (props) => {

  const riders = useSelector((state) => state.users.riders);
  const [loader, setLoader] = React.useState(true)

  useEffect(()=>{

    if(riders){
      setLoader(false)
    }
  },[riders])

  const fields = [
    {
      key: "firstname",
      _style: { minWidth: "15%" },
      label: "First Name",
    },
    {
      key: "lastname",
      _style: { minWidth: "15%" },
      label: "Last Name",
    },
    {
      key: "customernumber",
      _style: { minWidth: "15%" },
      label: "Number",
    },
    {
      key: "customeremail",
      _style: { minWidth: "15%" },
      label: "Email",
    },
    {
      key: "last_login",
      _style: { minWidth: "1%" },
    },
    {
      key: "view",
      _style: { minWidth: "1%" },
      label: "Action",

    },
  ];

  return (
    <>
      <CRow>

        <CCol>
        {loader && <Spinner width={20} height={20}/>}

          <CCard>
            <CFormGroup>
              <div style={{ width: "40%", display: "flex", flexDirection: 'row', padding: "30px" }}>
                <CInput placeholder="search" style={{ padding: 20 }} />
                <CButton color="primary" style={{ marginLeft: 20, paddingLeft: 20, paddingRight: 20 }}>Search</CButton>
              </div>
            </CFormGroup>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="12" className="mb-4">

                  <CCardBody>
                  <strong><h3>Agency Riders</h3></strong><br/>

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
                          <Online online={riders && riders.agency && riders.agency.online} />
                          {/* <DemoTable /> */}
                        </CTabPane>
                        <CTabPane>
                        <Online online={riders && riders.agency && riders.agency.offline} />
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

export default Customers;
