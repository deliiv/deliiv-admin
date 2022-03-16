import { CCard, CCardBody, CButton, CCol, CDataTable, CRow, CInput, CFormGroup } from "@coreui/react";
import React from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { useRouteMatch, useHistory } from "react-router-dom";
import NotificationDetail from "./NotificationDetail";

const Notification = (props) => {


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

          <CCard>
            <CFormGroup>
              <div style={{ width: "40%", display: "flex", flexDirection: 'row', padding: "30px" }}>
                <CInput placeholder="search" style={{ padding: 20 }} />
                <CButton color="primary" style={{ marginLeft: 20, paddingLeft: 20, paddingRight: 20 }}>Search</CButton>
              </div>
            </CFormGroup>

            <NotificationDetail/>

          </CCard>

        </CCol>

      </CRow>
    </>
  );
};

export default Notification;
