import React from "react";
import {
  CCol,
  CRow,
} from "@coreui/react";
import AgencyPayload from "./AgencyPayload";

const AgencyTabs = () => {
  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <AgencyPayload/>
 </CCol>
    </CRow>
  );
};

export default AgencyTabs;
